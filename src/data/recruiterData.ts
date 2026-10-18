import { RecruiterPillar, SkillCategory } from '../types';

export const recruiterPillars: RecruiterPillar[] = [
  {
    title: 'Solves Real Commercial Problems, Not Generic Tutorials',
    pitch: 'I do not build shallow demo clones or basic tutorial apps. My code processes real customer transactions via Midtrans Snap and Cashify QRIS, calculates multi-tier Indonesian logistics down to the sub-district level using RajaOngkir Pro, powers high-throughput continuous camera QR cashier checkouts, and runs autonomous dynamic QRIS gateways with Android notification interception.',
    differentiator: 'Production-ready domain problem solving and commercial code craftsmanship.',
    evidence: 'RadarPay Dynamic QRIS Gateway, Prawira Tobacco E-Commerce (web-prawira-tobacco & prawira-tobacco) & Prawira Inventory POS Suite.'
  },
  {
    title: 'Modern Stack Native with Architectural Cleanliness',
    pitch: 'Deeply proficient in contemporary production standards: Next.js 15 App Router, React 19, Fastify 5, Drizzle ORM, TypeScript strict mode, Supabase PostgreSQL with Row Level Security, and utility-first Tailwind CSS. I write modular, type-safe code that senior engineers can review and merge with confidence.',
    differentiator: 'Clean mental models and immediate synergy with modern production codebases.',
    evidence: '100% strict TypeScript types, server component optimizations, zero any workarounds.'
  },
  {
    title: 'Obsession with Performance & Zero-Shift Layouts',
    pitch: 'I reject sluggish, jittery user experiences. Every interface I design is tuned for speed: sub-second Largest Contentful Paint (LCP), 0.00 Cumulative Layout Shift (CLS) via carefully budgeted skeleton cards, high-contrast accessible typography, and fluid GSAP physics.',
    differentiator: 'Disciplined engineering that prioritizes real user experience and Core Web Vitals.',
    evidence: 'Lighthouse 98+ scores and rigorous pre-flight layout audits.'
  },
  {
    title: 'Security-First Backend Architecture',
    pitch: 'Understanding that web security is non-negotiable. Sensitive database service keys and payment secrets are strictly kept on server runtimes, while incoming payment callbacks are verified against SHA-512 and HMAC-SHA256 cryptographic signatures before updating database order states.',
    differentiator: 'Protects business revenue and user data against payment fraud and callback tampering.',
    evidence: 'Verified HMAC-SHA256/SHA-512 webhook listeners and atomic database transactions.'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Engineering',
    tag: 'Presentation',
    blurb: 'Server components, strict types, and layouts that reserve space before data arrives.',
    skills: [
      'Next.js 15 (App Router)',
      'React 19 & React 18',
      'TypeScript (Strict)',
      'Tailwind CSS',
      'GSAP (ScrollTrigger & Motion)',
      'Web Accessibility (a11y)',
      'Responsive Architecture',
      'Radix UI / shadcn/ui'
    ]
  },
  {
    category: 'Backend & Data Architecture',
    tag: 'Data and API',
    blurb: 'Row-level security, typed route handlers, and state machines for order and payment flow.',
    skills: [
      'Fastify 5 & Next.js Routes',
      'Drizzle ORM & Supabase Postgres',
      'Row Level Security (RLS)',
      'RESTful API Design & Swagger',
      'HMAC-SHA256 & SHA-512 Signatures',
      'State Machine Modeling',
      'JWT Authentication',
      'Server-Side Data Caching'
    ]
  },
  {
    category: 'Payments, Logistics & Operations',
    tag: 'Commerce',
    blurb: 'Webhook-verified payments, sub-district shipping, and live inventory deductions.',
    skills: [
      'Dynamic EMVCo QRIS & CRC-16',
      'Android NotificationListenerService',
      'SQLite Outbox Pattern Relay',
      'Midtrans Snap & Cashify QRIS',
      'grammY Telegram Bot Automation',
      'RajaOngkir Pro Shipping API',
      'html5-qrcode Scanner Integration',
      'Real-Time Inventory Deductions'
    ]
  },
  {
    category: 'Workflow & Engineering Tooling',
    tag: 'Workflow',
    blurb: 'Core Web Vitals budgets, schema validation, and charts that read straight from the data.',
    skills: [
      'Git Version Control',
      'Core Web Vitals Optimization',
      'Vite & Next.js Tooling',
      'Zod Form Validation',
      'PostCSS & Autoprefixer',
      'Recharts Data Telemetry'
    ]
  }
];
