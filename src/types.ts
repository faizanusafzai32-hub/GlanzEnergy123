/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  benefits: string[];
  specs: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  sizeKw: number;
  location: string;
  annualSavingsPkr: number;
  panelsCount: number;
  co2ReductionTonnes: number;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'panels' | 'inverters' | 'batteries' | 'structures' | 'monitoring';
  brand: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  rating: number;
  feedback: string;
  projectSizeKw: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Solar News' | 'Energy Saving' | 'Net Metering';
  date: string;
  readTime: string;
  author: string;
}

export interface QuoteRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  averageBillPkr: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  recommendedSystemSize: number;
  estimatedSavings: number;
  notes: string;
  timestamp: string;
}

export interface SurveyRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  timestamp: string;
}
