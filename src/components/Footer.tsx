import React from 'react';
import { Github, Globe } from 'lucide-react';

const LINKS = [
  { href: 'https://github.com/vnsdma', label: 'GitHub', icon: Github },
  { href: 'https://prawiratobacco.com/', label: 'prawiratobacco.com', icon: Globe },
  { href: 'https://github.com/vnsdma/web-prawira-tobacco', label: 'Web repo', icon: Github },
  { href: 'https://github.com/vnsdma/prawira-tobacco', label: 'Mobile repo', icon: Github },
];

export const Footer: React.FC = () => (
  <footer className="border-t border-line bg-[rgb(var(--c-footer))] py-12">
    <div className="wrap flex flex-col items-center justify-between gap-6 md:flex-row">
      <div className="flex flex-col gap-1 text-center md:text-left">
        <div className="flex items-center justify-center gap-2 text-sm md:justify-start">
          <span className="font-bold text-accent-ink" aria-hidden="true">
            &gt;
          </span>
          <span className="font-semibold text-strong">vnsdma</span>
          <span className="text-mute">/ {new Date().getFullYear()}</span>
        </div>
        <p className="t-small mt-1 text-mute">
          Naufal Faris Fadhil. Built with React 19, Tailwind and GSAP.
        </p>
      </div>

      <nav aria-label="Elsewhere" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-dim transition-colors hover:text-strong"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);
