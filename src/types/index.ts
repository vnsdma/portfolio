export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  timeframe: string;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
  summary: string;
  problemStatement: string;
  solutionDetails: string[];
  architecturalHighlights: {
    title: string;
    description: string;
  }[];
  technicalStack: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
  simulatorType?: 'pos-scanner' | 'payment-logistics';
  /** Content for the project card on the home page. */
  card: ProjectCard;
}

export type Tone = 'fg' | 'dim' | 'accent' | 'hl' | 'ok';

export type TerminalLine =
  | { kind: 'comment'; text: string }
  | { kind: 'kv'; key: string; value: string; keyTone?: Tone; valueTone?: Tone };

export interface ProjectCard {
  /** Headline number shown as the badge. */
  badge: string;
  /** Repo-style label, e.g. "prawira-tobacco / mobile". */
  path: string;
  built: string;
  result: string;
  /** Short stack names for the chips (the modal keeps the full list). */
  stack: string[];
  terminal: {
    file: string;
    tag: string;
    lines: TerminalLine[];
  };
}

export interface RecruiterPillar {
  title: string;
  pitch: string;
  differentiator: string;
  evidence: string;
}

export interface SkillCategory {
  category: string;
  /** Short discipline label shown above the category title. */
  tag: string;
  /** One line on how this area is practised. */
  blurb: string;
  skills: string[];
}
