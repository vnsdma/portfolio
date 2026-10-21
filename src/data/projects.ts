import { Project } from '../types';

export const projectsData: Project[] = [
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
  },
  {
    id: 'prawira-tobacco-suite',
    title: 'Prawira Tobacco Omnichannel Commerce & Retail POS Suite',
    tagline: 'Production retail ecosystem spanning Next.js 15 web storefront, mobile client, continuous camera QR POS, and Supabase backend with multi-gateway payments.',
    category: 'Fullstack Commerce & Retail Systems',
    role: 'Lead Fullstack & Systems Engineer',
    timeframe: '2025 - Present',
    status: 'Live in Production',
    githubUrl: 'https://github.com/vnsdma/web-prawira-tobacco',
    liveUrl: 'https://prawiratobacco.com/',
    summary: 'A production-grade omnichannel retail and commerce platform built for Prawira Tobacco. Unifies a high-performance Next.js 15 web storefront with dual-gateway checkout (Midtrans Snap & RadarPay QRIS) and sub-district RajaOngkir Pro logistics, a touch-first mobile client with active promo voucher validation, a continuous camera-driven POS cashier system that eliminates scanning bottlenecks (<300ms cycle), and a domain-driven API suite with server-isolated credentials and SHA-512 cryptographic webhook verification.',
    problemStatement: 'Indonesian tobacco retail operations suffered from fragmented software silos: web shoppers experienced jarring layout shifts and inaccurate shipping tariffs for distant regencies; mobile users abandoned carts due to sluggish navigation; cashier staff were blocked by camera QR scanners that froze after every individual scan; and orders desynchronized from unverified payment callbacks.',
    solutionDetails: [
      'Architected the web platform using Next.js 15 App Router, React 19, and Tailwind CSS, locking Cumulative Layout Shift (CLS) at 0.00 and achieving 98/100 Lighthouse performance.',
      'Constructed a resilient multi-gateway payment architecture integrating Midtrans Snap (Virtual Accounts, credit cards, e-wallets) and RadarPay dynamic QRIS with SHA-512 webhook verification.',
      'Integrated the RajaOngkir Pro logistics API to dynamically resolve provinces, cities, sub-districts, and courier service options with weight-based tariffs.',
      'Developed a touch-first mobile commerce client with sticky bottom navigation, gesture-friendly slide-over cart drawers, and a serverless voucher validation engine (<80ms response).',
      'Engineered a non-blocking multi-scan camera loop using html5-qrcode that buffers recognized product IDs into active cart memory without stopping video capture (<300ms cycle, 75% cashier friction reduction).',
      'Implemented domain-segregated RESTful Next.js Route Handlers with strict server-runtime credential isolation, atomic database transactions, and real-time profit margin analytics via Recharts.'
    ],
    architecturalHighlights: [
      {
        title: 'Multi-Gateway Payment State Machine',
        description: 'Serverless route handler verifies Midtrans and RadarPay webhook signatures via SHA-512, transitioning orders atomically between settlement, pending, and expired states.'
      },
      {
        title: 'Continuous POS Camera Frame Buffer',
        description: 'Processes live video feeds with debounced memory buffering and audio-haptic feedback, eliminating modal interruptions during cashier checkout.'
      },
      {
        title: 'RajaOngkir Pro Cascading Lookup',
        description: 'Multi-tier geographical resolution (Province -> City -> District) with server-side proxying and caching to ensure rapid shipping cost calculation.'
      },
      {
        title: 'Mobile Drawer & Sub-80ms Voucher Engine',
        description: 'Serverless validation endpoint evaluating voucher usage caps, expiration timestamps, and order minimum thresholds in real time.'
      },
      {
        title: 'Strict Server-Runtime Security',
        description: 'Sensitive credentials (SUPABASE_SERVICE_ROLE_KEY, MIDTRANS_SERVER_KEY, RADARPAY_SECRET_KEY) are strictly isolated from client JavaScript bundles.'
      },
      {
        title: 'Dynamic Profit Margin Telemetry',
        description: 'Server-side aggregation computes gross margin, operational expense breakdown, and net profit dynamically across custom date ranges in Recharts.'
      }
    ],
    technicalStack: [
      'Next.js 15 (App Router)',
      'React 19 & React 18',
      'TypeScript (Strict)',
      'Tailwind CSS',
      'Supabase PostgreSQL (SSR & RLS)',
      'Midtrans Snap',
      'RadarPay QRIS',
      'RajaOngkir Pro API',
      'html5-qrcode',
      'Recharts',
      'Zod'
    ],
    metrics: [
      { label: 'Cumulative Layout Shift', value: '0.00', detail: 'Zero layout shift via pre-allocated skeleton cards' },
      { label: 'POS Scan Cycle Time', value: '<300ms', detail: 'Rapid continuous camera recognition without modals' },
      { label: 'Lighthouse Performance', value: '98/100', detail: 'Optimized server components and bundle splitting' },
      { label: 'Webhook Verification', value: '100% SHA-512', detail: 'Cryptographically authenticated state transitions' },
      { label: 'Cashier Friction Reduction', value: '75%', detail: 'Eliminated manual modal re-triggering' },
      { label: 'Mobile LCP', value: '<0.9s', detail: 'Sub-second mobile content paint with instant cart sync' }
    ],
    codeSnippets: [
      {
        title: 'SHA-512 Payment Webhook Handler',
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
        explanation: 'Server-side cryptographic hash verification prevents forged payment callbacks and maintains database state integrity across gateways.'
      },
      {
        title: 'Non-Blocking Continuous Camera Scanner',
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
        explanation: 'Time-window debouncing combined with a persistent camera stream enables cashier staff to scan whole baskets in seconds without popup interruptions.'
      }
    ],
    simulatorType: 'prawira-suite',
    card: {
      badge: '0.00 CLS • <300ms POS',
      path: 'prawira-tobacco / full-suite',
      built:
        'Omnichannel commerce ecosystem: Next.js 15 storefront with Midtrans & RadarPay QRIS, RajaOngkir Pro shipping, mobile client, and non-blocking continuous camera QR POS.',
      result:
        'Live at prawiratobacco.com. 0.00 CLS, 98 Lighthouse score, 75% cashier friction reduction, and 100% SHA-512 verified webhook security.',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase Postgres', 'Midtrans & RadarPay', 'RajaOngkir Pro', 'html5-qrcode', 'Recharts'],
      terminal: {
        file: 'prawira-ecosystem / core.ts',
        tag: 'PRODUCTION',
        lines: [
          { kind: 'comment', text: '// omnichannel commerce & pos suite' },
          { kind: 'kv', key: 'storefront', value: '0.00 CLS / 98 Lighthouse', keyTone: 'accent', valueTone: 'ok' },
          { kind: 'kv', key: 'payments', value: 'Midtrans + RadarPay QRIS', keyTone: 'accent', valueTone: 'ok' },
          { kind: 'kv', key: 'pos camera', value: '<300ms continuous loop', keyTone: 'hl', valueTone: 'ok' },
          { kind: 'kv', key: 'logistics', value: 'RajaOngkir sub-district', keyTone: 'dim', valueTone: 'ok' },
          { kind: 'kv', key: 'security', value: 'SHA-512 webhook verified', keyTone: 'accent', valueTone: 'ok' },
        ],
      },
    }
  }
];
