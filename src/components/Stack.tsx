import React from 'react';
import { skillCategories } from '../data/recruiterData';
import { SectionHeader } from './ui/SectionHeader';

const FEATURED_PER_CATEGORY = 6;

export const Stack: React.FC = () => (
  <section id="stack" aria-labelledby="stack-title" className="wrap scroll-mt-20 pb-20 sm:pb-28">
    <SectionHeader
      eyebrow="Disciplines and toolchain"
      title="Engineering primitives"
      titleId="stack-title"
      aside="Technologies chosen for predictability under load, typed safety, and operational simplicity."
    />

    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skillCategories.map((cat, i) => (
        <article key={cat.category} className="card card-link flex flex-col justify-between p-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="t-label-sm text-accent-ink">
                {String(i + 1).padStart(2, '0')} / {cat.tag}
              </span>
              <span className="dot text-hl" aria-hidden="true" />
            </div>
            <h3 className="t-h3 mb-3">{cat.category}</h3>
            <p className="t-small mb-6 text-dim">{cat.blurb}</p>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {cat.skills.slice(0, FEATURED_PER_CATEGORY).map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);
