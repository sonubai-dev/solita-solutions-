import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Lock, Github } from 'lucide-react';
import { COMPANY_INFO } from '../config/solitaData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'Why Solita', href: '#why-solita' },
    { label: 'FAQ', href: '#faq' },
    { label: 'About', href: '#about' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-zinc-800 shadow-lg shadow-black/40'
            : 'bg-[#FAFAFA]/90 backdrop-blur-md border-b border-zinc-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo with Editorial Typography */}
        <a
          href="#home"
          id="nav-logo-link"
          className="flex items-baseline space-x-2 group focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded p-1"
        >
          <span className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
            SOLITA
          </span>
          <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">
            Solutions
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleNavClick(link.href)}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${
                darkMode
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* GitHub Profile */}
          <a
            id="nav-github-btn"
            href="https://github.com/sonubai-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              darkMode
                ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                : 'border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
            title="GitHub (@sonubai-dev)"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          {/* Admin Portal Quick Access */}
          <button
            id="nav-admin-btn"
            type="button"
            aria-label="Admin Portal"
            onClick={() => {
              if (onOpenAdmin) onOpenAdmin();
              else window.location.hash = '#admin';
            }}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              darkMode
                ? 'border-zinc-800 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-900'
                : 'border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:bg-zinc-100'
            }`}
            title="Admin Portal (Operations)"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDarkMode(prev => !prev)}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              darkMode
                ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                : 'border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
          </button>

          {/* Primary CTA: Talk to Us - Editorial Pill Button */}
          <button
            id="nav-talk-to-us-btn"
            onClick={() => handleNavClick('#contact')}
            className={`border border-indigo-500/50 text-indigo-400 px-6 py-2 rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer ${
              !darkMode ? 'bg-indigo-50/50 hover:bg-indigo-600 hover:text-white text-indigo-600' : ''
            }`}
          >
            <span>Talk to Us</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-theme-toggle-btn"
            type="button"
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDarkMode(prev => !prev)}
            className={`p-2 rounded-full border transition-colors ${
              darkMode
                ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                : 'border-zinc-200 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full border transition-colors ${
              darkMode
                ? 'border-zinc-800 text-zinc-200 hover:bg-zinc-900'
                : 'border-zinc-200 text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className={`lg:hidden border-b px-6 pt-4 pb-8 space-y-3 transition-all ${
            darkMode
              ? 'bg-[#080808] border-zinc-800 text-zinc-200'
              : 'bg-[#FAFAFA] border-zinc-200 text-zinc-800 shadow-xl'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleNavClick(link.href)}
              className={`w-full text-left py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors ${
                darkMode
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-4 mt-2 border-t border-zinc-800 flex flex-col gap-3">
            <button
              id="mobile-nav-cta-btn"
              onClick={() => handleNavClick('#contact')}
              className="w-full py-2.5 px-5 border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-full text-[11px] uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2 transition-all"
            >
              <span>Talk to Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="mobile-admin-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdmin) onOpenAdmin();
                else window.location.hash = '#admin';
              }}
              className={`w-full py-2 px-4 text-[11px] font-mono uppercase tracking-wider rounded-full text-center border flex items-center justify-center gap-1.5 transition-colors ${
                darkMode
                  ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  : 'border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Admin Operations Desk</span>
            </button>
            <a
              href="https://github.com/sonubai-dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-4 text-[11px] font-mono uppercase tracking-wider rounded-full text-center border flex items-center justify-center gap-1.5 transition-colors ${
                darkMode
                  ? 'border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
                  : 'border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Github className="w-3.5 h-3.5 text-indigo-400" />
              <span>GitHub (@sonubai-dev)</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-4 text-[11px] font-mono uppercase tracking-wider rounded-full text-center border transition-colors ${
                darkMode
                  ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                  : 'border-emerald-600/30 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              WhatsApp: {COMPANY_INFO.contact.whatsappDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
