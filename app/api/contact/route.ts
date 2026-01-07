import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/db/schema";
import { contactFormSchema } from "@/lib/validations/contact";
import { getClientIP } from "@/lib/utils";
import { Resend } from "resend";
import { content } from "@/lib/content";

// In-memory rate limiting (simple baseline)
// Note: In production with multiple serverless instances, consider Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

// Initialize Resend (only if API key is provided)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const RECIPIENT_EMAIL = "dev.guzel@gmail.com";

function checkRateLimit(ip: string | null): boolean {
  if (!ip) return true; // Allow if IP cannot be determined

  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validated = contactFormSchema.parse(body);

    // Check honeypot
    if (validated.honeypot && validated.honeypot.length > 0) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = getClientIP(request.headers);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Get user agent
    const userAgent = request.headers.get("user-agent") || null;

    // Insert into database
    await db.insert(contactSubmissions).values({
      name: validated.name,
      email: validated.email,
      plan: validated.plan || null,
      message: validated.message,
      source: "website",
      user_agent: userAgent,
      ip: ip || null,
    });

    // Send email notification
    if (resend) {
      try {
        const planLabel = validated.plan
          ? content.services.plans.find((p) => p.id === validated.plan)?.name ||
            validated.plan
          : "Not specified";

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: RECIPIENT_EMAIL,
          subject: `New Contact Form Submission from ${validated.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validated.name}</p>
            <p><strong>Email:</strong> ${validated.email}</p>
            <p><strong>Service:</strong> ${planLabel}</p>
            <p><strong>Message:</strong></p>
            <p>${validated.message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>Submitted from: ${ip || "Unknown IP"}</small></p>
          `,
        });
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Failed to send email notification:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
