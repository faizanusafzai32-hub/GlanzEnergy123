/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Custom logo component for Glanz Energy, representing the letter "G" and energy bars.
 */

import React from 'react';

interface LogoProps {
  className?: string;
  isDarkMode?: boolean;
}

export default function Logo({ className = "w-10 h-10", isDarkMode = false }: LogoProps) {
  const gColor = isDarkMode ? "#ffffff" : "#0f172a";
  const barColor = "#fbbf24"; // Premium amber/yellow energy color

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stylized letter "G" shape */}
      <path 
        d="M 37.5,14.5 A 38,38 0 1,0 88,50 L 45,50" 
        stroke={gColor} 
        strokeWidth="15" 
        strokeLinecap="butt" 
        strokeLinejoin="miter"
      />
      {/* Dual energy accent bars */}
      <rect 
        x="45" 
        y="7" 
        width="43" 
        height="15" 
        fill={barColor} 
        rx="2"
      />
      <rect 
        x="45" 
        y="28.5" 
        width="43" 
        height="15" 
        fill={barColor} 
        rx="2"
      />
    </svg>
  );
}
