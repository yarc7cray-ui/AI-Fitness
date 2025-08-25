# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an AI fitness coaching platform built with **Next.js 15**, **React 19**, and **shadcn/ui** components. The project originated from **v0.app** and maintains automatic syncing with deployed chats. It features a multi-step onboarding flow, AI-powered fitness recommendations, and a modern fitness-focused UI with gradient themes.

## Development Commands

### Core Development
```bash
# Install dependencies (uses pnpm by default)
pnpm install

# Start development server
pnpm dev
# or
npm run dev

# Build for production
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm run start

# Lint the codebase
pnpm lint
# or
npm run lint
```

### v0.app Integration
This project automatically syncs with v0.app. Changes made in v0.app are pushed to this repository and deployed via Vercel.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **React Version**: React 19 
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.x with custom CSS variables
- **Typography**: Geist (sans) + Manrope (serif) fonts
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel (auto-deployed from this repo)

### Project Structure
```
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with fonts & metadata
│   └── page.tsx           # Landing page (hero → features → social proof → CTA)
├── components/
│   ├── ui/                # shadcn/ui base components
│   ├── hero-section.tsx   # Landing page hero with gradient CTAs
│   ├── features-section.tsx        # 6-card feature grid
│   ├── social-proof-section.tsx    # User testimonials
│   ├── onboarding-flow.tsx         # 4-step user onboarding
│   └── cta-section.tsx    # Call-to-action section
├── lib/
│   └── utils.ts           # Tailwind utility functions (cn)
└── public/                # Static assets (fitness images, placeholders)
```

### Key Architectural Patterns

#### Color System & Theming
- Uses **OKLCH color space** for better color consistency
- **Gradient theme**: Primary blue → Secondary green (fitness-focused)
- **CSS variables** for light/dark mode switching
- **Custom gradients**: `.gradient-primary` and `.gradient-text` utilities

#### Component Architecture
- **Compound components** pattern for complex UI (Cards, Forms)
- **Radix UI primitives** wrapped with shadcn/ui styling
- **Client-side state management** using React hooks (no external store)
- **TypeScript interfaces** for form data and component props

#### Onboarding Flow Pattern
The `OnboardingFlow` component demonstrates a multi-step wizard pattern:
- **Progress visualization** with step indicators
- **Form state persistence** across steps
- **Conditional rendering** based on current step
- **Validation per step** before advancing

## Development Patterns

### Component Creation
When creating new components, follow the established patterns:
- Use shadcn/ui base components from `components/ui/`
- Apply gradient utilities (`.gradient-primary`, `.gradient-text`) for consistency
- Use font classes: `font-sans` (Geist) for headings, `font-serif` (Manrope) for body text
- Follow the responsive design patterns (`sm:`, `lg:` breakpoints)

### Styling Conventions
- **CSS variables** are defined in `app/globals.css` using OKLCH
- **Custom utilities** for gradients are in the `@layer utilities` section
- **Responsive design** uses Tailwind's mobile-first approach
- **Component variants** use `class-variance-authority` (cva)

### Form Handling
- Use **React Hook Form** with **Zod** for validation
- Follow the onboarding flow pattern for multi-step forms
- Store form state in component state, not global state
- Use controlled components with `value` and `onChange` patterns

### Image Optimization
- Images are **unoptimized** in Next.js config (suitable for static export)
- Fitness-related images are stored in `/public/` directory
- Use descriptive alt text for accessibility

## Configuration Files

### Important Configs
- `next.config.mjs`: Disables ESLint/TS errors during builds, enables unoptimized images
- `components.json`: shadcn/ui configuration (New York style, CSS variables enabled)
- `tsconfig.json`: Standard Next.js TypeScript setup with path aliases (`@/*`)
- `tailwind` configuration embedded in `app/globals.css` using `@theme inline`

### Path Aliases
- `@/components` → `./components`
- `@/lib` → `./lib`
- `@/app` → `./app`

## Deployment & Sync

This repository maintains a **three-way sync**:
1. **v0.app** → GitHub (automatic)
2. **GitHub** → Vercel (automatic)
3. **Local development** → GitHub (manual)

The live deployment is accessible via the Vercel URL mentioned in the README.

## Business Flow Implementation

### Complete User Journey
The platform now implements a full business workflow:

1. **Landing Page** → **Onboarding** (4 steps) → **AI Plan Generation** → **Dashboard**
2. **Workout Execution** with real-time tracking and progress
3. **Personalized AI Recommendations** based on user data
4. **Data Persistence** via localStorage (ready for database upgrade)

### AI Features Implemented
- **Smart Workout Generation**: Creates exercises based on goals, equipment, and experience
- **Nutrition Calculations**: BMR-based calorie and macro calculations
- **Personalization Engine**: Adapts content to user's onboarding responses
- **Progress Tracking**: Workout completions and streaks

### Key Business Components
- `lib/user-store.ts`: Complete data layer with TypeScript interfaces
- `components/onboarding-flow.tsx`: Data collection and AI plan generation
- `components/workout-execution.tsx`: Real-time workout tracking
- `app/workout/[id]/page.tsx`: Dynamic workout execution routes
- Dashboard components: Real-time data display from generated plans

### Testing the Business Flow
```bash
# Complete user journey test
1. Start at / (landing page)
2. Click "Start Free Today" → /onboarding
3. Complete 4-step onboarding (generates AI plans)
4. Redirected to /dashboard (shows personalized data)
5. Click "Start Workout" → /workout/[id] (real workout execution)
6. Complete workout → back to /dashboard (progress tracked)
```

## Working with v0.app

When making changes via v0.app:
- Changes are automatically pushed to this repository
- Vercel deploys the changes automatically
- Local development should pull latest changes before working
- The v0.app project link is: https://v0.app/chat/projects/hfYx9SSZgrl

## Next Steps for Enhancement

The platform is now functionally complete with core business logic. For production deployment, consider:

1. **Authentication**: Implement NextAuth.js for user accounts
2. **Database**: Replace localStorage with PostgreSQL/MongoDB
3. **API Layer**: Create REST/GraphQL endpoints for data operations
4. **Real AI Integration**: Connect to OpenAI/Anthropic for dynamic coaching
5. **Community Features**: Add social features and challenges
6. **Mobile Responsiveness**: Optimize for mobile workout execution
7. **Analytics**: Add detailed progress tracking and insights
