import React, { useRef, useState } from 'react';
import { Check, Copy, Download, FileText, Mail, X } from 'lucide-react';
import { recruiterPillars, skillCategories } from '../data/recruiterData';
import { Modal } from './Modal';

interface RecruiterBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRIEF_TEXT = `Candidate: Naufal Faris Fadhil (@vnsdma) - Fullstack Software Engineer
Specialization: High-Performance Web Applications, Next.js 15 App Router, Supabase, Multi-Gateway Payments (Midtrans & Cashify QRIS), and Point-of-Sale Systems.
Key Technical Achievements:
1. Shipped live commercial e-commerce platform (https://prawiratobacco.com) with Midtrans Snap, Cashify QRIS, and RajaOngkir Pro sub-district shipping.
2. Built continuous non-blocking camera QR POS cashier system (<300ms scan cycle time).
3. 98+ Lighthouse scores with 0.00 Cumulative Layout Shift (CLS) via budgeted skeleton layouts.
4. Strict TypeScript discipline, server-isolated credential architecture, and SHA-512 webhook signature verification.
Web E-Commerce: https://github.com/vnsdma/web-prawira-tobacco
Mobile E-Commerce: https://github.com/vnsdma/prawira-tobacco
Contact: naufalfaris1903@gmail.com`;

const QUICK_FACTS = [
  { value: 'Next.js 15', label: 'App Router and React 19' },
  { value: '0.00 CLS', label: 'Performance budget' },
  { value: 'Multi-gateway', label: 'Midtrans and Cashify QRIS' },
  { value: 'SHA-512', label: 'Verified webhooks' },
];

export const RecruiterBriefModal: React.FC<RecruiterBriefModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  if (!isOpen) return null;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(BRIEF_TEXT);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <Modal onClose={onClose} labelledBy="brief-modal-title" widthClass="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-line bg-inset p-6">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="badge">Recruiter brief</span>
            <span className="t-small text-mute">Candidate summary</span>
          </div>
          <h2 id="brief-modal-title" className="t-h1 !text-2xl sm:!text-3xl">
            Fullstack software engineer
          </h2>
          <p className="t-body mt-2 max-w-xl text-dim">
            Commercial systems built, the architectural decisions behind them, and the production skills
            they show.
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close recruiter brief" className="btn btn-subtle btn-sm shrink-0 !p-2">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-8 overflow-y-auto p-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_FACTS.map((f) => (
            <div key={f.value} className="inset p-3.5 text-center">
              <dd className="num text-base font-bold text-stat sm:text-lg">{f.value}</dd>
              <dt className="t-small mt-0.5 text-dim">{f.label}</dt>
            </div>
          ))}
        </dl>

        <div>
          <h3 className="t-label-sm mb-3 text-mute">Core engineering strengths</h3>
          <ol className="space-y-3">
            {recruiterPillars.map((p, i) => (
              <li key={p.title} className="inset p-4">
                <div className="mb-2 flex items-start gap-3">
                  <span className="num grid h-5 w-5 shrink-0 place-items-center border border-accent text-[11px] font-bold text-accent-ink rounded-chip">
                    {i + 1}
                  </span>
                  <h4 className="t-small font-semibold text-strong">{p.title}</h4>
                </div>
                <p className="t-small mb-3 text-dim">{p.pitch}</p>
                <div className="t-small flex flex-col gap-1 border-t border-line pt-3 text-mute sm:flex-row sm:justify-between sm:gap-6">
                  <span>
                    Differentiator: <span className="text-body">{p.differentiator}</span>
                  </span>
                  <span>
                    Evidence: <span className="text-accent-ink">{p.evidence}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="t-label-sm mb-3 text-mute">Technical competency matrix</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat.category} className="inset p-4">
                <h4 className="t-small mb-2 font-semibold text-strong">{cat.category}</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-stretch justify-between gap-3 border-t border-line bg-inset px-6 py-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/Naufal_Faris_Fadhil_CV.pdf"
            download="Naufal_Faris_Fadhil_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download CV
          </a>
          <button type="button" onClick={copyBrief} className="btn btn-subtle btn-sm">
            {copied ? <Check className="h-3.5 w-3.5 text-ok" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy brief'}
          </button>
        </div>
        <a
          href="mailto:naufalfaris1903@gmail.com?subject=Fullstack%20Engineering%20Opportunity%20-%20Naufal%20Faris%20Fadhil"
          className="btn btn-primary btn-sm"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          Contact by email
        </a>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Brief copied to clipboard' : ''}
      </span>
    </Modal>
  );
};
