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
          <Terminal file={card.terminal.file} tag={card.terminal.tag} lines={card.terminal.lines} />

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

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => (
  <section
    id="work"
    aria-labelledby="work-title"
    className="scroll-mt-20 border-y border-line bg-band py-20 sm:py-24"
  >
    <div className="wrap flex flex-col gap-14">
      <SectionHeader
        eyebrow="Case studies and architecture"
        title="Selected production work"
        titleId="work-title"
        aside="Fullstack web platforms, mobile-first commerce clients, multi-gateway payment state machines, and continuous camera-driven POS."
      />
      <div className="flex flex-col gap-10">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => onSelectProject(project)} />
        ))}
      </div>
    </div>
  </section>
);
