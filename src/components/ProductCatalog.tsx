/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, CheckCircle2, Sliders, ShieldCheck, Cpu, Database, LayoutGrid } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductCatalogProps {
  isDarkMode?: boolean;
}

export default function ProductCatalog({ isDarkMode = true }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<Product['category'] | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'panels', label: 'Solar Panels' },
    { id: 'inverters', label: 'Inverters' },
    { id: 'batteries', label: 'Batteries' },
    { id: 'structures', label: 'Mounting' },
    { id: 'monitoring', label: 'Monitoring' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 justify-center lg:justify-start" id="product-category-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`prod-cat-${cat.id}`}
            onClick={() => {
              setActiveCategory(cat.id as any);
              setSelectedProduct(null);
            }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isSelected = selectedProduct?.id === product.id;
          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className={`group border rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-[#111d3a] border-blue-900/25 hover:border-[#fbbf24]/40 hover:shadow-2xl hover:shadow-black/40' 
                  : 'bg-white border-blue-100/80 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-100/50'
              }`}
            >
              {/* Top Indicator */}
              <div className={`absolute top-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-transparent via-[#fbbf24]/40 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-blue-500/40 to-transparent'
              }`} />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-mono tracking-widest border px-2.5 py-0.5 rounded-full uppercase ${
                    isDarkMode 
                      ? 'text-[#fbbf24] bg-amber-500/10 border-amber-500/20' 
                      : 'text-blue-700 bg-blue-50 border-blue-100'
                  }`}>
                    {product.brand}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {product.category}
                  </span>
                </div>

                <h4 className={`font-sans font-bold text-lg transition-colors mb-2 ${
                  isDarkMode 
                    ? 'text-white group-hover:text-[#fbbf24]' 
                    : 'text-[#1e3a8a] group-hover:text-blue-700'
                }`}>
                  {product.name}
                </h4>

                <p className={`text-xs leading-relaxed mb-4 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {product.description}
                </p>

                {/* Specs bullet highlights */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feat, index) => (
                    <div key={index} className={`flex items-start space-x-2 text-[11px] ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                        isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'
                      }`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`space-y-4 pt-4 border-t ${
                isDarkMode ? 'border-blue-900/25' : 'border-blue-50'
              }`}>
                {/* Technical Attributes Grid */}
                <div className={`grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-mono ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {product.specs.slice(0, 2).map((spec, index) => (
                    <div key={index}>
                      <span className="block opacity-60 uppercase">{spec.label}</span>
                      <span className={`block font-semibold mt-0.5 ${
                        isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
                      }`}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  id={`product-details-${product.id}`}
                  onClick={() => setSelectedProduct(isSelected ? null : product)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/5 hover:bg-white/10 text-white border-white/5' 
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100'
                  }`}
                >
                  <span>{isSelected ? 'Close Details' : 'View Full Specifications'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expandable Specifications Area */}
              {isSelected && (
                <div className={`mt-4 pt-4 border-t rounded-lg space-y-3 p-3 ${
                  isDarkMode 
                    ? 'border-amber-500/10 bg-amber-500/[0.02]' 
                    : 'border-blue-100 bg-blue-50/40'
                }`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                    isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
                  }`}>
                    <Cpu className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
                    <span>Full Engineering Dataset</span>
                  </div>
                  <div className="space-y-2">
                    {product.specs.map((spec, index) => (
                      <div key={index} className={`flex justify-between items-center text-xs border-b pb-1 last:border-0 last:pb-0 ${
                        isDarkMode ? 'border-blue-900/20' : 'border-blue-50/50'
                      }`}>
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>{spec.label}</span>
                        <span className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        }`}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`text-[10px] leading-snug ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    *This hardware is fully certified by Glanz Energy Engineers under local utility installation and net metering code.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
