import React from 'react';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/projects';
import { SectionHeader } from './ui/SectionHeader';
import { Terminal } from './ui/Terminal';

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => {
  const { card } = project;
  return (
    <article className="card card-link p-6 sm:p-8" aria-labelledby={`${project.id}-title`}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Story */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="badge">{card.badge}</span>
              <span className="t-small text-mute">{card.path}</span>
            </div>
            <h3 id={`${project.id}-title`} className="t-h2">
              {project.title}
            </h3>
            <p className="t-body mt-2 text-dim">{project.tagline}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="inset p-4">
              <h4 className="t-label-sm mb-2 text-accent-ink">What I built</h4>
              <p className="t-small text-body">{card.built}</p>
            </div>
            <div className="inset p-4">
              <h4 className="t-label-sm mb-2 text-hl-ink">Result</h4>
              <p className="t-small text-body">{card.result}</p>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {card.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <button
                type="button"
                onClick={onOpen}
                className="link inline-flex items-center gap-1.5 font-semibold underline decoration-line underline-offset-4"
              >
                Open case study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-dim transition-colors hover:text-strong"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  Live site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-dim transition-colors hover:text-strong"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  Source
                </a>
              )}
            </div>
            <span className="t-small text-mute">{'// '}{project.status.toLowerCase()}</span>
          </div>
        </div>

        {/* Inspection panel */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
          {card.image ? (
            <div
              onClick={onOpen}
              className="group relative cursor-pointer overflow-hidden rounded-theme border border-line bg-card shadow-sm transition-all hover:border-[rgb(var(--c-accent))] hover:shadow-md"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpen();
                }
              }}
              aria-label={`Open case study: ${project.title}`}
            >
              {/* Browser window chrome header */}
              <div className="flex items-center justify-between border-b border-line bg-inset px-3.5 py-2 text-xs">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex max-w-[210px] items-center gap-1.5 truncate rounded bg-card/80 px-2 py-0.5 font-mono text-[11px] text-mute border border-line/60">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span className="truncate">{card.image.urlLabel || card.path}</span>
                </div>
                <span className="badge text-[10px] py-0 px-1.5">PREVIEW</span>
              </div>

              {/* High-res screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden bg-inset">
                <img
                  src={card.image.src}
                  alt={card.image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-3">
                  <span className="rounded-full bg-black/85 backdrop-blur-sm px-3.5 py-1 font-mono text-[11px] font-medium text-white shadow-sm flex items-center gap-1.5 border border-white/10">
                    Open Case Study
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ) : card.terminal ? (
            <Terminal file={card.terminal.file} tag={card.terminal.tag} lines={card.terminal.lines} />
          ) : null}

          <dl className="inset divide-y divide-line overflow-hidden bg-card">
            {project.metrics.map((m) => (
              <div key={m.label} className="row-alt flex items-baseline justify-between gap-4 px-4 py-3">
                <dt className="t-small text-dim">{m.label}</dt>
                <dd className="num whitespace-nowrap text-right font-bold text-strong">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
};

const FILTERS = [
  { id: 'all', label: 'All case studies' },
  { id: 'prawira-ai-intelligence', label: 'Enterprise AI Agent' },
  { id: 'radarpay-qris-gateway', label: 'RadarPay QRIS Gateway' },
  { id: 'prawira-tobacco-suite', label: 'Prawira Tobacco Suite' },
] as const;

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.id === activeFilter;
  });

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-20 border-y border-line bg-band py-20 sm:py-24"
    >
      <div className="wrap flex flex-col gap-8 sm:gap-14">
        <SectionHeader
          eyebrow="Case studies and architecture"
          title="Selected production work"
          titleId="work-title"
          aside="Enterprise RAG document intelligence, autonomous dynamic QRIS gateways, fullstack e-commerce platforms, and continuous camera QR POS."
        />

        {/* Category filter tabs */}
        <div
          role="tablist"
          aria-label="Filter case studies"
          className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {FILTERS.map((f) => {
            const count = f.id === 'all' ? projectsData.length : 1;
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(f.id)}
                className={`chip shrink-0 cursor-pointer font-medium transition-colors ${
                  isSelected
                    ? 'border-[rgb(var(--c-accent))] bg-[rgb(var(--c-accent))] font-semibold text-[rgb(var(--c-on-accent))]'
                    : 'text-dim hover:border-[rgb(var(--c-hover-border))] hover:text-strong'
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 font-mono text-[11px] ${
                    isSelected ? 'text-[rgb(var(--c-on-accent))]/80' : 'text-mute'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => onSelectProject(project)} />
          ))}
        </div>
      </div>
    </section>
  );
};
