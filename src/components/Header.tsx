/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, ArrowUpRight, Menu, X, Landmark, ShieldCheck, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data';
import Logo from './Logo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSurveyModal: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ activeSection, onNavigate, onOpenSurveyModal, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Upper Info Bar */}
      <div className={`border-b text-xs py-2 px-4 md:px-8 flex justify-between items-center z-50 relative hidden sm:flex transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#030712] border-blue-900/30 text-slate-400' 
          : 'bg-[#f0f5ff] border-blue-100 text-slate-700'
      }`}>
        <div className="flex items-center space-x-6">
          <a href={`tel:${COMPANY_DETAILS.phone}`} className={`flex items-center space-x-2 transition-colors ${
            isDarkMode ? 'hover:text-[#fbbf24]' : 'hover:text-blue-600'
          }`}>
            <Phone className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
            <span>{COMPANY_DETAILS.phoneDisplay}</span>
          </a>
          <a href={`mailto:${COMPANY_DETAILS.email}`} className={`flex items-center space-x-2 transition-colors ${
            isDarkMode ? 'hover:text-[#fbbf24]' : 'hover:text-blue-600'
          }`}>
            <Mail className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
            <span>{COMPANY_DETAILS.email}</span>
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
            <span>NEPRA Certified Installer</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Landmark className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
            <span>Serving KPK & Punjab</span>
          </span>
        </div>
      </div>

      {/* Main Glassmorphism Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#050b18]/90 backdrop-blur-md py-3 border-b border-blue-900/25 shadow-lg shadow-blue-950/20'
              : 'bg-white/90 backdrop-blur-md py-3 border-b border-blue-100 shadow-md shadow-blue-100/10'
            : 'bg-transparent py-5 border-b border-white/0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="glanz-logo"
          >
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" isDarkMode={isDarkMode} />
            <div>
              <span className={`font-sans font-bold text-xl tracking-tight block transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
              }`}>
                Glanz<span className={isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}>Energy</span>
              </span>
              <span className={`text-[9px] font-mono tracking-widest block uppercase -mt-1 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {COMPANY_DETAILS.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative px-4 py-2 rounded-md font-sans text-sm font-medium transition-colors ${
                    isActive 
                      ? isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600 font-semibold' 
                      : isDarkMode ? 'text-slate-300 hover:text-[#fbbf24]' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-4 right-4 h-0.5 ${
                        isDarkMode ? 'bg-[#fbbf24]' : 'bg-blue-600'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-blue-950/50 text-[#fbbf24] hover:bg-blue-900/50 border border-blue-900/30 hover:scale-105' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 hover:scale-105'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              id="header-get-quote-btn"
              className={`px-5 py-2.5 rounded-xl font-sans text-sm font-bold transition-all flex items-center space-x-1 group shadow-lg cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#0c0d0e] shadow-amber-500/10' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10'
              }`}
            >
              <span>Get Solar Quote</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'bg-blue-950/50 text-[#fbbf24] border border-blue-900/30' 
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#0c0d0e]' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Get Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' 
                  : 'bg-slate-100 hover:bg-slate-200 text-[#0c0d0e] border-slate-200'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={`lg:hidden border-t overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-[#050b18] border-blue-950' : 'bg-white border-blue-50'
              }`}
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg font-sans text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive 
                          ? isDarkMode 
                            ? 'bg-[#fbbf24]/10 text-[#fbbf24]' 
                            : 'bg-blue-50 text-blue-600 font-semibold'
                          : isDarkMode 
                            ? 'text-slate-300 hover:bg-white/5' 
                            : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-[#fbbf24]' : 'bg-blue-600'}`} />}
                    </button>
                  );
                })}
                <div className={`pt-4 pb-2 border-t ${isDarkMode ? 'border-blue-950' : 'border-blue-50'}`}>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium text-center flex items-center justify-center space-x-1"
                  >
                    <span>Contact on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
