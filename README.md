# Naufal Faris Fadhil — Fullstack Software Engineer

<p align="center">
  <strong>High-Throughput Fullstack Systems &bull; Multi-Gateway Web Commerce &bull; Production Architecture</strong>
</p>

<p align="center">
  <a href="https://github.com/vnsdma/portfolio/actions"><img src="https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge&logo=vite&logoColor=white" alt="Build Status" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Strict%20Mode-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://gsap.com/"><img src="https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" /></a>
  <a href="https://github.com/vnsdma"><img src="https://img.shields.io/badge/GitHub-@vnsdma-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

---

## 📌 Executive Overview

This repository houses the source code for my personal engineering portfolio. It is designed from the ground up to showcase **commercial software craftsmanship**, featuring production web architectures, cryptographic payment state machines, high-throughput POS cashier tooling, and sub-district logistics pipelines.

Unlike generic developer portfolios filled with tutorial clones, this platform emphasizes **real-world business systems** that handle actual customer transactions, inventory sync, and live payment settlements.

### Quick Reference
- **Developer**: Naufal Faris Fadhil ([@vnsdma](https://github.com/vnsdma))
- **Email**: `naufalfaris1903@gmail.com`
- **Location**: Indonesia
- **Live Flagship Store**: [prawiratobacco.com](https://prawiratobacco.com/)
- **CV / Resume**: Available directly in the app or under [`public/Naufal_Faris_Fadhil_CV.pdf`](public/Naufal_Faris_Fadhil_CV.pdf)

---

## ⚡ Core Engineering Differentiators

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             PRODUCTION ARCHITECTURE                             │
├─────────────────────────┬────────────────────────────┬───────────────────────────┤
│    COMMERCE SYSTEMS     │    PERFORMANCE & UX        │     SECURITY & BACKEND    │
│  • Midtrans Snap VA/CC  │  • 0.00 CLS skeleton loads │  • SHA-512 Webhooks       │
│  • Cashify QRIS Engine  │  • <0.9s Mobile LCP        │  • Server runtime keys    │
│  • RajaOngkir Pro API   │  • <300ms QR scan cycle    │  • Atomic order mutations │
│  • Sub-district routing │  • 98+ Lighthouse scores   │  • Supabase SSR & RLS     │
└─────────────────────────┴────────────────────────────┴───────────────────────────┘
```

1. **Production Commerce Over Toy Apps**: Real transactions with atomic database state transitions, multi-channel payment gateways, and sub-district tariff calculators.
2. **Deterministic Layout Performance**: Layouts budget DOM space before data arrives using pre-allocated skeleton structures, locking Cumulative Layout Shift (CLS) strictly at `0.00`.
3. **Hardware & Real-Time Telemetry**: Camera-driven QR barcode scanning with non-blocking frame buffers and debounce filters (<300ms cycle latency).
4. **Zero-Trust Payment Security**: Inbound webhooks are verified via cryptographic SHA-512 hashes before any database order mutation occurs.

---

## 🚀 Interactive Engineering Simulators

The portfolio includes two live, in-browser interactive simulators demonstrating underlying system mechanics:

### 1. 💳 Multi-Gateway Payment & Indonesian Logistics Simulator
*Location: [`src/components/InteractiveSimulators/PaymentLogisticsSimulator.tsx`](src/components/InteractiveSimulators/PaymentLogisticsSimulator.tsx)*
- **Cascading Logistics**: Dynamically simulates multi-tier administrative routing (Province → City/Regency → Sub-District) with weight-indexed tariff calculation via RajaOngkir Pro.
- **Cryptographic Webhook Handlers**: Simulates payment payload verification (Midtrans Snap & Cashify QRIS) comparing SHA-512 signatures (`hash(order_id + status_code + gross_amount + server_key)`).

### 2. 🛒 High-Throughput Continuous QR POS Cashier Simulator
*Location: [`src/components/InteractiveSimulators/PosScannerSimulator.tsx`](src/components/InteractiveSimulators/PosScannerSimulator.tsx)*
- **Non-Blocking Camera Stream**: Simulates an active video capture thread using `html5-qrcode` without modal interruptions.
- **Frame Buffer & Debounce**: Demonstrates a 1,200ms deduplication window preventing accidental double-charging while enabling rapid basket checkout (<300ms per item).

---

## 🎨 Dual Editorial Design System

The application features a bespoke dual design system implemented with CSS variables and custom typography tokens:

| Feature | Nordic Warm Editorial (Light / Default) | Marine Editorial (Dark) |
| :--- | :--- | :--- |
| **Philosophy** | Brutalist editorial paper & ink | Deep slate maritime instrumentation |
| **Surfaces** | Warm Alabaster (`#fbfbf9`), Pressed Paper | Obsidian Deep Slate (`#0f172a`), Marine Glass |
| **Geometry** | 0px sharp corners (`--r: 0px`) | Rounded cards (`--r: 8px`, `--r-lg: 12px`) |
| **Typography** | Bricolage Grotesque + Space Grotesk | Hanken Grotesk + JetBrains Mono |
| **Accents** | Signal Vermilion (`#e11d48`) & Pale Butter | Butter Glow (`#fef08a`) & Crimson Ink |
| **Shadows** | Hard offset 4px solid borders (`4px 4px 0 0 #111827`) | Soft diffused backdrops with subtle border glow |

> Theme selections are persisted in `localStorage` and synchronized with the DOM prior to the first render cycle to avoid Flash of Unstyled Content (FOUC).

---

## 📁 Repository Structure

```
portfolio/
├── public/
│   ├── Naufal_Faris_Fadhil_CV.pdf    # Downloadable resume
│   └── favicon.svg                  # Brand favicon
├── src/
│   ├── components/
│   │   ├── InteractiveSimulators/   # Embedded architecture simulators
│   │   │   ├── PaymentLogisticsSimulator.tsx
│   │   │   └── PosScannerSimulator.tsx
│   │   ├── ui/                      # Shared atomic UI primitives
│   │   │   ├── SectionHeader.tsx
│   │   │   └── Terminal.tsx
│   │   ├── Architecture.tsx         # System diagrams & architecture flows
│   │   ├── Contact.tsx              # Direct contact & communication channels
│   │   ├── Footer.tsx               # Footer with metadata and status indicators
│   │   ├── Hero.tsx                 # Technical hero section & callouts
│   │   ├── Manifesto.tsx            # Engineering philosophy with GSAP scroll reveal
│   │   ├── Modal.tsx                # Accessible accessible dialog wrapper
│   │   ├── Navbar.tsx               # Navigation bar with theme toggle & recruiter brief
│   │   ├── ProjectDetailModal.tsx   # Detailed project drilldown modal
│   │   ├── RecruiterBriefModal.tsx  # Executive candidate brief with copyable summary
│   │   ├── Stack.tsx                # Deep-dive tech stack breakdown
│   │   ├── ThemeToggle.tsx          # Dual design system switcher
│   │   └── Work.tsx                 # Featured commercial project showcase
│   ├── data/
│   │   ├── projects.ts              # Detailed project specs, snippets, metrics
│   │   └── recruiterData.ts         # Engineering pillars & categorized competencies
│   ├── hooks/
│   │   └── useTheme.ts              # React hook managing theme state & DOM classes
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── App.tsx                      # Root composition layout
│   ├── index.css                    # Tailwind layers, CSS variable tokens & fonts
│   └── main.tsx                     # Vite React entry point
├── index.html                       # HTML shell with Google Fonts preloads
├── package.json                     # Dependencies and scripts
├── tailwind.config.js               # Tailwind design system configuration
├── tsconfig.json                    # Strict TypeScript compiler options
└── vite.config.ts                   # Vite bundler configuration & path aliases
```

---

## 🛠️ Featured Commercial Projects

### 1. [Prawira Tobacco E-Commerce Platform (Web)](https://github.com/vnsdma/web-prawira-tobacco)
- **Live URL**: [prawiratobacco.com](https://prawiratobacco.com/)
- **Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Supabase PostgreSQL, Midtrans Snap, Cashify QRIS, RajaOngkir Pro API.
- **Highlights**: Dual-gateway checkout with virtual accounts & QRIS, sub-district tariff calculation, and 100% SHA-512 webhook signature verification.

### 2. [Prawira Tobacco Mobile E-Commerce](https://github.com/vnsdma/prawira-tobacco)
- **Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase Client, Lucide React.
- **Highlights**: Mobile-first ergonomics, sticky bottom navigation, touch slide-over cart drawer, and sub-80ms serverless promo voucher engine (`/api/mobile/promo/validate`).

### 3. Prawira Inventory & Admin POS Suite
- **Stack**: Next.js 14, React 18, TypeScript, Supabase SSR, `html5-qrcode`, Recharts, Tailwind CSS.
- **Highlights**: Continuous camera-driven QR cashier checkout (<300ms cycle time), 75% cashier friction reduction, and real-time net profit margin telemetry.

### 4. Enterprise API Suite & Cryptographic Handlers
- **Stack**: Next.js 15 Route Handlers, Supabase PostgreSQL, JWT, SHA-512 HMAC, TypeScript Strict Mode.
- **Highlights**: Domain-segregated route handlers (`/api/auth`, `/api/orders`, `/api/payment`, `/api/rajaongkir`, `/api/webhook`), strict server runtime isolation for secrets, and idempotent webhook processing.

---

## 💻 Local Development & Setup

### Prerequisites
- Node.js `18.x` or later (tested on Node `20+` and `22+`)
- npm, pnpm, or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vnsdma/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server on port 3000 |
| `npm run build` | Runs TypeScript typechecks (`tsc`) and bundles for production (`vite build`) |
| `npm run preview` | Spins up a local static server to preview the production build |

---

## 🚢 Deployment

The build output is standard static HTML, CSS, and JavaScript optimized for distribution on any modern CDN or serverless platform:

```bash
# Build the production bundle
npm run build
```

The resulting `dist/` folder is ready to deploy directly to:
- **Vercel**: Connect the repository, build command `npm run build`, output directory `dist`.
- **Netlify**: Build command `npm run build`, publish directory `dist`.
- **Cloudflare Pages**: Framework preset `Vite`, build command `npm run build`, output directory `dist`.

---

## 📬 Contact & Connect

- **GitHub**: [@vnsdma](https://github.com/vnsdma)
- **Email**: [naufalfaris1903@gmail.com](mailto:naufalfaris1903@gmail.com)
- **Live Store**: [prawiratobacco.com](https://prawiratobacco.com/)
- **Web Platform Repository**: [github.com/vnsdma/web-prawira-tobacco](https://github.com/vnsdma/web-prawira-tobacco)
- **Mobile Platform Repository**: [github.com/vnsdma/prawira-tobacco](https://github.com/vnsdma/prawira-tobacco)

---

<p align="center">
  <sub>Built with care, precision, and performance by <strong>Naufal Faris Fadhil</strong>. Copyright &copy; 2026.</sub>
</p>
