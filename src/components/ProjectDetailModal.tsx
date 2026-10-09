import React, { useEffect, useState } from 'react';
import { BarChart3, Check, Code2, Cpu, ExternalLink, Github, Play, X } from 'lucide-react';
import { Project } from '../types';
import { Modal } from './Modal';
import { PosScannerSimulator } from './InteractiveSimulators/PosScannerSimulator';
import { PaymentLogisticsSimulator } from './InteractiveSimulators/PaymentLogisticsSimulator';

type Tab = 'overview' | 'architecture' | 'simulator' | 'code';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <h3 className={`t-label-sm mb-3 text-mute ${className}`}>{children}</h3>;

const ModalBody: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [tab, setTab] = useState<Tab>('overview');
  const tablistRef = React.useRef<HTMLDivElement>(null);

  // Each project opens on its overview.
  useEffect(() => setTab('overview'), [project.id]);

  useEffect(() => {
    if (!tablistRef.current) return;
    const activeBtn = tablistRef.current.querySelector<HTMLElement>('[aria-selected="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [tab]);

  const tabs: { id: Tab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'Overview & metrics',
      shortLabel: 'Overview',
      icon: <BarChart3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
    {
      id: 'architecture',
      label: 'Architecture',
      shortLabel: 'Architecture',
      icon: <Cpu className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    },
  ];
  if (project.simulatorType)
    tabs.push({
      id: 'simulator',
      label: 'Interactive simulator',
      shortLabel: 'Simulator',
      icon: <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    });
  if (project.codeSnippet)
    tabs.push({
      id: 'code',
      label: 'Code implementation',
      shortLabel: 'Code',
      icon: <Code2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
    });

  return (
    <>
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line bg-inset p-4 sm:p-6">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3 sm:gap-3">
            <span className="badge">{project.category}</span>
            <span className="t-small text-mute">
              {project.status}, {project.timeframe}
            </span>
          </div>
          <h2 id="project-modal-title" className="t-h1 !text-xl leading-snug sm:!text-3xl">
            {project.title}
          </h2>
          <p className="t-body mt-1 line-clamp-2 max-w-2xl text-xs text-dim sm:mt-2 sm:line-clamp-none sm:text-sm">
            {project.tagline}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="btn btn-subtle btn-sm shrink-0 !p-2"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Tabs */}
      <div className="relative shrink-0 border-b border-line bg-card">
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Case study sections"
          className="no-scrollbar flex items-center gap-1 overflow-x-auto px-2.5 sm:px-6 overscroll-contain"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="project-modal-panel"
              onClick={() => setTab(t.id)}
              className="tab shrink-0"
            >
              {t.icon}
              <span className="sm:hidden">{t.shortLabel}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id="project-modal-panel"
        aria-labelledby={`tab-${tab}`}
        className="flex-1 space-y-6 overflow-y-auto p-4 sm:space-y-8 sm:p-6 overscroll-contain"
      >
        {tab === 'overview' && (
          <>
            <div>
              <SectionLabel>Summary</SectionLabel>
              <p className="t-body max-w-prose text-body">{project.summary}</p>
            </div>

            <div>
              <SectionLabel>Key engineering outcomes</SectionLabel>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="inset p-4">
                    <dd className="num text-2xl font-bold text-stat">{m.value}</dd>
                    <dt className="t-small mt-1 font-semibold text-strong">{m.label}</dt>
                    <dd className="t-small mt-0.5 text-dim">{m.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="inset border-l-2 !border-l-accent p-4">
              <SectionLabel className="!text-accent-ink">The challenge</SectionLabel>
              <p className="t-body max-w-prose text-body">{project.problemStatement}</p>
            </div>

            <div>
              <SectionLabel>Technologies used</SectionLabel>
              <ul className="flex flex-wrap gap-2">
                {project.technicalStack.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {tab === 'architecture' && (
          <>
            <div>
              <SectionLabel>System engineering decisions</SectionLabel>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {project.architecturalHighlights.map((item) => (
                  <div key={item.title} className="inset p-4">
                    <h4 className="t-small mb-2 font-semibold text-strong">{item.title}</h4>
                    <p className="t-small text-dim">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Implementation details</SectionLabel>
              <ul className="space-y-3">
                {project.solutionDetails.map((d) => (
                  <li key={d} className="t-small flex items-start gap-3 text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden="true" />
                    <span className="max-w-prose">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {tab === 'simulator' && (
          <>
            {project.simulatorType === 'pos-scanner' && <PosScannerSimulator />}
            {project.simulatorType === 'payment-logistics' && <PaymentLogisticsSimulator />}
          </>
        )}

        {tab === 'code' && project.codeSnippet && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-theme border border-term-line bg-term-bg">
              <div className="flex items-center justify-between gap-3 border-b border-term-line px-4 py-3 font-mono text-xs">
                <span className="truncate text-term-dim">{project.codeSnippet.filename}</span>
                <span className="text-term-hl">{project.codeSnippet.language}</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-term-fg">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
            <p className="t-small inset p-3 text-dim">
              <span className="font-semibold text-strong">Why it works: </span>
              {project.codeSnippet.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-line bg-inset p-3 sm:gap-3 sm:px-6 sm:py-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm !text-xs sm:!text-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Visit live store
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm !text-xs sm:!text-sm"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            View on GitHub
          </a>
        )}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary btn-sm !text-xs sm:!text-sm"
        >
          Close
        </button>
      </div>
    </>
  );
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <Modal onClose={onClose} labelledBy="project-modal-title" widthClass="max-w-4xl">
      <ModalBody project={project} onClose={onClose} />
    </Modal>
  );
};
