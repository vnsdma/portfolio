import React from 'react';
import { Camera, Gauge, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: ShieldCheck,
    tag: 'Security and integrity',
    title: 'Cryptographic webhook handlers',
    description:
      'Instead of trusting client-side payment confirmations, every transaction settles through server-side SHA-512 verification. Order state transitions are idempotent and protected against replay across Midtrans and Cashify QRIS.',
    specs: [
      'SHA-512 signature hashing with server-isolated secrets',
      'State-machine mapping: settlement, pending, expire, cancel',
      'Atomic database updates through Supabase PostgreSQL transactions',
    ],
  },
  {
    icon: Camera,
    tag: 'Real-time hardware and streams',
    title: 'Continuous POS camera processing',
    description:
      'Browsers usually freeze after a single scan. This scanner processes the video feed continuously and buffers each recognized product straight into the active cart, so the camera never stops.',
    specs: [
      'Debounced frame analysis, under 300ms per cycle',
      'No modal interruptions or video re-initialization',
      'Audio-haptic feedback with duplicate-read cooldowns',
    ],
  },
  {
    icon: Gauge,
    tag: 'Core Web Vitals',
    title: 'Zero-CLS layout engineering',
    description:
      'Skeleton elements are budgeted to match loaded card dimensions exactly, and dynamic imports keep the first JavaScript payload light, so mobile screens never jump.',
    specs: [
      'Cumulative Layout Shift locked at 0.00',
      'Sub-second Largest Contentful Paint',
      'Server component streaming with React 19 Suspense boundaries',
    ],
  },
];

const CHECKLIST = [
  'Idempotent serverless endpoints',
  'Server-isolated credential protection',
  'Performance-budgeted skeleton layouts',
];

export const Architecture: React.FC = () => (
  <section
    id="architecture"
    aria-labelledby="architecture-title"
    className="wrap scroll-mt-20 py-20 sm:py-28"
  >
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Meta rail */}
      <div className="lg:col-span-4">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true" />
            System design and resilience
          </p>
          <h2 id="architecture-title" className="t-h1">
            Architectural rigor from day one
          </h2>
          <p className="t-body text-dim">
            Defensive design for payment verification failures, network dropouts, and continuous
            camera frame buffers.
          </p>
          <div className="inset mt-2 hidden p-5 lg:block">
            <h3 className="t-label-sm mb-3 text-strong">Engineering checklist</h3>
            <ul className="space-y-2">
              {CHECKLIST.map((c) => (
                <li key={c} className="t-small flex items-start gap-3 text-dim">
                  <span className="dot mt-[7px] text-accent" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="flex flex-col gap-8 lg:col-span-8">
        {PILLARS.map(({ icon: Icon, tag, title, description, specs }) => (
          <article key={title} className="card card-link p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="inset grid h-10 w-10 place-items-center text-accent-ink">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="t-label-sm text-mute">{tag}</span>
            </div>
            <h3 className="t-h2">{title}</h3>
            <p className="t-body mt-3 max-w-prose text-dim">{description}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
              {specs.map((spec) => (
                <li key={spec} className="t-small flex items-start gap-3 text-body">
                  <span className="dot mt-[7px] text-accent" aria-hidden="true" />
                  {spec}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
