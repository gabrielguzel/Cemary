import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/db/schema";
import { contactFormSchema } from "@/lib/validations/contact";
import { getClientIP } from "@/lib/utils";

// In-memory rate limiting (simple baseline)
// Note: In production with multiple serverless instances, consider Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

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
        { error: "Spam détecté" },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = getClientIP(request.headers);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer plus tard." },
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

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
