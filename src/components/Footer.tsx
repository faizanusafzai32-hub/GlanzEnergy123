/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Facebook, ArrowUpRight, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  isDarkMode?: boolean;
}

export default function Footer({ onNavigate, isDarkMode = true }: FooterProps) {
  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Equipment Catalog' },
    { id: 'portfolio', label: 'Completed Projects' },
    { id: 'calculator', label: 'Savings Calculator' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <footer className={`transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#090a0c] border-t border-white/5 text-gray-400' 
        : 'bg-[#0a1226] border-t border-blue-900/15 text-slate-400'
    } font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Logo / Tagline / Socials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => onNavigate('hero')}>
              <Logo className="w-9 h-9" isDarkMode={true} />
              <div>
                <span className="font-sans font-bold text-lg tracking-tight text-white block">
                  Glanz<span className="text-[#fbbf24]">Energy</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-gray-500 block uppercase -mt-1">
                  {COMPANY_DETAILS.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Glanz Energy is Pakistan's premier engineering firm implementing high-yield, smart solar technology setups. We deliver turn-key grid-tied and hybrid configurations for clean, automated electricity independence.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a
                href={COMPANY_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#fbbf24] hover:text-[#0c0d0e] text-white flex items-center justify-center border border-white/5 transition-all"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider">Navigational Map</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left text-xs text-gray-300 hover:text-[#fbbf24] transition-colors py-1 flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#fbbf24]/60" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Licenses & Industry Certifications */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider">Quality Seals</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <Shield className="w-4 h-4 text-[#fbbf24] flex-shrink-0" />
                <span>Certified Solar Partner</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Award className="w-4 h-4 text-[#fbbf24] flex-shrink-0" />
                <span>Tier-1 Partner</span>
              </div>
              <div className="text-[10px] text-slate-400 leading-normal">
                Authorized to engineer, construct, and commission grid integrations up to 1 MegaWatt.
              </div>
            </div>
          </div>

          {/* Dynamic Newsletter Subscription Box */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider">Solar Insights</h4>
            <p className="text-xs text-slate-300 leading-normal">
              Subscribe to get seasonal solar tariff alerts, tax credit guides, and energy optimization tips.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex space-x-1.5" id="newsletter-form">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#fbbf24] outline-none flex-1"
              />
              <button
                type="submit"
                id="newsletter-submit-btn"
                className="p-2.5 rounded-xl bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#0c0d0e] transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-white/10'} flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4`}>
          <div>
            © {new Date().getFullYear()} Glanz Energy (Pvt) Ltd. All Rights Reserved. Founded {COMPANY_DETAILS.founded}.
          </div>
          <div className="flex items-center space-x-1">
            <span>Powering sustainable grid independence with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>in Islamabad, KPK, & Punjab.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
