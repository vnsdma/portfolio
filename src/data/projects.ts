import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'prawira-tobacco-web',
    title: 'Prawira Tobacco E-Commerce Platform',
    tagline: 'Production Next.js 15 platform with Midtrans & RadarPay QRIS multi-gateway, RajaOngkir Pro logistics, and Supabase.',
    category: 'Fullstack Web Platform',
    role: 'Fullstack Engineer',
    timeframe: '2025 - Present',
    status: 'Live in Production',
    githubUrl: 'https://github.com/vnsdma/web-prawira-tobacco',
    liveUrl: 'https://prawiratobacco.com/',
    summary: 'A robust, high-performance web e-commerce platform built for Prawira Tobacco. Features multi-gateway checkout (Midtrans Snap & RadarPay QRIS), real-time domestic shipping cost calculation via RajaOngkir Pro down to the sub-district level, Supabase PostgreSQL with JWT authentication, and zero-shift skeleton layout architecture.',
    problemStatement: 'Legacy online retail solutions suffered from high bounce rates due to sluggish page transitions, fragile single-payment dependencies, inaccurate shipping tariff estimates for distant Indonesian regencies, and order status sync discrepancies caused by unverified webhooks.',
    solutionDetails: [
      'Architected the web platform using Next.js 15 App Router, React 19, and Tailwind CSS, achieving sub-second Largest Contentful Paint (LCP) benchmarks.',
      'Constructed a resilient multi-gateway payment architecture integrating Midtrans Snap (Virtual Account, credit card, e-wallet) and RadarPay QRIS.',
      'Engineered server-side SHA-512 cryptographic signature verification for incoming payment webhooks to ensure zero payment fraud and 100% order state accuracy.',
      'Integrated the RajaOngkir Pro logistics API to dynamically resolve provinces, cities, sub-districts, and courier service options with weight-based tariffs.',
      'Built custom skeleton loaders that reserve layout dimensions during initial data fetches, locking Cumulative Layout Shift (CLS) at 0.00.'
    ],
    architecturalHighlights: [
      {
        title: 'Multi-Gateway Payment State Machine',
        description: 'Serverless route handler verifies Midtrans and RadarPay webhook signatures, transitioning orders atomically between settlement, pending, and expired states.'
      },
      {
        title: 'RajaOngkir Pro Cascading Lookup',
        description: 'Multi-tier geographical resolution (Province -> City -> District) with server-side proxying and caching to ensure rapid shipping cost calculation.'
      },
      {
        title: 'Strict Server-Runtime Security',
        description: 'Sensitive credentials (SUPABASE_SERVICE_ROLE_KEY, MIDTRANS_SERVER_KEY, RADARPAY_SECRET_KEY) are strictly isolated to server runtime handlers.'
      }
    ],
    technicalStack: [
      'Next.js 15 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Supabase PostgreSQL',
      'Midtrans Snap',
      'RadarPay QRIS',
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
        'Next.js 15 storefront with Midtrans Snap and RadarPay QRIS checkout, RajaOngkir Pro shipping down to sub-district, and Supabase auth.',
      result:
        'Live at prawiratobacco.com. Layout shift held at 0.00, Lighthouse performance at 98, and every payment webhook checked against its SHA-512 signature.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Midtrans Snap', 'RadarPay QRIS'],
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
    summary: 'A clean, modular backend layer comprising over 15 RESTful Next.js Route Handlers. Coordinates user sessions, order mutations, Midtrans and RadarPay payment hooks, and RajaOngkir logistics proxies with server-side credential isolation and rigorous error boundaries.',
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
  },
  {
    id: 'radarpay-qris-gateway',
    title: 'RadarPay: Dynamic QRIS Gateway & Notification Relay',
    tagline: 'Autonomous dynamic QRIS payment gateway with Android notification interception, unique nominal matching, and HMAC-SHA256 dispatch.',
    category: 'Fintech & Distributed Systems',
    role: 'Lead Systems & Mobile Engineer',
    timeframe: '2025 - Present',
    status: 'Production Architecture',
    githubUrl: 'https://github.com/vnsdma/radarpay',
    summary: 'An autonomous self-hosted dynamic QRIS payment gateway engineered for zero-fee Indonesian merchant transactions. Transforms static QRIS strings into dynamic EMVCo payloads with CRC-16 checksums, intercepts banking and e-wallet push notifications (GoPay, BCA, ShopeePay, OVO) via a native Android NotificationListenerService, reconciles transactions using atomic unique-nominal matching in PostgreSQL (Drizzle ORM), and relays HMAC-SHA256 verified webhooks and real-time Telegram bot alerts.',
    problemStatement: 'Indonesian merchants face significant transaction friction: third-party payment gateways impose 0.7% MDR fees with multi-week onboarding delays, while static QRIS necessitates manual proof-of-transfer checks susceptible to fake receipt manipulation. Existing DIY solutions rely on fragile bank web scraping that gets IP-blocked.',
    solutionDetails: [
      'Engineered a dynamic EMVCo QRIS generator computing Tag 01 (Dynamic method: 12), Tag 54 (Amount), and 16-bit CCITT-FALSE CRC checksums on the fly.',
      'Developed a native Android daemon utilizing NotificationListenerService and a local SQLite outbox queue, relaying push notifications with <1s latency even across unstable cellular connections.',
      'Architected an atomic unique-nominal allocator (+1 to +999 Rp) and reconciliation engine in Fastify and Drizzle ORM, eliminating order collisions and race conditions.',
      'Implemented cryptographic webhook dispatching with HMAC-SHA256 signatures, replay-prevention timestamps, and exponential retry backoffs.',
      'Constructed an interactive Telegram Bot with grammY enabling instant dynamic QRIS generation (/qris <amount>), financial settlement alerts, and device health monitoring.',
      'Built a modern React + Vite merchant dashboard providing real-time transaction telemetry, simulated webhooks, and device token pairing.'
    ],
    architecturalHighlights: [
      {
        title: 'EMVCo CRC-16 Dynamic Mutation',
        description: 'Parses merchant static QRIS TLV structures, dynamically updates Point of Initiation Tag 01, injects transaction nominal Tag 54, and calculates 16-bit CCITT-FALSE CRC checksums.'
      },
      {
        title: 'Android Notification Interceptor & SQLite Outbox',
        description: 'Background Android daemon intercepts push notifications from GoPay, ShopeePay, BCA, and OVO, buffering events in a persistent SQLite outbox queue for guaranteed at-least-once relay.'
      },
      {
        title: 'Atomic Unique-Nominal Reconciliation',
        description: 'Allocates deterministic unique cents to pending orders, matching incoming payments in PostgreSQL within sub-80ms without database row locking bottlenecks.'
      },
      {
        title: 'Cryptographic HMAC-SHA256 Dispatch',
        description: 'Signs outgoing merchant webhooks with timestamped HMAC-SHA256 tokens, ensuring complete callback integrity and anti-replay defense.'
      }
    ],
    technicalStack: [
      'Fastify 5',
      'TypeScript (Strict)',
      'Kotlin (Android Native)',
      'NotificationListenerService',
      'Drizzle ORM',
      'PostgreSQL',
      'EMVCo QRIS & CRC-16',
      'HMAC-SHA256',
      'grammY Telegram Bot',
      'React 18 & Vite',
      'Tailwind CSS',
      'Docker & Caddy'
    ],
    metrics: [
      { label: 'Reconciliation Latency', value: '<80ms', detail: 'Instant matching from notification receipt to order state change' },
      { label: 'Android Forward Latency', value: '<1.2s', detail: 'Real-time push interception across mobile networks' },
      { label: 'EMVCo Compliance', value: '100% Valid', detail: 'Standard Indonesian Bank Indonesia QRIS specifications' },
      { label: 'MDR Fees Avoided', value: '0% Fees', detail: 'Eliminates third-party gateway payment deductions' }
    ],
    codeSnippet: {
      filename: 'backend/src/core/qris/generator.ts',
      language: 'typescript',
      code: `import { calculateCRC16 } from './crc16'
import { formatTLV, parseEMVCo } from './emvco'

export async function generateDynamicQRIS(staticQris: string, amount: number) {
  const parsed = parseEMVCo(staticQris)
  const tags = new Map(parsed.tags)

  // Mutate Point of Initiation Method: 12 (Dynamic QR)
  tags.set('01', '12')

  // Set Currency to 360 (IDR) and Transaction Amount (Tag 54)
  if (!tags.has('53')) tags.set('53', '360')
  tags.set('54', Math.round(amount).toString())

  // Strip existing Tag 63 (CRC) for recalculation
  tags.delete('63')

  // Re-encode TLV elements in standard EMVCo hierarchy
  let payload = ''
  for (const tag of standardOrder) {
    if (tags.has(tag)) payload += formatTLV(tag, tags.get(tag)!)
  }

  // Append Tag 63 placeholder ('6304') and calculate CRC-16/CCITT-FALSE
  const payloadWithHeader = payload + '6304'
  const crc = calculateCRC16(payloadWithHeader)

  return \`\${payloadWithHeader}\${crc}\`
}`,
      explanation: 'TLV tag mutation transforms any static merchant QR code into a dynamic payment request with precise amount encoding and valid 16-bit CRC checksum.'
    },
    simulatorType: 'qris-relay',
    card: {
      badge: '<80ms Match',
      path: 'radarpay / qris-gateway',
      built:
        'Dynamic EMVCo QRIS engine with Android push interception, unique nominal reconciliation, and HMAC-SHA256 webhook relay.',
      result:
        'Zero-fee payment automation, sub-80ms atomic order matching, and resilient SQLite outbox relay from native Android services.',
      stack: ['Fastify', 'TypeScript', 'Kotlin', 'PostgreSQL', 'Drizzle ORM', 'EMVCo QRIS', 'HMAC-SHA256'],
      terminal: {
        file: 'reconciliation.service.ts',
        tag: 'RECONCILED',
        lines: [
          { kind: 'comment', text: '// Android push notification intercepted' },
          { kind: 'kv', key: 'source', value: 'GoPay Merchant', keyTone: 'accent' },
          { kind: 'kv', key: 'nominal', value: 'Rp 50.001 (base: 50.000 + 1)', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'matching', value: 'order #INV-4821 matched', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'status', value: 'PENDING -> PAID', keyTone: 'hl', valueTone: 'ok' },
          { kind: 'kv', key: 'webhook', value: 'HMAC-SHA256 dispatched', keyTone: 'accent', valueTone: 'ok' },
          { kind: 'kv', key: 'telegram', value: 'alert sent (<80ms)', keyTone: 'dim', valueTone: 'hl' },
        ],
      },
    }
  }
];
