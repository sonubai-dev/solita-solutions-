import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyPositioning } from './components/CompanyPositioning';
import { ProductSection } from './components/ProductSection';
import { ServiceSection } from './components/ServiceSection';
import { WhySolita } from './components/WhySolita';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { LeadershipSection } from './components/LeadershipSection';
import { FutureVision } from './components/FutureVision';
import { HiringSection } from './components/HiringSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { AdminPage } from './components/admin/AdminPage';

export default function App() {
  // Default to dark premium technology theme as mandated in Section 20
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    window.location.hash = '#home';
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // Render Admin Backend Page if URL hash is #admin
  if (isAdminRoute) {
    return (
      <div
        id="solita-admin-root"
        className={`min-h-screen transition-colors duration-200 selection:bg-indigo-500/30 selection:text-indigo-200 ${
          darkMode ? 'bg-[#080808] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'
        }`}
      >
        <AdminPage
          onExit={handleExitAdmin}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>
    );
  }

  return (
    <div
      id="solita-app-root"
      className={`min-h-screen transition-colors duration-200 selection:bg-indigo-500/30 selection:text-indigo-200 ${
        darkMode ? 'bg-[#080808] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'
      }`}
    >
      {/* 1. Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={handleOpenAdmin}
      />

      <main id="main-content">
        {/* 2. Hero */}
        <Hero darkMode={darkMode} />

        {/* 3. Company positioning */}
        <CompanyPositioning darkMode={darkMode} />

        {/* 4. Products */}
        <ProductSection darkMode={darkMode} />

        {/* 5. Services */}
        <ServiceSection darkMode={darkMode} />

        {/* 6. Why Solita */}
        <WhySolita darkMode={darkMode} />

        {/* 6.5 Frequently Asked Questions */}
        <FAQSection darkMode={darkMode} />

        {/* 7. About */}
        <AboutSection darkMode={darkMode} />

        {/* 8. Leadership */}
        <LeadershipSection darkMode={darkMode} />

        {/* 9. Technology / Areas We're Exploring */}
        <FutureVision darkMode={darkMode} />

        {/* 10. Hiring */}
        <HiringSection darkMode={darkMode} />

        {/* 11. Contact CTA & Form */}
        <ContactSection darkMode={darkMode} />
      </main>

      {/* 12. Footer */}
      <Footer
        darkMode={darkMode}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Legal Compliance Modal */}
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        darkMode={darkMode}
      />
    </div>
  );
}
