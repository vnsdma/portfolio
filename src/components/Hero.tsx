import React from 'react';
import { ArrowDown, Download } from 'lucide-react';

interface HeroProps {
  onOpenRecruiterBrief: () => void;
}

const STATS = [
  {
    label: 'Layout shift',
    index: '01',
    value: '0.00',
    text: 'Cumulative Layout Shift on the live storefront, held by pre-sized skeleton cards.',
  },
  {
    label: 'Lighthouse',
    index: '02',
    value: '98/100',
    text: 'Performance score on the Next.js 15 storefront, from server components and bundle splitting.',
  },
  {
    label: 'Scan cycle',
    index: '03',
    value: '<300ms',
    text: 'Continuous camera scanning in the POS. The video stream never stops between items.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenRecruiterBrief }) => (
  <section id="top" aria-labelledby="hero-title" className="wrap pb-16 pt-32 sm:pb-20 sm:pt-44">
    <div className="flex max-w-5xl flex-col gap-8">
      <p className="eyebrow">
        <span className="dot" aria-hidden="true" />
        Fullstack engineering for commerce and POS systems
      </p>

      <h1 id="hero-title" className="t-display">
        I ship commerce systems where every payment is <span className="mark">verified</span> and
        nothing on the page <span className="mark mark-ul">moves</span>.
      </h1>

      <p className="t-lead max-w-2xl text-dim sm:text-xl sm:leading-relaxed">
        Fullstack engineer working in Next.js 15, React 19 and Supabase. I build multi-gateway
        checkout, sub-district shipping and camera POS for a live store, with{' '}
        <strong className="font-semibold text-strong">0.00 layout shift</strong> on the storefront.
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <a href="#work" className="btn btn-primary">
          Explore production systems
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href="/Naufal_Faris_Fadhil_CV.pdf"
          download="Naufal_Faris_Fadhil_CV.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
        >
          Download CV
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={onOpenRecruiterBrief}
          className="link t-small underline decoration-line underline-offset-4"
        >
          Or read the 30-second recruiter brief
        </button>
      </div>
    </div>

    <dl className="mt-16 grid grid-cols-1 gap-4 border-t border-line pt-12 sm:grid-cols-3 sm:gap-6">
      {STATS.map((s) => (
        <div key={s.label} className="card card-link p-6">
          <dt className="mb-3 flex items-center justify-between text-mute">
            <span className="t-label-sm">{s.label}</span>
            <span className="t-label-sm text-accent-ink" aria-hidden="true">
              {'// '}
              {s.index}
            </span>
          </dt>
          <dd>
            <div className="num text-4xl font-bold tracking-tight text-stat sm:text-5xl">{s.value}</div>
            <p className="t-small mt-3 text-dim">{s.text}</p>
          </dd>
        </div>
      ))}
    </dl>
  </section>
);
