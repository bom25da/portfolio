import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Work } from './components/Work';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MenuDialog } from './components/MenuDialog';
import { ProjectDialog } from './components/ProjectDialog';
import { ScrollProgress } from './components/ScrollProgress';
import { useScrollMotion } from './hooks/useScrollMotion';
import { projects } from './data/projects';

export function App() {
  const pageRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(null);
  useScrollMotion(pageRef);

  const openCase = useCallback(id => {
    const index = projects.findIndex(project => project.id === id);
    if (index >= 0) setActiveCase(index);
  }, []);
  const navigateCase = useCallback(direction => {
    setActiveCase(index => index === null ? null : (index + direction + projects.length) % projects.length);
  }, []);
  const closeCase = useCallback(() => setActiveCase(null), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    // Vite's development entry mounts after the browser's initial anchor lookup.
    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        target?.scrollIntoView({ behavior: 'instant' });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#main">본문으로 이동</a>
      <ScrollProgress />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <main id="main">
        <Hero />
        <Statement />
        <Work onOpen={openCase} />
        <About />
        <Contact />
      </main>
      <Footer />
      <MenuDialog open={menuOpen} onClose={closeMenu} />
      <ProjectDialog activeIndex={activeCase} onClose={closeCase} onNavigate={navigateCase} />
    </div>
  );
}
