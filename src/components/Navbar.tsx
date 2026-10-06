import React from 'react';
import { FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenRecruiterBrief: () => void;
}

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenRecruiterBrief }) => (
  <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
    <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-20">
      {/* Brand + availability */}
      <div className="flex items-center gap-4">
        <a href="#top" className="group flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="font-bold text-accent-ink" aria-hidden="true">
            &gt;
          </span>
          <span className="text-strong transition-colors group-hover:text-accent-ink">vnsdma</span>
          <span className="text-mute" aria-hidden="true">
            /
          </span>
        </a>
        <div className="hidden items-center gap-2 border-l border-line pl-4 xl:flex">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-dot bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-dot bg-accent" />
          </span>
          <span className="t-small text-dim">available for fullstack roles</span>
        </div>
      </div>

      {/* Section links */}
      <nav aria-label="Primary" className="hidden items-center gap-8 text-sm md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="navlink">
            {l.label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={onOpenRecruiterBrief}
          className="btn btn-subtle btn-sm hidden lg:inline-flex"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Brief
        </button>
        <a href="#contact" className="btn btn-ghost-accent btn-sm">
          Get in touch
        </a>
      </div>
    </div>
  </header>
);
