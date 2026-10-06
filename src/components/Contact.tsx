import React, { useRef, useState } from 'react';
import { Check, Copy, FileText, Mail } from 'lucide-react';

const EMAIL = 'naufalfaris1903@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=Fullstack%20Engineering%20Opportunity%20-%20Naufal%20Faris`;

interface ContactProps {
  onOpenRecruiterBrief: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenRecruiterBrief }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked: the address is still visible and the mailto link works */
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="wrap scroll-mt-20 pb-24 sm:pb-32"
    >
      <div className="card flex flex-col items-center gap-6 p-8 text-center shadow-hard sm:p-14">
        <span className="badge">Open to fullstack, frontend or backend roles</span>

        <h2 id="contact-title" className="t-h1 max-w-2xl sm:text-5xl">
          Let&rsquo;s build something <span className="mark">dependable</span>.
        </h2>

        <p className="t-lead max-w-xl text-dim">
          Ready to ship clean Next.js 15, TypeScript and Supabase systems from the first week. The
          fastest way to reach me is email.
        </p>

        <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
          <a href={MAILTO} className="btn btn-primary">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send an email
          </a>
          <button type="button" onClick={copyEmail} className="btn btn-outline normal-case">
            {copied ? (
              <Check className="h-4 w-4 text-ok" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{copied ? 'Copied to clipboard' : EMAIL}</span>
          </button>
          <button type="button" onClick={onOpenRecruiterBrief} className="btn btn-subtle">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Recruiter brief
          </button>
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>

        <ul className="t-small flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-mute">
          <li className="flex items-center gap-2">
            <span className="dot text-accent" aria-hidden="true" />
            Indonesia
          </li>
          <li className="flex items-center gap-2">
            <span className="dot text-hl" aria-hidden="true" />
            Next.js, React, Supabase
          </li>
          <li className="flex items-center gap-2">
            <span className="dot text-accent" aria-hidden="true" />
            <a
              href="/Naufal_Faris_Fadhil_CV.pdf"
              download="Naufal_Faris_Fadhil_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              CV as PDF
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
