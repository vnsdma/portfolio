import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'prawira-tobacco-web',
    title: 'Prawira Tobacco E-Commerce Platform',
    tagline: 'Production Next.js 15 platform with Midtrans & Cashify QRIS multi-gateway, RajaOngkir Pro logistics, and Supabase.',
    category: 'Fullstack Web Platform',
    role: 'Fullstack Engineer',
    timeframe: '2025 - Present',
    status: 'Live in Production',
    githubUrl: 'https://github.com/vnsdma/web-prawira-tobacco',
    liveUrl: 'https://prawiratobacco.com/',
    summary: 'A robust, high-performance web e-commerce platform built for Prawira Tobacco. Features multi-gateway checkout (Midtrans Snap & Cashify QRIS), real-time domestic shipping cost calculation via RajaOngkir Pro down to the sub-district level, Supabase PostgreSQL with JWT authentication, and zero-shift skeleton layout architecture.',
    problemStatement: 'Legacy online retail solutions suffered from high bounce rates due to sluggish page transitions, fragile single-payment dependencies, inaccurate shipping tariff estimates for distant Indonesian regencies, and order status sync discrepancies caused by unverified webhooks.',
    solutionDetails: [
      'Architected the web platform using Next.js 15 App Router, React 19, and Tailwind CSS, achieving sub-second Largest Contentful Paint (LCP) benchmarks.',
      'Constructed a resilient multi-gateway payment architecture integrating Midtrans Snap (Virtual Account, credit card, e-wallet) and Cashify QRIS.',
      'Engineered server-side SHA-512 cryptographic signature verification for incoming payment webhooks to ensure zero payment fraud and 100% order state accuracy.',
      'Integrated the RajaOngkir Pro logistics API to dynamically resolve provinces, cities, sub-districts, and courier service options with weight-based tariffs.',
      'Built custom skeleton loaders that reserve layout dimensions during initial data fetches, locking Cumulative Layout Shift (CLS) at 0.00.'
    ],
    architecturalHighlights: [
      {
        title: 'Multi-Gateway Payment State Machine',
        description: 'Serverless route handler verifies Midtrans and Cashify webhook signatures, transitioning orders atomically between settlement, pending, and expired states.'
      },
      {
        title: 'RajaOngkir Pro Cascading Lookup',
        description: 'Multi-tier geographical resolution (Province -> City -> District) with server-side proxying and caching to ensure rapid shipping cost calculation.'
      },
      {
        title: 'Strict Server-Runtime Security',
        description: 'Sensitive credentials (SUPABASE_SERVICE_ROLE_KEY, MIDTRANS_SERVER_KEY, CASHIFY_SECRET_KEY) are strictly isolated to server runtime handlers.'
      }
    ],
    technicalStack: [
      'Next.js 15 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Supabase PostgreSQL',
      'Midtrans Snap',
      'Cashify QRIS',
      'RajaOngkir Pro API',
      'Zod'
    ],
    metrics: [
      { label: 'Cumulative Layout Shift', value: '0.00', detail: 'Zero layout shift via pre-allocated skeleton cards' },
      { label: 'Lighthouse Performance', value: '98/100', detail: 'Optimized server components and bundle splitting' },
      { label: 'Webhook Verification', value: '100% SHA-512', detail: 'Cryptographically authenticated state transitions' }
    ],
    codeSnippet: {
      filename: 'app/api/webhook/midtrans/route.ts',
      language: 'typescript',
      code: `import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  const payload = await req.json()
  const { order_id, status_code, gross_amount, signature_key, transaction_status } = payload

  // Validate Midtrans server key hash
  const serverKey = process.env.MIDTRANS_SERVER_KEY!
  const hash = crypto.createHash('sha512')
    .update(order_id + status_code + gross_amount + serverKey)
    .digest('hex')

  if (hash !== signature_key) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
  }

  // Atomically transition order state
  const statusMap: Record<string, string> = {
    settlement: 'paid',
    capture: 'paid',
    pending: 'awaiting_payment',
    expire: 'cancelled',
    cancel: 'cancelled'
  }

  const nextStatus = statusMap[transaction_status] || 'pending'
  await supabase.from('orders').update({ payment_status: nextStatus }).eq('id', order_id)

  return NextResponse.json({ received: true })
}`,
      explanation: 'Server-side cryptographic hash verification prevents forged payment callbacks and maintains database state integrity.'
    },
    simulatorType: 'payment-logistics',
    card: {
      badge: '0.00 CLS',
      path: 'web-prawira-tobacco / storefront',
      built:
        'Next.js 15 storefront with Midtrans Snap and Cashify QRIS checkout, RajaOngkir Pro shipping down to sub-district, and Supabase auth.',
      result:
        'Live at prawiratobacco.com. Layout shift held at 0.00, Lighthouse performance at 98, and every payment webhook checked against its SHA-512 signature.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Midtrans Snap', 'Cashify QRIS'],
      terminal: {
        file: 'webhook/midtrans/route.ts',
        tag: 'VERIFIED',
        lines: [
          { kind: 'comment', text: '// POST /api/webhook/midtrans' },
          { kind: 'kv', key: 'signature', value: 'sha512 match', keyTone: 'accent', valueTone: 'ok' },
          { kind: 'kv', key: 'settlement', value: 'paid', keyTone: 'dim' },
          { kind: 'kv', key: 'pending', value: 'awaiting_payment', keyTone: 'dim' },
          { kind: 'kv', key: 'expire', value: 'cancelled', keyTone: 'dim' },
          { kind: 'kv', key: 'secrets', value: 'server runtime only', keyTone: 'hl' },
        ],
      },
    }
  },
  {
    id: 'prawira-tobacco-mobile',
    title: 'Prawira Tobacco Mobile E-Commerce',
    tagline: 'Mobile-first client catalog with drawer checkout, active promo engine, and instant cart sync.',
    category: 'Mobile Web Commerce',
    role: 'Frontend & Fullstack Engineer',
    timeframe: '2025 - Present',
    status: 'Production Ready',
    githubUrl: 'https://github.com/vnsdma/prawira-tobacco',
    summary: 'A responsive mobile-optimized commerce application engineered for on-the-go tobacco buyers. Delivers category filtering, gesture-friendly cart drawers, real-time voucher validation, and seamless order history tracking.',
    problemStatement: 'Mobile shoppers were dropping out of the funnel due to cluttered desktop layouts adapted poorly to small screens, slow cart response times, and checkout forms requiring repetitive re-entry of customer details.',
    solutionDetails: [
      'Developed a touch-first interface featuring sticky bottom navigation, fluid category scroll chips, and an interactive slide-over cart drawer.',
      'Implemented an active promo code validation engine (/api/mobile/promo/validate) that evaluates voucher rules and calculates discounts in real time.',
      'Built persistent cart state synchronizing active user selections without layout jumps or network lag.',
      'Integrated smooth dark and light themes using warm, eye-friendly color tokens to minimize eye fatigue during extended browsing.'
    ],
    architecturalHighlights: [
      {
        title: 'Touch-Optimized Drawer Architecture',
        description: 'Smooth sliding cart and filter drawers designed specifically for mobile ergonomics and one-handed operation.'
      },
      {
        title: 'Real-Time Promo Engine',
        description: 'Serverless validation endpoint checking voucher usage caps, expiration timestamps, and order minimum thresholds.'
      }
    ],
    technicalStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Supabase Client',
      'Lucide React'
    ],
    metrics: [
      { label: 'Mobile LCP', value: '<0.9s', detail: 'Sub-second mobile content paint' },
      { label: 'Voucher Engine Latency', value: '<80ms', detail: 'Instant discount computation' },
      { label: 'Mobile Responsiveness', value: '100%', detail: 'Optimized touch tap targets & drawer ergonomics' }
    ],
    card: {
      badge: '<0.9s LCP',
      path: 'prawira-tobacco / mobile',
      built:
        'Touch-first catalog with sticky bottom navigation, a slide-over cart drawer, and a promo engine that validates vouchers on the server.',
      result:
        'Mobile LCP under 0.9s, voucher checks under 80ms, and a cart that persists across sessions without layout jumps.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      terminal: {
        file: 'api/mobile/promo/validate',
        tag: '200 OK',
        lines: [
          { kind: 'comment', text: '// POST /api/mobile/promo/validate' },
          { kind: 'kv', key: 'usage cap', value: 'pass', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'expiry', value: 'pass', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'order minimum', value: 'pass', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'discount', value: 'computed server-side', keyTone: 'accent' },
          { kind: 'kv', key: 'latency', value: '<80ms', keyTone: 'hl', valueTone: 'hl' },
        ],
      },
    }
  },
  {
    id: 'prawira-inventory-pos',
    title: 'Prawira Inventory & Admin POS Suite',
    tagline: 'Continuous camera-driven QR cashier checkout, real-time stock control, and financial margin telemetry.',
    category: 'Enterprise POS & Inventory',
    role: 'Fullstack Systems Engineer',
    timeframe: '2025 - Present',
    status: 'In Active Use',
    summary: 'A full-stack inventory management and Point-of-Sale (POS) cashier suite. Features a non-blocking continuous camera QR code scanner that eliminates manual scan re-triggering, real-time inventory deductions, and dynamic cash flow and profit margin analytics.',
    problemStatement: 'Retail staff faced severe checkout bottlenecks: web camera QR scanners froze after each individual item, requiring cashiers to manually dismiss modals and click "Scan Next". Additionally, store owners lacked real-time visibility into net profit margins and daily cash flow movements.',
    solutionDetails: [
      'Engineered a non-blocking multi-scan camera loop using html5-qrcode that buffers recognized product IDs into active cart memory without stopping the video stream.',
      'Implemented debounce mechanisms and audio-haptic feedback to prevent accidental duplicate scans while maintaining lightning-fast barcode capture (<300ms).',
      'Developed interactive financial dashboards utilizing Recharts to track daily revenue, categorized operating expenses, and calculated gross/net profit margins.',
      'Built granular stock monitoring with automatic low-inventory warnings and transaction audit logs for store accountability.'
    ],
    architecturalHighlights: [
      {
        title: 'Continuous Frame Buffer',
        description: 'Custom state machine processes live video frames, validates decoded JSON/prefix payloads, and dispatches cart additions without video track re-initialization.'
      },
      {
        title: 'Financial Margin Engine',
        description: 'Server-side aggregation computes gross margin, operational expense breakdown, and net profit dynamically across custom date ranges.'
      },
      {
        title: 'Supabase SSR Authentication',
        description: 'Strict role-based access control separating administrative reporting from cashier POS interfaces.'
      }
    ],
    technicalStack: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Supabase SSR',
      'html5-qrcode',
      'Recharts',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Scan Cycle Time', value: '<300ms', detail: 'Rapid continuous camera recognition' },
      { label: 'Cashier Friction Reduction', value: '75%', detail: 'Eliminated manual modal re-triggering' },
      { label: 'Financial Tracking', value: '100% Real-time', detail: 'Dynamic profit margin calculations' }
    ],
    codeSnippet: {
      filename: 'src/components/cashier/continuous-scanner.tsx',
      language: 'typescript',
      code: `const onScanSuccess = (decodedText: string) => {
  // Prevent immediate duplicate reading within 1.2s window
  const now = Date.now()
  if (lastScannedRef.current.code === decodedText && now - lastScannedRef.current.time < 1200) {
    return
  }
  lastScannedRef.current = { code: decodedText, time: now }

  // Parse structured payload or fallback identifier
  const productData = parseQrPayload(decodedText)
  if (productData) {
    playScanChime()
    dispatch({ type: 'ADD_ITEM', payload: productData })
    // Keep camera stream active for continuous workflow
  }
}`,
      explanation: 'Time-window debouncing combined with a persistent camera stream enables cashier staff to scan whole baskets in seconds.'
    },
    simulatorType: 'pos-scanner',
    card: {
      badge: '<300ms scan',
      path: 'prawira-inventory / pos',
      built:
        'A continuous camera scanner that buffers QR payloads into the cart without stopping the video stream, plus stock control and margin dashboards.',
      result:
        'Scan cycle under 300ms, 75% less cashier friction, and net profit margins calculated live in Recharts dashboards.',
      stack: ['Next.js 14', 'React 18', 'TypeScript', 'Supabase SSR', 'html5-qrcode', 'Recharts'],
      terminal: {
        file: 'continuous-scanner.tsx',
        tag: 'STREAMING',
        lines: [
          { kind: 'comment', text: '// sample scan session' },
          { kind: 'kv', key: 'PROD:101', value: '+1 added', keyTone: 'accent', valueTone: 'ok' },
          { kind: 'kv', key: 'PROD:103', value: '+1 added', keyTone: 'accent', valueTone: 'ok' },
          { kind: 'kv', key: 'PROD:103', value: 'ignored, 1.2s window', keyTone: 'accent', valueTone: 'dim' },
          { kind: 'kv', key: 'camera stream', value: 'active', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'modals shown', value: '0', keyTone: 'hl', valueTone: 'hl' },
        ],
      },
    }
  },
  {
    id: 'prawira-api-architecture',
    title: 'Enterprise API Suite & Cryptographic Handlers',
    tagline: 'Modular Next.js route handlers covering authentication, payment callbacks, orders, and logistics proxying.',
    category: 'Backend & Systems Architecture',
    role: 'Backend & API Engineer',
    timeframe: '2025 - Present',
    status: 'Production Architecture',
    summary: 'A clean, modular backend layer comprising over 15 RESTful Next.js Route Handlers. Coordinates user sessions, order mutations, Midtrans and Cashify payment hooks, and RajaOngkir logistics proxies with server-side credential isolation and rigorous error boundaries.',
    problemStatement: 'Building e-commerce backends without structured separation often leads to exposed service role keys, race conditions in order creation, unhandled webhook failures, and tightly coupled database logic.',
    solutionDetails: [
      'Segregated API endpoints into logical domains: /api/auth, /api/orders, /api/payment, /api/rajaongkir, and /api/webhook.',
      'Strictly enforced server runtime isolation, ensuring service role keys and private payment credentials never leak into client JavaScript bundles.',
      'Implemented atomic order persistence ensuring cart deductions, shipping records, and payment tokens commit in a single database transaction.',
      'Designed structured error response contracts returning uniform JSON envelopes with proper HTTP status codes for seamless frontend consumption.'
    ],
    architecturalHighlights: [
      {
        title: 'Domain-Driven Route Grouping',
        description: 'Independent handlers for authentication, payments, logistics proxies, and webhook listeners facilitate maintainability and testing.'
      },
      {
        title: 'Idempotent Webhook Processing',
        description: 'Guarantees that repeated webhook deliveries from payment gateways produce consistent order status results without duplicate records.'
      }
    ],
    technicalStack: [
      'Next.js 15 Route Handlers',
      'Supabase PostgreSQL',
      'JWT Authentication',
      'Crypto (SHA-512)',
      'TypeScript Strict Mode',
      'REST API Design'
    ],
    metrics: [
      { label: 'API Endpoints', value: '15+ Routes', detail: 'Full coverage of commercial store operations' },
      { label: 'Secret Key Leakage', value: '0 Breaches', detail: 'Strict server runtime credential isolation' },
      { label: 'Order Mutation', value: '100% Atomic', detail: 'Transaction integrity on checkout' }
    ],
    card: {
      badge: '15+ routes',
      path: 'prawira / route-handlers',
      built:
        'Next.js route handlers grouped by domain: auth, orders, payment, RajaOngkir proxy and webhooks, all returning one JSON error contract.',
      result:
        'Service-role keys and gateway secrets stay on the server, order writes are atomic, and repeated webhook deliveries are idempotent.',
      stack: ['Next.js 15', 'Supabase PostgreSQL', 'JWT', 'SHA-512', 'TypeScript strict', 'REST'],
      terminal: {
        file: 'app/api/**/route.ts',
        tag: 'SERVER ONLY',
        lines: [
          { kind: 'comment', text: '// route handlers by domain' },
          { kind: 'kv', key: '/api/auth', value: 'JWT sessions', keyTone: 'accent', valueTone: 'dim' },
          { kind: 'kv', key: '/api/orders', value: 'atomic writes', keyTone: 'accent', valueTone: 'dim' },
          { kind: 'kv', key: '/api/payment', value: 'gateway tokens', keyTone: 'accent', valueTone: 'dim' },
          { kind: 'kv', key: '/api/rajaongkir', value: 'cached proxy', keyTone: 'accent', valueTone: 'dim' },
          { kind: 'kv', key: '/api/webhook', value: 'idempotent', keyTone: 'accent', valueTone: 'ok' },
        ],
      },
    }
  }
];
