import { useEffect, useState } from 'react';
import { initSmoothScrolling } from './utils/scrollUtils';
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from './components/ResumeModal';
import CursorEffect from './components/CursorEffect';

function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    initSmoothScrolling();
  }, []);

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
    // Restore body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="relative min-h-screen">
      <CursorEffect />
      <NavBar openResumeModal={openResumeModal} />
      <Hero openResumeModal={openResumeModal} />
      <About openResumeModal={openResumeModal} />
      <Features id="skills" />
      <Experience />
      <Projects />
      <Contact />
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
        resumeImageSrc="/img/manas.pdf"
      />
    </main>
  );
}

export default App;
