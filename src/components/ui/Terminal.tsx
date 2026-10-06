import React from 'react';
import { TerminalLine, Tone } from '../../types';

const TONE: Record<Tone, string> = {
  fg: 'text-term-fg',
  dim: 'text-term-dim',
  accent: 'text-term-accent',
  hl: 'text-term-hl',
  ok: 'text-term-ok',
};

interface TerminalProps {
  file: string;
  tag: string;
  lines: TerminalLine[];
}

/** Dark inspection panel. Stays dark in both themes, like a real terminal. */
export const Terminal: React.FC<TerminalProps> = ({ file, tag, lines }) => (
  <div className="overflow-hidden rounded-theme border border-term-line bg-term-bg font-mono text-xs text-term-fg">
    <div className="flex items-center justify-between gap-3 border-b border-term-line px-4 py-3">
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-dot bg-term-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-dot bg-term-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-dot bg-term-line" aria-hidden="true" />
        <span className="ml-2 truncate text-term-dim">{file}</span>
      </div>
      <span className="shrink-0 text-[11px] font-medium tracking-wider text-term-hl">{tag}</span>
    </div>
    <div className="space-y-2 px-4 py-4 leading-relaxed">
      {lines.map((line, i) =>
        line.kind === 'comment' ? (
          <div key={i} className="text-term-dim">
            {line.text}
          </div>
        ) : (
          <div key={i} className="flex items-baseline justify-between gap-4">
            <span className={TONE[line.keyTone ?? 'fg']}>{line.key}</span>
            <span className={`text-right ${TONE[line.valueTone ?? 'fg']}`}>{line.value}</span>
          </div>
        )
      )}
    </div>
  </div>
);
