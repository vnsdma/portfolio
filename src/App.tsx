import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Architecture } from './components/Architecture';
import { Stack } from './components/Stack';
import { Manifesto } from './components/Manifesto';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RecruiterBriefModal } from './components/RecruiterBriefModal';
import { Project } from './types';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBriefOpen, setIsBriefOpen] = useState<boolean>(false);
  const openBrief = () => setIsBriefOpen(true);

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <div className="grid-bg" aria-hidden="true" />

      <Navbar onOpenRecruiterBrief={openBrief} />

      <main id="content">
        <Hero onOpenRecruiterBrief={openBrief} />
        <Work onSelectProject={setSelectedProject} />
        <Architecture />
        <Stack />
        <Manifesto />
        <Contact onOpenRecruiterBrief={openBrief} />
      </main>

      <Footer />

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <RecruiterBriefModal isOpen={isBriefOpen} onClose={() => setIsBriefOpen(false)} />
    </>
  );
};

export default App;
