# Portfolio Site - Fullstack Developer & IT Consultant

Ultra-modern one-page portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Orb Navigator**: Floating orb with radial menu and full-screen overlay navigation
- **Scroll Progress Indicator**: Vertical progress bar on the left edge
- **Dark/Light Mode**: Theme toggle with persistence
- **Smooth Animations**: Framer Motion animations with reduced motion support
- **Contact Form**: Form submissions stored in Vercel Postgres
- **Plan Selection**: Context-based plan selection that pre-fills contact form
- **Responsive Design**: Mobile-first, fully responsive layout

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Vercel Postgres with Drizzle ORM
- **Validation**: Zod
- **UI Components**: Radix UI (Accordion)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Supabase account (for Postgres database) or Vercel Postgres

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd Cemary
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
POSTGRES_URL="postgresql://..."
```

For Supabase:

- Go to your Supabase project dashboard
- Navigate to Settings > Database
- Copy the "Connection string" (URI format)
- Use the connection string that includes your password

For Vercel Postgres:

- Go to your Vercel project dashboard
- Navigate to Storage > Postgres
- Copy the connection string

4. Set up the database:

Generate the initial migration:

```bash
pnpm db:generate
```

Push the schema to your database:

```bash
pnpm db:push
```

Alternatively, you can use migrations:

```bash
pnpm db:migrate
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /api/contact/route.ts          # Contact form API handler
  /layout.tsx                     # Root layout with theme provider
  /page.tsx                       # Main one-page site
  /globals.css                    # Global styles + Tailwind
/components
  /navigation
    OrbNavigator.tsx             # Floating orb + radial menu
    SectionIndicator.tsx          # Scroll progress indicator
  /sections
    Hero.tsx                      # Hero section
    About.tsx                     # About + skills
    Services.tsx                  # 3-tier plans
    Work.tsx                      # Project cards
    Process.tsx                   # 5-step process
    FAQ.tsx                       # Accordion FAQ
    Contact.tsx                   # Contact form
  /ui
    ThemeToggle.tsx              # Dark/light mode toggle
    PlanCard.tsx                 # Reusable plan card
    ProjectCard.tsx              # Project card component
    AnimatedSection.tsx          # Scroll-triggered animation wrapper
/lib
  content.ts                     # French content (Belgium tone)
  db.ts                         # Drizzle client
  utils.ts                      # Utilities
  /validations
    contact.ts                  # Zod schema
/db
  schema.ts                     # Drizzle schema
  migrations/                   # SQL migrations
/contexts
  PlanContext.tsx               # Plan selection context
```

## Database Schema

The `contact_submissions` table stores form submissions:

- `id`: UUID (primary key)
- `created_at`: Timestamp
- `name`: Text
- `email`: Text
- `plan`: Text (nullable)
- `message`: Text
- `source`: Text (nullable)
- `user_agent`: Text (nullable)
- `ip`: Inet (nullable)

## Deployment to Vercel

1. Push your code to GitHub

2. Import the project in Vercel:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Set up Supabase Postgres (or Vercel Postgres):

   - For Supabase: Go to your Supabase project > Settings > Database > Copy connection string
   - For Vercel: Go to Storage > Postgres > Create database

4. Add environment variables:

   - In Vercel project settings, add:
     - `POSTGRES_URL` (your Supabase or Vercel Postgres connection string)

5. Deploy:

   - Vercel will automatically deploy on push
   - Or trigger a manual deployment

6. Run migrations:
   - After first deployment, run migrations:
   ```bash
   pnpm db:push
   ```
   - Or use Vercel CLI:
   ```bash
   vercel env pull .env.local
   pnpm db:push
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio

## Customization

### Content

Edit `lib/content.ts` to customize all text content. The content is in French with a Belgium tone.

### Styling

- Colors: Edit CSS variables in `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind classes in components

### Sections

All sections are in `components/sections/`. Each section is self-contained and can be customized independently.

## Notes

- Rate limiting is in-memory (baseline). For production with multiple instances, consider Redis.
- Honeypot field in contact form helps prevent spam.
- The orb navigator uses Intersection Observer for active section detection.
- All animations respect `prefers-reduced-motion`.

## License

Private project - All rights reserved.
