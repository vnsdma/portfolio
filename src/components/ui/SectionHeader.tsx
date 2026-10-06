import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleId: string;
  aside?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, titleId, aside }) => (
  <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="eyebrow">
        <span className="dot" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={titleId} className="t-h1 mt-3">
        {title}
      </h2>
    </div>
    {aside && <p className="t-body max-w-md text-dim">{aside}</p>}
  </div>
);
