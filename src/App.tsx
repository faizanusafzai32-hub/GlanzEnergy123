/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Award,
  ShieldCheck,
  Check,
  Settings,
  Zap,
  Users,
  Globe,
  Building2,
  Factory,
  Home,
  ArrowLeftRight,
  Droplet,
  BatteryCharging,
  Wrench,
  BookOpen,
  Heart,
  Leaf,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS, PRODUCTS, PROJECTS, TESTIMONIALS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import SavingsCalculator from './components/SavingsCalculator';
import ProductCatalog from './components/ProductCatalog';
import ProjectPortfolio from './components/ProjectPortfolio';
import ContactSection from './components/ContactSection';
// @ts-ignore
import heroBgImage from './assets/images/solar_house_engineers_1784143169968.jpg';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [surveyModalOpen, setSurveyModalOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('glanz_theme');
      return saved !== null ? saved === 'dark' : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('glanz_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Storage for passing calculator calculations straight to contact form
  const [prefilledQuote, setPrefilledQuote] = useState<{
    averageBillPkr: number;
    propertyType: 'residential' | 'commercial' | 'industrial' | 'agricultural';
    recommendedSystemSize: number;
    estimatedSavings: number;
  } | null>(null);

  // Section Refs for smooth scrolling tracking
  const sectionsRef = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    calculator: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Scroll Spy to update active navigation tab based on position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const [sectionId, ref] of Object.entries(sectionsRef)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const ref = sectionsRef[sectionId as keyof typeof sectionsRef];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCalculatorQuoteSubmit = (quoteDetails: any) => {
    setPrefilledQuote(quoteDetails);
    // Smooth scroll down to contact section where tab changes to Quote form automatically
    handleNavigate('contact');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#07080a] text-gray-100 selection:bg-[#fbbf24] selection:text-[#0c0d0e]' 
        : 'bg-[#f4f7fe] text-[#0f172a] selection:bg-blue-600 selection:text-white'
    }`}>
      
      {/* Dynamic Header Component */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSurveyModal={() => {
          setSurveyModalOpen(true);
          handleNavigate('contact');
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Floating Action Elements (WhatsApp + Quick Quote) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <a
          href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform shadow-green-500/20 group relative border border-green-400/20"
          title="Chat with an Engineer"
          id="floating-whatsapp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0f1115] border border-white/5 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-medium">
            Contact on WhatsApp
          </span>
        </a>
      </div>

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        ref={sectionsRef.hero}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 transition-all duration-300 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(rgba(7, 8, 10, 0.75), rgba(7, 8, 10, 0.9)), url(${heroBgImage})`
            : `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.8)), url(${heroBgImage})`,
        }}
      >
        {/* Dynamic Glowing Energy Accents */}
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${
          isDarkMode ? 'bg-gradient-to-tr from-amber-500/5 to-green-500/5' : 'bg-gradient-to-tr from-blue-500/5 to-amber-500/5'
        }`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 py-12">
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 border px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-white/10 border-white/20 text-white backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
            <span>Premier Solar Engineering Firm</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-white">
              Enlightening the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-yellow-500">Future</span>
            </h1>
            <p className="font-sans text-base sm:text-xl max-w-2xl mx-auto leading-relaxed text-blue-100/90 font-medium">
              Eliminate load-shedding and reduce utility bills down to net zero. Glanz Energy engineers premium on-grid, hybrid, and industrial solar microgrids.
            </p>
          </div>

          {/* Action CTAs Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => handleNavigate('calculator')}
              id="hero-get-quote-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-[#fbbf24] hover:opacity-95 text-[#0c0d0e] font-sans font-bold text-base shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Get Solar Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              id="hero-contact-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-sans font-bold text-base cursor-pointer flex items-center justify-center space-x-1.5 transition-all border bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-sm"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Core Credentials Badges */}
          <div className="pt-12 border-t border-white/10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#fbbf24]" />
              <div>
                <h5 className="font-sans font-bold text-sm text-white">Tier-1 Equipment</h5>
                <p className="text-xs text-blue-100/75 font-medium">LONGi & Jinko Authorized</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#fbbf24]" />
              <div>
                <h5 className="font-sans font-bold text-sm text-white">Certified Engineers</h5>
                <p className="text-xs text-blue-100/75 font-medium">UET & PEC Certified Teams</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#fbbf24]" />
              <div>
                <h5 className="font-sans font-bold text-sm text-white">Net Metering</h5>
                <p className="text-xs text-blue-100/75 font-medium">End-to-End Turnkey Support</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#fbbf24]" />
              <div>
                <h5 className="font-sans font-bold text-sm text-white">25-Yr Performance</h5>
                <p className="text-xs text-blue-100/75 font-medium">Linear Warranty Protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" ref={sectionsRef.about} className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Detail */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono">Our Heritage & Core Mission</span>
              <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl tracking-tight mt-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Decades of Engineering Precision, Perfected for Solar Energy
              </h2>
            </div>

            <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Founded in 2025 in Islamabad, <strong className={isDarkMode ? 'text-white' : 'text-slate-800'}>Glanz Energy</strong> has quickly emerged as Pakistan's premier green energy engineering integrator. We exist to solve the regional power crisis by providing high-yield, premium grade solar generation configurations designed specifically for KPK and Punjab climates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className={`flex items-center space-x-2 font-semibold ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`}>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Our Vision</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  To democratize clean solar micro-grids across Pakistan, replacing erratic carbon-heavy grids with localized, continuous energy independence.
                </p>
              </div>

              <div className="space-y-2">
                <div className={`flex items-center space-x-2 font-semibold ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`}>
                  <Leaf className="w-5 h-5" />
                  <span>Our Mission</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  To supply strictly certified tier-1 equipment and flawless mechanical engineering. We handle every single step, ensuring the absolute safest electrical configurations.
                </p>
              </div>
            </div>

            {/* Achievements & Certifications list */}
            <div className={`pt-6 border-t space-y-4 ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
              <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Accredited Credentials</h4>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
                  isDarkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}>
                  <Award className="w-4 h-4 text-[#fbbf24]" />
                  <span>Premium Certified Solar Installer</span>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
                  isDarkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>ISO 9001:2015 Safety Certified</span>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
                  isDarkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}>
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>PEC Registered Firm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Mockup (Company Story Banner) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-green-500 rounded-3xl blur-2xl opacity-10" />
            <div className={`relative border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'border-white/10 bg-[#0f1115]' : 'border-slate-200 bg-white'
            }`}>
              <img
                src="/src/assets/images/glanz_battery_storage_1784013970480.jpg"
                alt="Glanz smart energy backup suite product"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-[4:3]"
              />
              <div className={`p-6 relative ${isDarkMode ? 'bg-gradient-to-t from-[#0f1115] to-transparent' : 'bg-white'}`}>
                <div className="absolute top-4 right-4 bg-[#fbbf24] text-[#0c0d0e] font-bold text-xs px-2.5 py-1 rounded-md">
                  Est. 2025
                </div>
                <h4 className={`font-sans font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Glanz Engineering Standards
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  Every structural bracket and wire is checked twice under safety standard checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATISTICS SECTION */}
      <section className={`py-16 relative border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-[#090a0c] border-white/5' : 'bg-blue-50 border-blue-100/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className={`uppercase font-mono text-xs tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Total Capacity</div>
            <div className={`font-sans font-extrabold text-3xl sm:text-5xl tracking-tight flex items-center justify-center ${
              isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
            }`}>
              15 <span className={`${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'} text-xl sm:text-2xl ml-1`}>MW+</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Clean solar grids commissioned</p>
          </div>

          <div className="text-center space-y-2">
            <div className={`uppercase font-mono text-xs tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Completed Projects</div>
            <div className={`font-sans font-extrabold text-3xl sm:text-5xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
            }`}>
              450<span className={`${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'} text-xl sm:text-2xl ml-0.5`}>+</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Residential, Commercial & Fields</p>
          </div>

          <div className="text-center space-y-2">
            <div className={`uppercase font-mono text-xs tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Happy Customers</div>
            <div className={`font-sans font-extrabold text-3xl sm:text-5xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
            }`}>
              100<span className={`${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'} text-xl sm:text-2xl ml-0.5`}>%</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Zero-bill satisfaction rating</p>
          </div>

          <div className="text-center space-y-2">
            <div className={`uppercase font-mono text-xs tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Cities Covered</div>
            <div className={`font-sans font-extrabold text-3xl sm:text-5xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
            }`}>
              18<span className={`${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'} text-xl sm:text-2xl ml-0.5`}>+</span>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>Active networks across KPK & Punjab</p>
          </div>
        </div>
      </section>



      {/* 5. PRODUCTS CATALOG SECTION */}
      <section id="products" ref={sectionsRef.products} className={`py-20 lg:py-28 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-[#090a0c] border-white/5' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono">Premium Hardware Only</span>
            <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Tier-1 Certified Hardware Portfolio
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              We exclusively import and install tier-1 hardware components backed by extended international replacement warranties.
            </p>
          </div>

          {/* Dynamic Component */}
          <ProductCatalog isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* 4. PROJECTS PORTFOLIO SECTION */}
      <section id="portfolio" ref={sectionsRef.portfolio} className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono">Case Studies of Success</span>
            <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Completed Solar Success Cases
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              View our completed solar microgrids, residential arrays, and high-tension industrial integrations.
            </p>
          </div>

          {/* Dynamic Portfolio Component */}
          <ProjectPortfolio isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* 7. WHY CHOOSE US SECTION */}
      <section className={`py-20 lg:py-28 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-[#090a0c] border-white/5' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono font-bold">Uncompromising Quality</span>
              <h3 className={`font-sans font-extrabold text-3xl tracking-tight mt-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Why Discerning Customers Trust Glanz Energy
              </h3>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Solar is a 25-year financial investment. We do not compromise on cable quality, structure wind resistance, or inverter arcing safety features.
            </p>
            <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
              <div className={`flex items-center space-x-3 text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>UET Lahore & Peshawar Certified structural designs</span>
              </div>
              <div className={`flex items-center space-x-3 text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Demineralized high-pressure panel washing robots</span>
              </div>
              <div className={`flex items-center space-x-3 text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Live WhatsApp groups for daily solar report logging</span>
              </div>
            </div>
          </div>

          {/* Right Bento Grid of Reasons */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`border p-6 rounded-2xl space-y-3 transition-colors ${
              isDarkMode ? 'bg-[#0f1115] border-white/5 hover:border-amber-500/20' : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-amber-500/10 text-[#fbbf24]' : 'bg-blue-50 text-blue-600'
              }`}>
                <Settings className="w-5 h-5" />
              </div>
              <h5 className={`font-sans font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Certified Engineers</h5>
              <p className={`text-xs leading-normal ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                All projects are designed and signed off by certified, licensed electrical and civil engineers.
              </p>
            </div>

            <div className={`border p-6 rounded-2xl space-y-3 transition-colors ${
              isDarkMode ? 'bg-[#0f1115] border-white/5 hover:border-amber-500/20' : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-amber-500/10 text-[#fbbf24]' : 'bg-blue-50 text-blue-600'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <h5 className={`font-sans font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Premium Equipment</h5>
              <p className={`text-xs leading-normal ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                We strictly install tier-1 solar panel modules and smart smart cooling string inverters.
              </p>
            </div>

            <div className={`border p-6 rounded-2xl space-y-3 transition-colors ${
              isDarkMode ? 'bg-[#0f1115] border-white/5 hover:border-amber-500/20' : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-amber-500/10 text-[#fbbf24]' : 'bg-blue-50 text-blue-600'
              }`}>
                <Zap className="w-5 h-5" />
              </div>
              <h5 className={`font-sans font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Fast Installation</h5>
              <p className="text-gray-400 text-xs leading-normal">
                Site deployment starts within 5 working days of signing agreements. Structure is completed within 72 hours.
              </p>
            </div>

            <div className="bg-[#0f1115] border border-white/5 p-6 rounded-2xl space-y-3 hover:border-amber-500/20 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#fbbf24]">
                <Wrench className="w-5 h-5" />
              </div>
              <h5 className="font-sans font-bold text-base text-white">After Sales O&M</h5>
              <p className="text-gray-400 text-xs leading-normal">
                Every project comes with 1 year of free active panel cleaning and annual engineering thermal inspections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono">Verified Client Reviews</span>
            <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              What Our Clients Say
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Read how residential villas and industrial manufacturers cut operating overheads down to zero.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className={`border rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-[#0f1115] border-white/5 hover:border-amber-500/20' 
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-lg shadow-blue-500/[0.03]'
                }`}
              >
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                    ))}
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed italic ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                    "{t.feedback}"
                  </p>
                </div>

                <div className={`pt-6 border-t mt-6 flex justify-between items-end ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                  <div>
                    <h5 className={`font-sans font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>{t.name}</h5>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>{t.role} {t.company ? `• ${t.company}` : ''}</p>
                    <span className={`text-[10px] mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`}>{t.location}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap ${
                    isDarkMode 
                      ? 'bg-green-500/10 border border-green-500/15 text-green-500' 
                      : 'bg-green-50 border border-green-200 text-green-700'
                  }`}>
                    {t.projectSizeKw} kW Installed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROOFTOP CALCULATOR SECTION */}
      <section id="calculator" ref={sectionsRef.calculator} className={`py-20 lg:py-28 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-[#090a0c] border-white/5' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono">Calculate Your Payback</span>
            <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Instantly Simulate Your ROI & System Dimensions
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Use our smart simulator to estimate your system size, financial savings, and payback curves based on recent utility grid parameters.
            </p>
          </div>

          <SavingsCalculator isDarkMode={isDarkMode} onQuoteSubmit={handleCalculatorQuoteSubmit} />
        </div>
      </section>



      {/* 10. CONTACT PAGE SECTION */}
      <section id="contact" ref={sectionsRef.contact} className={`py-20 lg:py-28 border-t relative transition-colors duration-300 ${
        isDarkMode ? 'bg-[#090a0c] border-white/5' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest font-mono">Start Saving Today</span>
            <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Book a Certified Walkthrough Survey
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              We provide free structural engineering feasibility evaluations and billing consultations under zero pressure.
            </p>
          </div>

          {/* Interactive Contact & CRM Component */}
          <ContactSection
            isDarkMode={isDarkMode}
            prefilledQuote={prefilledQuote}
            clearPrefilledQuote={() => setPrefilledQuote(null)}
            surveyModalOpen={surveyModalOpen}
            onCloseSurveyModal={() => setSurveyModalOpen(false)}
          />
        </div>
      </section>

      {/* Rich Footer Section */}
      <Footer isDarkMode={isDarkMode} onNavigate={handleNavigate} />
    </div>
  );
}
