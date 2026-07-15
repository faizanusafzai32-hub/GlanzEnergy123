/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, Product, Testimonial, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'residential',
    title: 'Residential Solar Solutions',
    shortDescription: 'Tailored hybrid and on-grid solar systems to eliminate home electricity bills.',
    fullDescription: 'Take control of your home energy with Glanz Energy\'s state-of-the-art residential solar systems. Custom-designed for homes in Islamabad, Punjab, and KPK, our residential setups utilize smart hybrid inverters and premium tier-1 solar panels to ensure zero load-shedding and maximum financial savings.',
    iconName: 'Home',
    benefits: [
      'Save up to 100% on monthly electricity bills',
      'Intelligent backup power with zero switchover time',
      'Increase your property value immediately',
      'Net metering ready to sell excess power back to grid'
    ],
    specs: [
      { label: 'Typical Sizes', value: '5 kW, 10 kW, 15 kW, 20 kW' },
      { label: 'Payback Period', value: '3 - 4 Years' },
      { label: 'Panel Warranty', value: '25 Years Linear Performance' },
      { label: 'Inverter Backup', value: 'Lithium-ion / Tubular Battery Support' }
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Solar Solutions',
    shortDescription: 'Empowering businesses with sustainable energy to slash operational overheads.',
    fullDescription: 'Substantially reduce your commercial operational costs and enhance corporate sustainability. Our premium commercial installations are engineered for shopping malls, office complexes, private clinics, and educational institutes, designed to handle high peak loads with superior efficiency.',
    iconName: 'Building2',
    benefits: [
      'Substantial tax benefits and green building certification',
      'Direct reduction in operational costs (OpEx)',
      'Protection against frequent power tariffs hikes',
      'Real-time automated energy management and reporting'
    ],
    specs: [
      { label: 'Typical Sizes', value: '20 kW to 200 kW' },
      { label: 'Payback Period', value: '2.5 - 3 Years' },
      { label: 'Peak Efficiency', value: 'Up to 98.6%' },
      { label: 'Monitoring', value: 'Cloud-Based Web & App Suite' }
    ]
  },
  {
    id: 'industrial',
    title: 'Industrial Solar Solutions',
    shortDescription: 'Heavy-duty grid-tied systems for factories and processing plants with mega demand.',
    fullDescription: 'Keep your manufacturing lines running uninterrupted with high-capacity industrial solar grids. We engineer complete on-grid solutions that integrate seamlessly with high-tension (HT) industrial connections, heavy diesel generators, and localized grid demands, securing a lower levelized cost of energy.',
    iconName: 'Factory',
    benefits: [
      'Unmatched return on investment (ROI) for massive load profiles',
      'Synchronized operation with existing industrial diesel generators',
      'Compliance with international environmental compliance audits',
      'Robust structural engineering tailored for industrial sheds'
    ],
    specs: [
      { label: 'Typical Sizes', value: '200 kW to 2 MW+' },
      { label: 'Structural Wind-Load', value: 'Up to 150 km/h structural certification' },
      { label: 'Equipment Tier', value: 'Tier-1 Panels & String Inverters' },
      { label: 'Warranty Support', value: '10 Years Comprehensive O&M' }
    ]
  },
  {
    id: 'net-metering',
    title: 'Net Metering Services',
    shortDescription: 'Turn your utility meter backward and sell excess electricity to DISCOs.',
    fullDescription: 'Glanz Energy provides a seamless, turn-key Net Metering solution. We handle the entire bureaucratic and engineering process with the regulatory authorities and local distribution companies (IESCO, PESCO, LESCO, GEPCO) to legally permit you to feed surplus solar power back into the national grid for credit.',
    iconName: 'ArrowLeftRight',
    benefits: [
      'Receive monthly power credits from your electric supplier',
      'Zero paperwork on your end - Glanz handles end-to-end licensing',
      'Off-set night-time electricity consumption with daytime generation surplus',
      'Fully certified three-phase green meters supplied and installed'
    ],
    specs: [
      { label: 'Licensing Time', value: '4 to 8 Weeks (Turnkey)' },
      { label: 'Eligible Systems', value: 'All 3-Phase connections (5 kW+)' },
      { label: 'Applicable DISCOs', value: 'IESCO, PESCO, LESCO, GEPCO, FESCO' },
      { label: 'Meter Standards', value: 'Approved Bi-directional Green Meters' }
    ]
  },
  {
    id: 'water-pumping',
    title: 'Solar Water Pumping',
    shortDescription: 'Reliable, fuel-free solar pumps for agricultural irrigation and drinking water.',
    fullDescription: 'End your dependence on expensive, high-maintenance diesel fuel and erratic grid power for farming. Our agricultural solar water pumping systems deliver constant, high-pressure water flow for crop irrigation, animal husbandry, and remote community water supplies.',
    iconName: 'Droplet',
    benefits: [
      'Zero operating fuel costs - completely solar powered',
      'Automatic operation based on sunrise and sunset',
      'Durable submersible and surface-mounted pumps',
      'Extends crop yield by securing consistent daily watering'
    ],
    specs: [
      { label: 'Motor Rating', value: '2 HP to 50 HP+' },
      { label: 'Controller Type', value: 'High Efficiency VFD Controllers' },
      { label: 'Bore Depth Capacity', value: 'Up to 600 Feet' },
      { label: 'Daily Output', value: 'Up to 250,000 Liters' }
    ]
  },
  {
    id: 'battery-storage',
    title: 'Smart Battery Storage',
    shortDescription: 'High-performance Lithium-ion and tubular battery backup configurations.',
    fullDescription: 'Never suffer through load-shedding or grid outages. Our energy storage solutions leverage premium Lithium Iron Phosphate (LiFePO4) cell chemistry, offering deep-cycle energy buffers that supply your home or facility with continuous clean energy long after the sun has set.',
    iconName: 'BatteryCharging',
    benefits: [
      'Up to 10 years battery life with LiFePO4 modern storage cells',
      'Smart battery management system (BMS) for safety and diagnostics',
      'High charge-discharge rate capacity with zero backup flicker',
      'Modular expandable racks to increase backup capacity as needed'
    ],
    specs: [
      { label: 'Battery Types', value: 'Lithium (LiFePO4) & Deep Cycle Lead Acid' },
      { label: 'Expected Lifespan', value: '6000+ Cycles (Lithium) / 3 Years (Lead Acid)' },
      { label: 'Efficiency', value: '95% Round-Trip Storage Efficiency' },
      { label: 'Brands', value: 'Glanz Smart Power, Pylontech, Narada' }
    ]
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    shortDescription: 'Professional panel cleaning, health audits, and rapid response maintenance.',
    fullDescription: 'To extract maximum yield from your capital investment, solar systems need routine professional checkups. Glanz Energy provides comprehensive Operation & Maintenance (O&M) programs, incorporating pressurized demineralized water cleaning, thermal imaging diagnostics, and live system monitoring audits.',
    iconName: 'Wrench',
    benefits: [
      'Increase power generation efficiency by up to 25% via clean panels',
      'Preventative electrical safety and cable connection scans',
      'Rapid deployment repair crews with state-of-the-art tools',
      '24/7 continuous digital monitoring and alert triggers'
    ],
    specs: [
      { label: 'Response Time', value: 'Under 24 Hours in Service Areas' },
      { label: 'Service Coverage', value: 'Islamabad, KPK, Punjab' },
      { label: 'Cleaning Method', value: 'Demineralized Pressurized Spray' },
      { label: 'Audit Support', value: 'Annual Thermal Imaging and String Audits' }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'panel-longi',
    name: 'Longi Hi-MO 6 Explorer',
    category: 'panels',
    brand: 'Longi Solar',
    description: 'High-efficiency monocrystalline HPBC (Hybrid Passivated Back Contact) solar panel, engineered for outstanding performance under hot climates and diffuse shading.',
    features: [
      'Up to 22.8% cell conversion efficiency',
      'Outstanding low-light and high-temperature power generation',
      'Sleek modern aesthetics with a black anodized aluminum frame',
      'Excellent resistance against potential induced degradation (PID)'
    ],
    specs: [
      { label: 'Power Rating', value: '575W - 590W' },
      { label: 'Cell Technology', value: 'HPBC Monocrystalline' },
      { label: 'Product Warranty', value: '15 Years Material & Workmanship' },
      { label: 'Performance Warranty', value: '25 Years Linear Power Output' }
    ]
  },
  {
    id: 'panel-jinko',
    name: 'Jinko Tiger Neo N-type',
    category: 'panels',
    brand: 'JinkoSolar',
    description: 'N-type TOPCon bifacial technology offering higher power generation, lower temperature coefficient, and superior double-sided light utilization.',
    features: [
      'N-Type TOPCon cell architecture for minimal power degradation',
      'Bifacial power gain (extra 10% to 25% generation from ground reflection)',
      'Optimized performance in high humidity and salty environments',
      'Maximum mechanical load certification (5400 Pa front, 2400 Pa rear)'
    ],
    specs: [
      { label: 'Power Rating', value: '580W - 600W' },
      { label: 'Cell Technology', value: 'N-Type TOPCon' },
      { label: 'Product Warranty', value: '12 Years Material & Workmanship' },
      { label: 'Performance Warranty', value: '30 Years Linear Power Output' }
    ]
  },
  {
    id: 'inv-huawei',
    name: 'Huawei SUN2000 Smart Inverter',
    category: 'inverters',
    brand: 'Huawei',
    description: 'The industry-standard smart string inverter, incorporating AI-powered active arcing protection (AFCI) and precise string-level monitoring.',
    features: [
      'Fanless natural cooling technology for ultra-quiet operation and reliability',
      'Integrated AI-Powered Arc Fault Circuit Interrupter (AFCI)',
      'Multiple independent Maximum Power Point Trackers (MPPT)',
      'Smart IV-Curve diagnosis for automated panel health scanning'
    ],
    specs: [
      { label: 'Power Rating', value: '10 kW to 100 kW' },
      { label: 'Max Efficiency', value: '98.6%' },
      { label: 'Topology', value: 'Transformerless' },
      { label: 'Protection Rating', value: 'IP66 Waterproof & Dustproof' }
    ]
  },
  {
    id: 'inv-solis',
    name: 'Solis On-Grid & Hybrid String',
    category: 'inverters',
    brand: 'Solis',
    description: 'Extremely robust, high-performance inverter series popular for residential net-metering and hybrid residential systems.',
    features: [
      'Wide input voltage range, perfect for rural grid stabilization',
      'Dual MPPT with highly dynamic adaptation algorithm',
      'Export power manager integrated for local power regulation',
      'WiFi monitoring stick included for instant cloud stats'
    ],
    specs: [
      { label: 'Power Rating', value: '5 kW to 30 kW' },
      { label: 'Max Efficiency', value: '98.1%' },
      { label: 'Grid Feed-in Type', value: 'Three Phase / Single Phase' },
      { label: 'Warranty', value: '5 Years Standard, Extendable to 10' }
    ]
  },
  {
    id: 'bat-lithium',
    name: 'Glanz PowerStack LiFePO4',
    category: 'batteries',
    brand: 'Glanz Smart Power',
    description: 'Premium lithium iron phosphate (LiFePO4) rack-mountable energy storage module with high-performance integrated smart BMS.',
    features: [
      'Safe LiFePO4 chemical compound - zero risk of thermal runaway',
      '6000+ full charging and discharging cycles to 80% Depth of Discharge',
      'Sleek modern design with wall mount or floor-stack configurations',
      'Integrated LCD panel for real-time voltage, health, and temp diagnostics'
    ],
    specs: [
      { label: 'Capacity', value: '5.12 kWh / 10.24 kWh per pack' },
      { label: 'Nominal Voltage', value: '51.2 V (Perfect for 48V hybrid inverters)' },
      { label: 'Max Discharge Current', value: '100A continuous' },
      { label: 'Warranty', value: '10 Years Performance' }
    ]
  },
  {
    id: 'monitoring-smart',
    name: 'Glanz Core Smart Portal',
    category: 'monitoring',
    brand: 'Glanz Energy',
    description: 'State-of-the-art cloud management console and companion mobile application that tracks individual panel and inverter telemetry in real-time.',
    features: [
      'Real-time power generation, export, and load consumption displays',
      'Calculates accurate carbon emission reductions and fuel equivalents',
      'Instant SMS and push notification alerts for grid outages or faults',
      'Net metering billing estimation matching official DISCO tariffs'
    ],
    specs: [
      { label: 'Platform App', value: 'iOS, Android, and Web Console' },
      { label: 'Data Protocol', value: 'Secure WiFi / GSM GPRS' },
      { label: 'Telemetry Interval', value: 'Every 5 Seconds' },
      { label: 'Historical Data', value: 'Lifetime Cloud Storage' }
    ]
  },
  {
    id: 'struct-mount',
    name: 'Glanz UltraStrut HD Mounting',
    category: 'structures',
    brand: 'Glanz Struct',
    description: 'Custom-fabricated hot-dip galvanized and anodized aluminum structure designed to withstand severe wind storms up to 150 km/h.',
    features: [
      'Rust-proof hot-dip galvanization with a minimum coating thickness of 85 microns',
      'Anodized aluminum framing and solid stainless steel (SS304) fasteners',
      'Elevated structures (L2, L3, L4 custom mockups) for rooftop usability',
      'Structural design certified by licensed structural engineers'
    ],
    specs: [
      { label: 'Wind Rating', value: 'Up to 150 km/h' },
      { label: 'Material', value: 'A36 Hot Dip Galvanized Steel & AL6005-T5 Aluminum' },
      { label: 'Base Support', value: 'Heavy Concrete Anchor Pads' },
      { label: 'Warranty', value: '10 Years Rust-Free Guarantee' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-res-g11',
    title: '15kW Smart Hybrid Villa Installation',
    category: 'residential',
    sizeKw: 15,
    location: 'Sector G-11, Islamabad',
    annualSavingsPkr: 840000,
    panelsCount: 26,
    co2ReductionTonnes: 12.5,
    description: 'A complete residential green energy system equipped with premium 580W N-Type panels and a 15kW Hybrid Inverter. Integrated with a 10kWh LiFePO4 Lithium Battery stack to guarantee 100% load backup for dual inverter air conditioners, water pumps, and essential lighting. Fully licensed under NEPRA net-metering, generating high electric credit during the day.',
    imageUrl: '/src/assets/images/glanz_solar_hero_1784013930329.jpg'
  },
  {
    id: 'proj-com-pesh',
    title: '120kW Commercial Net-Metered Grid',
    category: 'commercial',
    sizeKw: 120,
    location: 'Hayatabad, Peshawar',
    annualSavingsPkr: 6400000,
    panelsCount: 208,
    co2ReductionTonnes: 98.0,
    description: 'Rooftop solar expansion for a leading shopping mall complex in Peshawar, KPK. This project utilizes Huawei SUN2000 smart string inverters on a customized elevated structure to retain premium rooftop space. Secured full NEPRA net-metering authorization with PESCO, slashing seasonal utility charges down to net zero during winter months.',
    imageUrl: '/src/assets/images/glanz_solar_commercial_1784013950674.jpg'
  },
  {
    id: 'proj-ind-fais',
    title: '350kW Industrial Rooftop Array',
    category: 'industrial',
    sizeKw: 350,
    location: 'Industrial Estate, Faisalabad',
    annualSavingsPkr: 18500000,
    panelsCount: 605,
    co2ReductionTonnes: 280.0,
    description: 'High-tension grid-synchronized solar system designed for a textile weaving mill in Faisalabad, Punjab. Installed using lightweight non-penetrative aluminum clamps on standing seam metal rooftops. Features integrated active power limiting and zero-export control systems, synchronized with multi-megawatt industrial diesel backup generators.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'proj-agr-swat',
    title: '25HP High-Flow Solar Tube Well System',
    category: 'agricultural',
    sizeKw: 30,
    location: 'Swat Valley, KPK',
    annualSavingsPkr: 1500000,
    panelsCount: 52,
    co2ReductionTonnes: 25.0,
    description: 'Off-grid high-volume agricultural irrigation setup for a peach and apple orchard farm. Includes a 25HP heavy-duty submersible water pump powered by a custom elevated 30kW solar tracker system with dynamic Variable Frequency Drive (VFD) controller. Completely replaced the farm\'s noisy and expensive diesel generator.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Brigadier (R) Tariq Mahmood',
    role: 'Homeowner',
    location: 'DHA Phase 2, Islamabad',
    rating: 5,
    feedback: 'Glanz Energy delivered an exceptional installation experience. The execution was highly professional, from the initial site survey down to the net metering activation. My monthly IESCO bill is now in negative balance. Their attention to structural safety with concrete anchor pads is praiseworthy.',
    projectSizeKw: 10
  },
  {
    id: 't-2',
    name: 'Kamran Khan Yousafzai',
    role: 'CEO, Yousafzai Textiles',
    company: 'Yousafzai & Sons',
    location: 'Peshawar, KPK',
    rating: 5,
    feedback: 'We integrated a 150kW solar setup with Glanz Energy for our industrial weaving division. Their engineering team is incredibly knowledgeable. They calibrated the solar output to synchronize perfectly with our high-demand generators. Highly recommended for complex commercial applications.',
    projectSizeKw: 150
  },
  {
    id: 't-3',
    name: 'Dr. Maria Siddiqui',
    role: 'Director',
    company: 'Al-Shifa Clinic & Lab',
    location: 'Rawalpindi, Punjab',
    rating: 5,
    feedback: 'Energy security is critical for diagnostic labs. Glanz designed a smart hybrid solar grid with custom Lithium battery storage. Now our sensitive lab equipment and cold storage units operate with absolute continuous backup. The transition during load-shedding is so smooth, we do not even feel it.',
    projectSizeKw: 25
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-net-metering',
    title: 'The Ultimate Guide to Net Metering in Pakistan',
    excerpt: 'Learn how to get approved for bi-directional net metering and sell surplus solar power back to local DISCOs.',
    content: 'Net Metering has completely revolutionized the financial landscape of solar energy investments in Pakistan. Enabled under national grid regulations, it permits consumers holding 3-phase connections to feed any surplus electricity they generate during peak sunlight hours back into the national grid. Local distribution companies (DISCOs) like IESCO, PESCO, or LESCO install a bi-directional green meter that registers both imported electricity from the grid and exported energy from solar panels.\n\nAt the end of each billing cycle, the units are netted off. If you exported more than you imported, you receive credit packets that carry forward to following months, or get paid out as cash. To initiate this, you must apply with a certified installer. Glanz Energy manages this entire workflow for you: performing electrical system audits, submitting detailed load logs, routing the application through the local sub-divisions, securing safety certificates, and final commissioning of the green meter within 4 to 8 weeks.',
    category: 'Net Metering',
    date: 'July 10, 2026',
    readTime: '6 min read',
    author: 'Engr. Haris Shah'
  },
  {
    id: 'blog-saving-tips',
    title: 'How to Maximize Your Solar Energy Savings',
    excerpt: 'Simple behavioral adjustments and smart load management tips to make your solar panel array even more profitable.',
    content: 'Installing a premium solar array is only the first step; optimizing how you consume energy is key to shortening your financial payback period. In Pakistan, electricity tariffs vary drastically between "Off-Peak" and "Peak" hours. Peak hours generally fall in the evening (usually 6:00 PM to 10:00 PM) when solar panels are inactive. Since peak hour units are much more expensive, running heavy appliances during high solar production hours (10:00 AM to 3:00 PM) is highly beneficial.\n\nWe recommend scheduling heavy tasks like washing machines, iron usage, water pumps, and charging electric vehicles during peak solar generation window. Additionally, adjusting your air conditioners to 26°C instead of 18°C lowers power draw and allows the inverter to optimize solar feed directly, minimizing any imports from the utility grid.',
    category: 'Energy Saving',
    date: 'June 28, 2026',
    readTime: '4 min read',
    author: 'Saman Alvi'
  },
  {
    id: 'blog-solar-tech',
    title: 'TOPCon vs HPBC: Choosing the Right Panel Tech',
    excerpt: 'An in-depth breakdown of the latest cell technologies from Jinko and Longi for Pakistani weather conditions.',
    content: 'The solar panel industry is advancing at a breathtaking rate, with older p-type PERC panels giving way to newer high-efficiency n-type TOPCon and HPBC (Hybrid Passivated Back Contact) technology. Both architectures offer vastly superior conversion rates, but they have distinct characteristics.\n\nJinko\'s N-Type TOPCon panels excel in bifacial energy gain, leveraging reflecting sunlight from concrete rooftops or ground surfaces to produce up to 25% extra energy. Longi\'s HPBC (Hi-MO 6) utilizes a clean front-surface design with contacts located entirely on the rear. This completely eliminates front-side busbars, providing a beautiful pitch-black aesthetic, which makes it ideal for architectural villas in Islamabad. Furthermore, HPBC panels demonstrate superior temperature coefficients, retaining high wattage generation even in hot, hazy summer seasons across Punjab.',
    category: 'Solar News',
    date: 'May 15, 2026',
    readTime: '8 min read',
    author: 'Engr. Fahad Ahmed'
  }
];

export const COMPANY_DETAILS = {
  name: 'Glanz Energy',
  tagline: 'Enlighting the Future',
  founded: '2025',
  headOffice: 'Islamabad, Pakistan',
  serviceArea: 'KPK and Punjab',
  phone: '+923339425413',
  phoneDisplay: '+92 333 9425413',
  whatsapp: '+923339425413',
  email: 'info@glanzenergy.com',
  address: 'shaheen market I-9/2 Islamabad 44000, Pakistan',
  socials: {
    facebook: 'https://www.facebook.com/solarenergitech'
  }
};
