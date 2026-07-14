/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ShieldAlert, MapPin, TrendingUp, Sun, Sparkles, X, ChevronRight, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectPortfolioProps {
  isDarkMode?: boolean;
}

export default function ProjectPortfolio({ isDarkMode = true }: ProjectPortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<Project['category'] | 'all'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'agricultural', label: 'Agricultural' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const formatPkr = (num: number) => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)} Lakh PKR`;
    }
    return `${num.toLocaleString()} PKR`;
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start" id="portfolio-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`portfolio-cat-${cat.id}`}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? isDarkMode
                  ? 'bg-[#fbbf24] text-[#0c0d0e] shadow-md shadow-amber-500/10'
                  : 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : isDarkMode
                  ? 'bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  : 'bg-white border border-blue-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`portfolio-card-${project.id}`}
            className={`group border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] ${
              isDarkMode 
                ? 'bg-[#111d3a] border-blue-900/25 hover:border-[#fbbf24]/30 hover:shadow-2xl hover:shadow-black/40' 
                : 'bg-white border-blue-100 shadow-md shadow-blue-100/40 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-200/40'
            }`}
          >
            {/* Image Wrap */}
            <div className="relative aspect-[16:10] overflow-hidden bg-black/40">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${
                isDarkMode ? 'from-[#111d3a] via-[#111d3a]/30 to-transparent' : 'from-white via-white/30 to-transparent'
              }`} />
              
              {/* Category tag */}
              <div className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${
                isDarkMode ? 'bg-[#fbbf24] text-[#0c0d0e]' : 'bg-blue-600 text-white'
              }`}>
                {project.category}
              </div>

              {/* Location pin tag */}
              <div className={`absolute bottom-4 left-4 flex items-center space-x-1 text-xs font-medium backdrop-blur-md px-3 py-1.5 rounded-lg border ${
                isDarkMode 
                  ? 'text-white bg-black/60 border-white/10' 
                  : 'text-slate-800 bg-white/80 border-blue-100 shadow-sm'
              }`}>
                <MapPin className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Project Copy & KPIs */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className={`font-sans font-bold text-lg transition-colors leading-snug ${
                  isDarkMode 
                    ? 'text-white group-hover:text-[#fbbf24]' 
                    : 'text-[#1e3a8a] group-hover:text-blue-700'
                }`}>
                  {project.title}
                </h4>
                <span className={`text-sm font-mono font-bold px-2.5 py-0.5 rounded-lg whitespace-nowrap ml-2 ${
                  isDarkMode 
                    ? 'text-[#fbbf24] bg-amber-500/10 border border-amber-500/15' 
                    : 'text-blue-700 bg-blue-50 border border-blue-100'
                }`}>
                  {project.sizeKw} kW
                </span>
              </div>

              <p className={`text-xs line-clamp-2 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {project.description}
              </p>

              {/* Stats Panel */}
              <div className={`grid grid-cols-2 gap-4 border p-4 rounded-2xl text-xs ${
                isDarkMode ? 'bg-white/[0.01] border-blue-900/20' : 'bg-blue-50/30 border-blue-100'
              }`}>
                <div>
                  <span className={`block uppercase font-mono text-[9px] tracking-wider ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>Annual Off-set Savings</span>
                  <span className="block font-bold text-green-600 text-sm mt-0.5 flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-1 text-green-500" />
                    {formatPkr(project.annualSavingsPkr)}
                  </span>
                </div>
                <div>
                  <span className={`block uppercase font-mono text-[9px] tracking-wider ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>CO2 Emissions Reduction</span>
                  <span className={`block font-bold text-sm mt-0.5 flex items-center ${
                    isDarkMode ? 'text-[#fbbf24]' : 'text-amber-600'
                  }`}>
                    <Leaf className="w-3.5 h-3.5 mr-1" />
                    {project.co2ReductionTonnes} Tonnes
                  </span>
                </div>
              </div>

              <button
                id={`portfolio-view-${project.id}`}
                onClick={() => setActiveProject(project)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center space-x-1.5 cursor-pointer group/btn ${
                  isDarkMode 
                    ? 'bg-white/5 hover:bg-white/10 text-white border-white/5' 
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100'
                }`}
              >
                <span>Read Full Project Success Case</span>
                <ChevronRight className={`w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform ${
                  isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'
                }`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`border rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full relative z-10 max-h-[90vh] flex flex-col transition-colors duration-300 ${
                isDarkMode ? 'bg-[#0f1115] border-blue-900/40 text-slate-100' : 'bg-white border-blue-100 text-slate-800'
              }`}
            >
              {/* Header Image */}
              <div className="relative aspect-[16:9] bg-black/40">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDarkMode ? 'from-[#0f1115] via-[#0f1115]/20 to-transparent' : 'from-white via-white/20 to-transparent'
                }`} />
                
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/10 cursor-pointer"
                  id="modal-close-btn"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-4">
                  <div className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-1.5 ${
                    isDarkMode ? 'bg-[#fbbf24] text-[#0c0d0e]' : 'bg-blue-600 text-white'
                  }`}>
                    {activeProject.category}
                  </div>
                  <h3 className={`font-sans font-bold text-xl sm:text-2xl ${
                    isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
                  }`}>
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 rounded-2xl border text-center ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/50 border-blue-100'
                  }`}>
                    <div className={isDarkMode ? 'text-[9px] font-mono uppercase text-slate-500' : 'text-[9px] font-mono uppercase text-slate-400'}>System Capacity</div>
                    <div className={`text-base sm:text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>{activeProject.sizeKw} kW</div>
                  </div>
                  <div className={`p-3 rounded-2xl border text-center ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/50 border-blue-100'
                  }`}>
                    <div className={isDarkMode ? 'text-[9px] font-mono uppercase text-slate-500' : 'text-[9px] font-mono uppercase text-slate-400'}>Solar Panels</div>
                    <div className={`text-base sm:text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>{activeProject.panelsCount} Panels</div>
                  </div>
                  <div className={`p-3 rounded-2xl border text-center ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/50 border-blue-100'
                  }`}>
                    <div className={isDarkMode ? 'text-[9px] font-mono uppercase text-slate-500' : 'text-[9px] font-mono uppercase text-slate-400'}>CO2 Reduction</div>
                    <div className="text-base sm:text-lg font-bold text-green-600 mt-1">{activeProject.co2ReductionTonnes} T/Yr</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className={`text-sm font-bold uppercase font-mono tracking-wider ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>Project Narrative</h5>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {activeProject.description}
                  </p>
                </div>

                <div className={`grid grid-cols-2 gap-4 border p-4 rounded-2xl ${
                  isDarkMode ? 'bg-[#121519] border-white/5' : 'bg-blue-50/40 border-blue-100'
                }`}>
                  <div>
                    <div className={isDarkMode ? 'text-[10px] font-mono text-slate-400 uppercase' : 'text-[10px] font-mono text-slate-500 uppercase'}>Project Location</div>
                    <div className={`font-semibold mt-0.5 flex items-center text-xs ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      <MapPin className={`w-3.5 h-3.5 mr-1 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
                      {activeProject.location}
                    </div>
                  </div>
                  <div>
                    <div className={isDarkMode ? 'text-[10px] font-mono text-slate-400 uppercase' : 'text-[10px] font-mono text-slate-500 uppercase'}>Annual Financial Impact</div>
                    <div className="font-semibold text-green-600 mt-0.5 flex items-center text-xs">
                      <TrendingUp className="w-3.5 h-3.5 mr-1 text-green-500" />
                      {formatPkr(activeProject.annualSavingsPkr)}
                    </div>
                  </div>
                </div>

                {/* Footnote */}
                <div className={`text-[10px] p-3 rounded-xl border flex items-center space-x-2 ${
                  isDarkMode ? 'text-slate-500 bg-white/5 border-white/5' : 'text-slate-600 bg-blue-50/30 border-blue-100'
                }`}>
                  <Sun className={`w-4 h-4 flex-shrink-0 animate-pulse ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
                  <span>Installed by certified Glanz electrical engineers. System meets strict NEPRA safety grids and standards.</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
