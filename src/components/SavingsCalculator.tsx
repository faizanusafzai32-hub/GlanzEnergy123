/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sun, ShieldAlert, Sparkles, HelpCircle, Check, DollarSign, Calculator, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SavingsCalculatorProps {
  isDarkMode?: boolean;
  onQuoteSubmit: (details: {
    averageBillPkr: number;
    propertyType: 'residential' | 'commercial' | 'industrial' | 'agricultural';
    recommendedSystemSize: number;
    estimatedSavings: number;
  }) => void;
}

export default function SavingsCalculator({ isDarkMode = true, onQuoteSubmit }: SavingsCalculatorProps) {
  const [bill, setBill] = useState<number>(45000);
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'industrial' | 'agricultural'>('residential');
  const [phaseType, setPhaseType] = useState<'single' | 'three'>('three');
  const [roofArea, setRoofArea] = useState<number>(800);

  // Computed Values
  const [systemSize, setSystemSize] = useState<number>(10);
  const [panelsCount, setPanelsCount] = useState<number>(18);
  const [initialInvestment, setInitialInvestment] = useState<number>(1850000);
  const [annualSavings, setAnnualSavings] = useState<number>(430000);
  const [paybackYears, setPaybackYears] = useState<number>(3.8);
  const [co2Saved, setCo2Saved] = useState<number>(11.5);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Highly realistic calculations for Solar in Pakistan (2026 conditions)
    // Avg cost per unit ~ 65 PKR
    const monthlyUnits = bill / 65;
    // 1 kW solar generates ~125 units per month in Islamabad/Punjab/KPK
    let calculatedSize = monthlyUnits / 125;
    
    // Normalize to standard sizes
    if (calculatedSize < 4) {
      calculatedSize = 5; // minimum standard three-phase/hybrid
    } else if (calculatedSize <= 7) {
      calculatedSize = 5;
    } else if (calculatedSize <= 12) {
      calculatedSize = 10;
    } else if (calculatedSize <= 17) {
      calculatedSize = 15;
    } else if (calculatedSize <= 22) {
      calculatedSize = 20;
    } else if (calculatedSize <= 35) {
      calculatedSize = 30;
    } else if (calculatedSize <= 75) {
      calculatedSize = 50;
    } else {
      calculatedSize = Math.round(calculatedSize / 10) * 10;
    }

    if (propertyType === 'industrial') {
      calculatedSize = Math.max(100, calculatedSize);
    } else if (propertyType === 'commercial') {
      calculatedSize = Math.max(20, calculatedSize);
    }

    // Panels count (assuming 585W Longi/Jinko Panels)
    const panels = Math.ceil((calculatedSize * 1000) / 585);

    // Approximate Turnkey Costs in PKR (Hybrid/On-Grid systems)
    // 5kW: ~900k, 10kW: ~1.5M, 15kW: ~2.1M, 20kW: ~2.6M, 30kW: ~3.8M, 50kW+: ~110k per kW
    let cost = 0;
    if (calculatedSize <= 5) cost = 950000;
    else if (calculatedSize <= 10) cost = 1650000;
    else if (calculatedSize <= 15) cost = 2300000;
    else if (calculatedSize <= 20) cost = 2850000;
    else if (calculatedSize <= 30) cost = 4100000;
    else cost = calculatedSize * 125000; // industrial pricing scale

    // Adjust cost based on phase & storage requirements
    if (phaseType === 'single' && calculatedSize <= 5) {
      cost -= 100000; // slightly cheaper inverter
    }

    // Monthly Savings (assuming net metering exports offsets 90% of overall utility bill)
    const monthlySavings = bill * 0.92;
    const yearlySavings = monthlySavings * 12;

    const payback = cost / yearlySavings;
    const co2 = calculatedSize * 0.95; // 0.95 Tonnes CO2 saved per kW annually in Pakistan

    setSystemSize(parseFloat(calculatedSize.toFixed(1)));
    setPanelsCount(panels);
    setInitialInvestment(cost);
    setAnnualSavings(Math.round(yearlySavings));
    setPaybackYears(parseFloat(Math.max(2.2, Math.min(6.5, payback)).toFixed(1)));
    setCo2Saved(parseFloat(co2.toFixed(1)));

    // Generate Chart Data: 10 Year Cumulative Savings vs Grid Costs
    const data = [];
    let cumulativeSolarSavings = 0;
    let cumulativeGridSpend = 0;
    
    // Grid tariff increases estimated at 12% annually in Pakistan
    const annualTariffIncrease = 0.12;

    for (let year = 1; year <= 10; year++) {
      const gridCostThisYear = bill * 12 * Math.pow(1 + annualTariffIncrease, year - 1);
      cumulativeGridSpend += gridCostThisYear;
      
      const solarSavingsThisYear = yearlySavings * Math.pow(1 + annualTariffIncrease, year - 1);
      cumulativeSolarSavings += solarSavingsThisYear;

      data.push({
        year: `Year ${year}`,
        'Without Solar (Grid Spend)': Math.round(cumulativeGridSpend / 100000) / 10, // in Lacs
        'With Solar (Savings)': Math.round((cumulativeSolarSavings - cost) / 100000) / 10, // Net savings after paying back initial cost
      });
    }
    setChartData(data);
  }, [bill, propertyType, phaseType]);

  const handleApplyQuote = () => {
    onQuoteSubmit({
      averageBillPkr: bill,
      propertyType,
      recommendedSystemSize: systemSize,
      estimatedSavings: annualSavings,
    });
  };

  const formatPkr = (num: number) => {
    if (num >= 10000000) {
      return `PKR ${(num / 10000000).toFixed(2)} Crore`;
    }
    if (num >= 100000) {
      return `PKR ${(num / 100000).toFixed(1)} Lakh`;
    }
    return `PKR ${num.toLocaleString()}`;
  };

  return (
    <div className={`border rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 ${
      isDarkMode ? 'bg-[#111d3a] border-blue-900/25' : 'bg-white border-blue-100 shadow-xl shadow-blue-100/40'
    }`}>
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            isDarkMode 
              ? 'bg-amber-500/10 border border-amber-500/25 text-[#fbbf24]' 
              : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <Sparkles className="w-3 h-3" />
            <span>Interactive ROI Simulator</span>
          </div>
          <h3 className={`font-sans font-bold text-2xl lg:text-3xl tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
          }`}>
            Glanz Smart Energy <span className={isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}>Estimator</span>
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Simulate your system dimensions, upfront costs, and payback periods based on NEPRA grid parameters.
          </p>
        </div>
        <div className={`border px-4 py-3 rounded-2xl flex items-center space-x-3 self-start md:self-auto ${
          isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50 border-blue-100'
        }`}>
          <Calculator className={`w-5 h-5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Formula Model</div>
            <div className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>NEPRA Net-Metering v2.5</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Inputs Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bill Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="bill-range" className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Monthly Electricity Bill</label>
              <span className={`font-mono font-bold text-lg px-3 py-0.5 rounded-lg border ${
                isDarkMode 
                  ? 'text-[#fbbf24] bg-amber-500/10 border-amber-500/15' 
                  : 'text-blue-700 bg-blue-50 border-blue-100'
              }`}>
                {formatPkr(bill)}
              </span>
            </div>
            <input
              id="bill-range"
              type="range"
              min="12000"
              max="250000"
              step="3000"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all ${
                isDarkMode ? 'bg-white/5 accent-[#fbbf24]' : 'bg-slate-200 accent-blue-600'
              }`}
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>12k PKR</span>
              <span>100k PKR</span>
              <span>250k PKR</span>
            </div>
          </div>

          {/* Property Type Selection */}
          <div className="space-y-2">
            <span className={`text-sm font-medium block ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Property Profile</span>
            <div className="grid grid-cols-2 gap-2" id="property-type-group">
              {(['residential', 'commercial', 'industrial', 'agricultural'] as const).map((type) => (
                <button
                  key={type}
                  id={`prop-btn-${type}`}
                  onClick={() => setPropertyType(type)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                    propertyType === type
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-amber-500 to-[#fbbf24] text-[#0c0d0e] border-[#fbbf24] shadow-md shadow-amber-500/10'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-600 shadow-md shadow-blue-500/10'
                      : isDarkMode
                        ? 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/10'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Meter Phase Type */}
          <div className="space-y-2">
            <span className={`text-sm font-medium block ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Connection Phase</span>
            <div className="grid grid-cols-2 gap-3" id="phase-type-group">
              <button
                id="phase-btn-single"
                onClick={() => {
                  setPhaseType('single');
                  if (bill > 40000) setBill(35000); // adjust down for single phase limit
                }}
                disabled={bill > 60000}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1 ${
                  phaseType === 'single'
                    ? isDarkMode
                      ? 'bg-white/10 border-[#fbbf24] text-white shadow-md'
                      : 'bg-blue-50 border-blue-500 text-[#1e3a8a] shadow-md'
                    : isDarkMode
                      ? 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                } ${bill > 60000 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span>Single Phase</span>
                <span className="text-[9px] font-mono opacity-60">Up to 7kW max</span>
              </button>
              <button
                id="phase-btn-three"
                onClick={() => setPhaseType('three')}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  phaseType === 'three'
                    ? isDarkMode
                      ? 'bg-white/10 border-[#fbbf24] text-white shadow-md'
                      : 'bg-blue-50 border-blue-500 text-[#1e3a8a] shadow-md'
                    : isDarkMode
                      ? 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span>Three Phase</span>
                <span className="text-[9px] font-mono opacity-60">Net Metering Eligible</span>
              </button>
            </div>
            {bill > 60000 && (
              <div className={`flex items-center space-x-2 text-[10px] p-2 rounded-lg border ${
                isDarkMode 
                  ? 'text-amber-500 bg-amber-500/5 border-amber-500/10' 
                  : 'text-amber-800 bg-amber-50 border border-amber-200'
              }`}>
                <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Three Phase connection is legally mandatory in Pakistan for bills exceeding PKR 40,000.</span>
              </div>
            )}
          </div>

          {/* Technical Feasibility Details */}
          <div className={`border p-4 rounded-2xl space-y-3 ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/20 border-blue-100'
          }`}>
            <div className={`text-xs font-semibold uppercase font-mono tracking-wider flex items-center space-x-2 ${
              isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
            }`}>
              <Settings className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`} />
              <span>Technical Feasibility</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Required Area</div>
                <div className={`font-semibold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>~{Math.round(systemSize * 85)} Sq. Ft.</div>
              </div>
              <div>
                <div className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Panel Type</div>
                <div className={`font-semibold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>N-Type TOPCon Mono</div>
              </div>
              <div>
                <div className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Average Daily Gen</div>
                <div className={`font-semibold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>~{Math.round(systemSize * 4)} Units</div>
              </div>
              <div>
                <div className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Monthly Offset</div>
                <div className={`font-semibold mt-0.5 ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-700'}`}>~{Math.round(systemSize * 125)} Units</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Computation Results & Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Key KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className={`border p-4 rounded-2xl ${
              isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/40 border-blue-100'
            }`}>
              <div className={`text-[11px] font-mono uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>System Capacity</div>
              <div className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>
                {systemSize} <span className={`text-xs ${isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}`}>kW</span>
              </div>
              <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{panelsCount} High-Yield Panels</div>
            </div>

            <div className={`border p-4 rounded-2xl ${
              isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/40 border-blue-100'
            }`}>
              <div className={`text-[11px] font-mono uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Annual Savings</div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {Math.round(annualSavings / 100000).toFixed(1)} <span className="text-xs">Lacs</span>
              </div>
              <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{formatPkr(Math.round(annualSavings / 12))} / month</div>
            </div>

            <div className={`border p-4 rounded-2xl col-span-2 sm:col-span-1 ${
              isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/40 border-blue-100'
            }`}>
              <div className={`text-[11px] font-mono uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Payback Period</div>
              <div className="text-2xl font-bold text-amber-600 mt-1">
                {paybackYears} <span className="text-xs">Years</span>
              </div>
              <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Remaining 21 Years FREE</div>
            </div>
          </div>

          {/* Project Cost Mockup Warning */}
          <div className={`border p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#12161a] border-white/5' : 'bg-blue-50/20 border-blue-100'
          }`}>
            <div>
              <div className={isDarkMode ? 'text-slate-400 text-[10px] font-mono uppercase' : 'text-slate-500 text-[10px] font-mono uppercase'}>Estimated Project Cost</div>
              <div className={`text-xl font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>{formatPkr(initialInvestment)}</div>
              <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Includes Panels, Inverter, Structural Elevators, and licensing</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-xl text-[11px] text-green-600 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Includes 10-Yr Warranty</span>
            </div>
          </div>

          {/* Chart Wrapper */}
          <div className={`border p-4 rounded-2xl ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs font-semibold uppercase font-mono tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>10-Year Cumulative Savings Matrix (Lacs PKR)</span>
              <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Inflation Adjusted (12% CAGR)</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis dataKey="year" stroke={isDarkMode ? "#4b5563" : "#64748b"} fontSize={9} tickLine={false} />
                  <YAxis stroke={isDarkMode ? "#4b5563" : "#64748b"} fontSize={9} tickLine={false} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#0f1115' : '#ffffff', 
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
                      borderRadius: '12px' 
                    }}
                    labelStyle={{ color: isDarkMode ? '#fff' : '#1e3a8a', fontWeight: 'bold', fontSize: '11px' }}
                    itemStyle={{ fontSize: '11px', color: isDarkMode ? '#bbb' : '#334155' }}
                  />
                  <Bar dataKey="Without Solar (Grid Spend)" fill={isDarkMode ? "#ef4444" : "#dc2626"} name="Standard Utility Bill" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="With Solar (Savings)" fill={isDarkMode ? "#10b981" : "#059669"} name="Solar Net Value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROI Action Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 items-center pt-2">
            <button
              onClick={handleApplyQuote}
              id="calculator-apply-quote-btn"
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-sans font-bold text-sm tracking-tight transition-all shadow-lg flex items-center justify-center space-x-2 group cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#0c0d0e] shadow-amber-500/10' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10'
              }`}
            >
              <span>Lock Quote & Survey Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className={`text-center sm:text-left text-[11px] max-w-xs leading-tight ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              *Calculated results are ballpark figures. Subject to shadow analyses and site-specific structure surveys.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
