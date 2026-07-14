/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, Send, Calendar, Clock, Database, ChevronDown } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import { QuoteRequest, SurveyRequest } from '../types';

interface ContactSectionProps {
  isDarkMode?: boolean;
  prefilledQuote: {
    averageBillPkr: number;
    propertyType: 'residential' | 'commercial' | 'industrial' | 'agricultural';
    recommendedSystemSize: number;
    estimatedSavings: number;
  } | null;
  clearPrefilledQuote: () => void;
  surveyModalOpen: boolean;
  onCloseSurveyModal: () => void;
}

export default function ContactSection({ isDarkMode = true, prefilledQuote, clearPrefilledQuote, surveyModalOpen, onCloseSurveyModal }: ContactSectionProps) {
  // Tabs: 'general' | 'quote'
  const [activeTab, setActiveTab] = useState<'general' | 'quote'>('general');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Islamabad',
    averageBill: '45000',
    propertyType: 'residential' as const,
    notes: ''
  });

  // General Inquiry Form State
  const [generalForm, setGeneralForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: 'Request Free Information',
    message: ''
  });

  // Simulated Database for inquiries
  const [submittedQuotes, setSubmittedQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    // Sync prefilled quote if passed from calculator
    if (prefilledQuote) {
      setActiveTab('quote');
      setQuoteForm(prev => ({
        ...prev,
        averageBill: prefilledQuote.averageBillPkr.toString(),
        propertyType: prefilledQuote.propertyType,
        notes: `Auto-generated estimate: Recommended System Size: ${prefilledQuote.recommendedSystemSize} kW. Estimated annual savings: ${prefilledQuote.estimatedSavings} PKR.`
      }));
    }
  }, [prefilledQuote]);

  useEffect(() => {
    // Open quote tab if modal-based trigger is fired
    if (surveyModalOpen) {
      setActiveTab('quote');
    }
  }, [surveyModalOpen]);

  // Load submissions on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('glanz_quotes');
    if (savedQuotes) setSubmittedQuotes(JSON.parse(savedQuotes));
  }, []);

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalForm.fullName || !generalForm.phone) {
      alert('Please fill out Name and Phone number.');
      return;
    }

    setSuccessMsg('Your general inquiry has been transmitted to Glanz Sales Desk successfully! We will contact you shortly.');
    setGeneralForm({
      fullName: '',
      phone: '',
      email: '',
      subject: 'Request Free Information',
      message: ''
    });
    setTimeout(() => setSuccessMsg(null), 6000);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.fullName || !quoteForm.phone) {
      alert('Please fill out Name and Phone number.');
      return;
    }

    const calculatedSize = Number(quoteForm.averageBill) / 7000;
    const estSavings = Number(quoteForm.averageBill) * 12 * 0.92;

    const newQuote: QuoteRequest = {
      fullName: quoteForm.fullName,
      phoneNumber: quoteForm.phone,
      email: quoteForm.email,
      city: quoteForm.city,
      averageBillPkr: Number(quoteForm.averageBill),
      propertyType: quoteForm.propertyType,
      recommendedSystemSize: parseFloat(calculatedSize.toFixed(1)),
      estimatedSavings: Math.round(estSavings),
      notes: quoteForm.notes,
      timestamp: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
    };

    const updated = [newQuote, ...submittedQuotes];
    setSubmittedQuotes(updated);
    localStorage.setItem('glanz_quotes', JSON.stringify(updated));

    setSuccessMsg(`Quote Request Recorded! Suggested System: ${newQuote.recommendedSystemSize} kW. Your estimated annual savings is PKR ${newQuote.estimatedSavings.toLocaleString()}. Our Islamabad engineering office will call you within 2 hours.`);
    
    // Clear prefilled fields
    clearPrefilledQuote();
    
    setQuoteForm({
      fullName: '',
      phone: '',
      email: '',
      city: 'Islamabad',
      averageBill: '45000',
      propertyType: 'residential',
      notes: ''
    });
    setTimeout(() => setSuccessMsg(null), 10000);
  };



  const initiateWhatsApp = (topic: string) => {
    const text = encodeURIComponent(`Hello Glanz Energy, I am interested in ${topic}. Please connect me with a consultant.`);
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  const inputClass = `w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors ${
    isDarkMode 
      ? 'bg-white/5 border-white/5 text-white focus:border-[#fbbf24]' 
      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 placeholder-slate-400'
  }`;
  const selectClass = `w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors ${
    isDarkMode 
      ? 'bg-[#121418] border-white/5 text-white focus:border-[#fbbf24]' 
      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
  }`;
  const labelClass = `text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Details & Interactive Cover Maps */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className={`text-xs font-semibold uppercase tracking-widest font-mono ${
            isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'
          }`}>Headquarters & Reach</span>
          <h3 className={`font-sans font-bold text-2xl lg:text-3xl mt-2 ${
            isDarkMode ? 'text-white' : 'text-[#1e3a8a]'
          }`}>Get in Touch</h3>
          <p className={`text-sm mt-2 leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-slate-600'
          }`}>
            Visit our Markaz office in Islamabad or schedule a comprehensive system inspection in KPK or Punjab regions.
          </p>
        </div>

        {/* Dynamic Contact Details Block */}
        <div className="space-y-4">
          <div className={`flex items-start space-x-4 border p-4 rounded-2xl ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/50 border-blue-100'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-[#fbbf24]' : 'bg-blue-500/10 text-blue-600'
            }`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-mono uppercase ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Head Office</div>
              <p className={`text-sm font-semibold mt-1 leading-snug ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>{COMPANY_DETAILS.address}</p>
            </div>
          </div>

          <div className={`flex items-start space-x-4 border p-4 rounded-2xl ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/50 border-blue-100'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-[#fbbf24]' : 'bg-blue-500/10 text-blue-600'
            }`}>
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-mono uppercase ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Phone & WhatsApp Support</div>
              <a href={`tel:${COMPANY_DETAILS.phone}`} className={`block text-sm font-semibold mt-1 transition-colors ${
                isDarkMode ? 'text-white hover:text-[#fbbf24]' : 'text-[#1e3a8a] hover:text-blue-600'
              }`}>{COMPANY_DETAILS.phoneDisplay}</a>
              <span className={isDarkMode ? 'text-[10px] text-gray-500' : 'text-[10px] text-slate-400'}>Available 9 AM to 6 PM (Mon-Sat)</span>
            </div>
          </div>

          <div className={`flex items-start space-x-4 border p-4 rounded-2xl ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/50 border-blue-100'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-[#fbbf24]' : 'bg-blue-500/10 text-blue-600'
            }`}>
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-mono uppercase ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Corporate Email</div>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className={`block text-sm font-semibold mt-1 transition-colors ${
                isDarkMode ? 'text-white hover:text-[#fbbf24]' : 'text-[#1e3a8a] hover:text-blue-600'
              }`}>{COMPANY_DETAILS.email}</a>
            </div>
          </div>
        </div>

        {/* Beautiful vector stylized Map Mockup showing Punjab & KPK coverage */}
        <div className={`border p-5 rounded-2xl space-y-4 relative overflow-hidden transition-all duration-300 ${
          isDarkMode ? 'bg-white/[0.01] border-blue-900/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-semibold uppercase font-mono tracking-wider ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>Services Coverage Map</span>
            <span className="text-[10px] bg-green-500/10 border border-green-500/20 text-green-500 px-2 py-0.5 rounded">Active Network</span>
          </div>

          {/* Interactive Simulated Map Grid */}
          <div className={`relative h-44 border rounded-xl flex flex-col justify-center items-center overflow-hidden ${
            isDarkMode ? 'bg-black/40 border-white/5' : 'bg-blue-50/20 border-blue-100'
          }`}>
            <div className={`absolute inset-0 opacity-10 [background-size:16px_16px] ${
              isDarkMode ? 'bg-[radial-gradient(#fbbf24_1px,transparent_1px)]' : 'bg-[radial-gradient(#2563eb_1px,transparent_1px)]'
            }`} />
            
            {/* Visual Region Pins */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* KPK Node */}
              <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute" />
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className={`text-[10px] font-bold font-mono mt-1 px-1.5 py-0.5 rounded shadow-sm border ${
                  isDarkMode ? 'text-gray-300 bg-black/60 border-white/5' : 'text-slate-800 bg-white/90 border-blue-100'
                }`}>KPK (Peshawar / Swat)</span>
              </div>

              {/* Islamabad Node (HQ) */}
              <div className="absolute top-1/3 left-1/2 flex flex-col items-center">
                <span className="w-3.5 h-3.5 bg-amber-500 rounded-full animate-ping absolute" />
                <span className="w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-black" />
                <span className={`text-[10px] font-bold font-mono mt-1 px-2 py-0.5 rounded-md border shadow-md ${
                  isDarkMode ? 'text-[#fbbf24] bg-black/80 border-amber-500/25' : 'text-blue-700 bg-white border-blue-200'
                }`}>Islamabad (HQ)</span>
              </div>

              {/* Punjab Node */}
              <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute" />
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className={`text-[10px] font-bold font-mono mt-1 px-1.5 py-0.5 rounded shadow-sm border ${
                  isDarkMode ? 'text-gray-300 bg-black/60 border-white/5' : 'text-slate-800 bg-white/90 border-blue-100'
                }`}>Punjab (Lahore / FSD)</span>
              </div>
            </div>
          </div>

          <div className={`text-[11px] text-center ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>
            Providing turn-key engineering, site audits, and NEPRA net metering support across Khyber Pakhtunkhwa & Punjab.
          </div>
        </div>

        {/* Direct WhatsApp Quick Chat Buttons */}
        <div className={`border p-5 rounded-3xl space-y-3 ${
          isDarkMode ? 'bg-[#0c1a14] border-green-500/15' : 'bg-emerald-50/40 border-emerald-100'
        }`}>
          <div className="flex items-center space-x-2 text-green-600">
            <MessageSquare className="w-5 h-5 text-green-500" />
            <h5 className={`font-sans font-bold text-sm ${isDarkMode ? 'text-white' : 'text-emerald-900'}`}>Instant WhatsApp Connect</h5>
          </div>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-emerald-700'}`}>
            Skip the forms entirely. Click below to consult with our solar engineering desk instantly on WhatsApp.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => initiateWhatsApp('Residential Solar Setup')}
              className="py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-sans text-xs font-semibold text-center transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Home Systems</span>
            </button>
            <button
              onClick={() => initiateWhatsApp('Commercial Power Megawatts')}
              className={`py-2.5 px-3 rounded-xl font-sans text-xs font-semibold text-center border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' 
                  : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              <span>Business Net-Metering</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Multi-tab Form Card */}
      <div className="lg:col-span-7">
        <div className={`border rounded-3xl p-6 lg:p-8 shadow-xl space-y-6 relative transition-colors duration-300 ${
          isDarkMode ? 'bg-[#111d3a] border-blue-900/25' : 'bg-white border-blue-100 shadow-xl shadow-blue-100/40'
        }`}>
          
          {/* Tabs Selector */}
          <div className={`flex border-b ${isDarkMode ? 'border-white/5' : 'border-blue-50'}`} id="contact-type-tabs">
            <button
              id="tab-btn-general"
              onClick={() => {
                setActiveTab('general');
                clearPrefilledQuote();
              }}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center transition-colors cursor-pointer ${
                activeTab === 'general' 
                  ? isDarkMode ? 'border-[#fbbf24] text-[#fbbf24]' : 'border-blue-600 text-blue-600'
                  : isDarkMode ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              General Inquiry
            </button>
            <button
              id="tab-btn-quote"
              onClick={() => setActiveTab('quote')}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center transition-colors cursor-pointer relative ${
                activeTab === 'quote' 
                  ? isDarkMode ? 'border-[#fbbf24] text-[#fbbf24]' : 'border-blue-600 text-blue-600'
                  : isDarkMode ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Get Custom Quote
              {prefilledQuote && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Alert Success Banner */}
          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-start space-x-3 text-green-400 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Content Panel */}
          {activeTab === 'general' && (
            <form onSubmit={handleGeneralSubmit} className="space-y-4" id="general-contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="gen-name" className={labelClass}>Full Name *</label>
                  <input
                    id="gen-name"
                    type="text"
                    required
                    value={generalForm.fullName}
                    onChange={(e) => setGeneralForm({ ...generalForm, fullName: e.target.value })}
                    placeholder="e.g. Faizan Yousafzai"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="gen-phone" className={labelClass}>WhatsApp / Phone Number *</label>
                  <input
                    id="gen-phone"
                    type="tel"
                    required
                    value={generalForm.phone}
                    onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                    placeholder="e.g. +923339425413"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="gen-email" className={labelClass}>Email Address</label>
                <input
                  id="gen-email"
                  type="email"
                  value={generalForm.email}
                  onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                  placeholder="e.g. client@domain.com"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="gen-subject" className={labelClass}>Inquiry Subject</label>
                <select
                  id="gen-subject"
                  value={generalForm.subject}
                  onChange={(e) => setGeneralForm({ ...generalForm, subject: e.target.value })}
                  className={selectClass}
                >
                  <option value="Request Free Information">Request Free Information</option>
                  <option value="Net Metering Consultation">Net Metering Consultation</option>
                  <option value="Maintenance Support Audit">Maintenance Support Audit</option>
                  <option value="Partner / Careers">Partner / Careers</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="gen-msg" className={labelClass}>Describe your request</label>
                <textarea
                  id="gen-msg"
                  rows={4}
                  value={generalForm.message}
                  onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                  placeholder="Type any questions you have about Glanz solar panels or our localized engineering services area..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                id="general-form-submit-btn"
                className={`w-full py-3.5 rounded-xl font-sans font-bold text-sm tracking-tight transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#0c0d0e]' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>Submit Query</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Survey form removed as requested */}

          {activeTab === 'quote' && (
            <form onSubmit={handleQuoteSubmit} className="space-y-4" id="quote-contact-form">
              {prefilledQuote && (
                <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-2xl text-xs text-amber-200 flex justify-between items-center">
                  <span>Estimator lock detected: Recommended Size: {prefilledQuote.recommendedSystemSize} kW.</span>
                  <button type="button" onClick={clearPrefilledQuote} className="text-[#fbbf24] font-bold underline cursor-pointer">Reset</button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="qt-name" className={labelClass}>Full Name *</label>
                  <input
                    id="qt-name"
                    type="text"
                    required
                    value={quoteForm.fullName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                    placeholder="Your Name"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="qt-phone" className={labelClass}>Mobile Number (WhatsApp preferred) *</label>
                  <input
                    id="qt-phone"
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    placeholder="e.g. +923339425413"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="qt-city" className={labelClass}>City *</label>
                  <select
                    id="qt-city"
                    value={quoteForm.city}
                    onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    className={selectClass}
                  >
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Swat">Swat</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="qt-type" className={labelClass}>Property Category</label>
                  <select
                    id="qt-type"
                    value={quoteForm.propertyType}
                    onChange={(e) => setQuoteForm({ ...quoteForm, propertyType: e.target.value as any })}
                    className={selectClass}
                  >
                    <option value="residential">Residential Villa</option>
                    <option value="commercial">Commercial Building</option>
                    <option value="industrial">Industrial Mill</option>
                    <option value="agricultural">Agricultural Field</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="qt-bill" className={labelClass}>Monthly Electricity Bill (PKR)</label>
                  <input
                    id="qt-bill"
                    type="number"
                    value={quoteForm.averageBill}
                    onChange={(e) => setQuoteForm({ ...quoteForm, averageBill: e.target.value })}
                    placeholder="e.g. 45000"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="qt-email" className={labelClass}>Email Address</label>
                  <input
                    id="qt-email"
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    placeholder="Your email address"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="qt-notes" className={labelClass}>Specific Requirements</label>
                <textarea
                  id="qt-notes"
                  rows={3}
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                  placeholder="e.g. Looking for Tier-1 panels with Huawei inverter, requires elevated roof structure..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                id="quote-form-submit-btn"
                className={`w-full py-3.5 rounded-xl font-sans font-bold text-sm tracking-tight transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#0c0d0e]' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>Calculate & Lock Quote</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Admin CRM Desk logs area at the bottom of the section */}
      {submittedQuotes.length > 0 && (
        <div className={`lg:col-span-12 mt-12 border rounded-3xl p-6 space-y-4 ${
          isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-amber-500">
            <Database className="w-5 h-5" />
            <h4 className={`font-sans font-bold text-base ${isDarkMode ? 'text-white' : 'text-[#1e3a8a]'}`}>Glanz Core Smart CRM Desk</h4>
          </div>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Your submissions have been logged locally inside your browser's secure space. This mimics real CRM software in Glanz head office.
          </p>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              <div className={`text-xs font-bold uppercase font-mono tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Logged Quote Requests ({submittedQuotes.length})</div>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                {submittedQuotes.map((q, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border text-xs space-y-1 ${
                    isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className={`flex justify-between font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      <span>{q.fullName} ({q.city})</span>
                      <span className={isDarkMode ? 'text-[#fbbf24]' : 'text-blue-600'}>{q.recommendedSystemSize} kW recommended</span>
                    </div>
                    <div className={`flex justify-between ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      <span>Bill: {q.averageBillPkr.toLocaleString()} PKR</span>
                      <span>Est. Savings: {q.estimatedSavings.toLocaleString()} PKR/Yr</span>
                    </div>
                    <div className={`text-[10px] flex justify-between ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                      <span>Phone: {q.phoneNumber}</span>
                      <span>Logged: {q.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
