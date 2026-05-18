// Agricultural content database for quality seeds
export const SEED_DATA = [
  {
    id: 'seed-maize-001',
    name: 'Quality Maize Seeds',
    crop: 'Maize/Corn',
    description: 'High-quality maize seeds for improved yields',
    varieties: ['Hybrid H614', 'Local improved varieties', 'DK777', 'SC719'],
    characteristics: [
      'High germination rate (95%+)',
      'Disease-resistant varieties',
      'Uniform maturity',
      'High nutrient content'
    ],
    advantages: [
      'Increased yield by 30-50%',
      'Better disease resistance',
      'Improved nutrition',
      'Consistent quality'
    ],
    sourcing: {
      where: [
        'Certified seed companies',
        'Government agricultural centers',
        'Cooperative unions',
        'Authorized seed dealers'
      ],
      cost: 'Varies by variety - Premium quality costs 10-30% more',
      certification: 'Look for KEPHIS certified seeds (Kenya) or equivalent'
    },
    storage: {
      temperature: '15-20°C ideal',
      humidity: 'Keep below 12% moisture content',
      duration: 'Most viable for 1-2 years',
      container: 'Airtight containers in cool, dry place'
    },
    planting: {
      season: 'Long and short rains',
      spacing: '75cm x 25cm (recommended)',
      depth: '3-5cm',
      soilType: 'Well-drained, fertile soils'
    },
    yield_potential: '20-30 bags per acre with proper management',
    tips: [
      'Only buy certified seeds from authorized dealers',
      'Check expiry dates before purchasing',
      'Store in cool, dry conditions',
      'Use quality seeds with proper fertilizer for best results'
    ]
  },
  {
    id: 'seed-bean-001',
    name: 'Quality Bean Seeds',
    crop: 'Beans',
    description: 'Improved bean varieties for nutrition and income',
    varieties: ['Mwezi Moja', 'Nandi', 'Wairimu', 'Pinto', 'Red Haricot'],
    characteristics: [
      'High protein content (20-25%)',
      'Disease resistance',
      'Early maturity (60-90 days)',
      'Good marketability'
    ],
    advantages: [
      'Excellent nutrition for families',
      'Income generation potential',
      'Multiple harvests per year',
      'Improves soil nitrogen naturally'
    ],
    sourcing: {
      where: [
        'Seed companies',
        'Agricultural extension offices',
        'Farmers cooperatives',
        'Seed merchants'
      ],
      cost: 'Moderate - 1-2kg sufficient for quarter acre',
      certification: 'Certified seeds have higher germination rates'
    },
    storage: {
      temperature: '10-15°C',
      humidity: '10% moisture content',
      duration: '2-3 years viable',
      container: 'Airtight, sealed containers'
    },
    planting: {
      season: 'Rains (March-May and October-December)',
      spacing: '45cm between rows, 15cm between plants',
      depth: '3-4cm',
      soilType: 'Well-drained, medium fertility'
    },
    yield_potential: '8-15 bags (100kg) per acre',
    tips: [
      'Buy certified seeds - they germinate better',
      'Inoculate seeds with Rhizobium to boost nitrogen fixation',
      'Plant early in rainy season for best yields',
      'Use crop rotation to maintain soil health'
    ]
  },
  {
    id: 'seed-tomato-001',
    name: 'Quality Tomato Seeds',
    crop: 'Tomatoes',
    description: 'Vegetable seeds for year-round production',
    varieties: ['Uta', 'Assila', 'Money Maker', 'Beef Master', 'Cherry'],
    characteristics: [
      'Disease resistance (especially early blight)',
      'Good fruit quality',
      'Extended fruiting period',
      'High productivity'
    ],
    advantages: [
      'High market value',
      'Multiple harvests throughout year',
      'Nutritious produce for family',
      'Can be grown in small spaces'
    ],
    sourcing: {
      where: [
        'Seed companies',
        'Nurseries',
        'Agricultural suppliers',
        'Online seed suppliers'
      ],
      cost: 'Premium seeds for guaranteed quality',
      certification: 'Treated seeds available (fungicide protection)'
    },
    storage: {
      temperature: '15-20°C',
      humidity: '12-15% moisture',
      duration: '3-4 years',
      container: 'Sealed packets in cool location'
    },
    planting: {
      season: 'Two growing seasons (Feb-May, Aug-Nov)',
      spacing: '60cm x 45cm (both directions)',
      depth: '5cm (nursery), transplant at 4-6 weeks',
      soilType: 'Fertile soil with good drainage'
    },
    yield_potential: '15-30 tons per acre with good management',
    tips: [
      'Use nursery beds for quality transplants',
      'Stake/support plants to prevent disease',
      'Water consistently - irregular watering causes split fruits',
      'Practice crop rotation (move to different field each season)'
    ]
  },
  {
    id: 'seed-wheat-001',
    name: 'Quality Wheat Seeds',
    crop: 'Wheat',
    description: 'Certified seeds for improved grain production',
    varieties: ['Kenya Seed 8101', 'Njoro', 'Kakamega', 'FARM-H1'],
    characteristics: [
      'High grain quality',
      'Disease tolerate varieties',
      'Good yield potential',
      'Suited to highland areas'
    ],
    advantages: [
      'Cash and food security crop',
      'Better market prices',
      'Longer shelf life than other cereals',
      'Good nutrition'
    ],
    sourcing: {
      where: [
        'Certified seed producers',
        'Government centers',
        'Cooperative unions',
        'Agricultural associations'
      ],
      cost: 'Economical - small seed rate needed',
      certification: 'Get certified improved varieties'
    },
    storage: {
      temperature: '15-20°C',
      humidity: '11-13% moisture content',
      duration: '2-3 years',
      container: 'Sealed bags in ventilated stores'
    },
    planting: {
      season: 'Rainy seasons (March-July, October-February)',
      spacing: 'Broadcasting or line planting acceptable',
      depth: '3-5cm',
      soilType: 'Well-prepared, moderate fertility'
    },
    yield_potential: '20-40 bags per acre (potential 50+ with irrigation)',
    tips: [
      'Use certified seeds - improvement over farmer-saved seed',
      'Proper land preparation is crucial',
      'Controlled sowing rate (25-30kg/acre) ensures productivity',
      'Timely harvesting prevents losses'
    ]
  }
];

export const SEED_SELECTION_GUIDE = {
  how_to_identify_quality: [
    'Seeds should be uniform in size and color for the variety',
    'Check for visible damage, discoloration, or mold',
    'Verify germination date - recent seeds are better',
    'Look for certification seals from recognized authorities',
    'Buy from established dealers with good reputation'
  ],
  certification_marks: {
    kenya: 'KEPHIS (Kenya Plant Health Inspectorate Service)',
    uganda: 'UAPPC (Uganda Agricultural Productivity Program)',
    tanzania: 'TPRI (Tanzania Plant Research Institute)',
    standard: 'FAO certified or equivalent standards'
  },
  price_vs_quality: [
    'Certified seeds cost more but give 30-50% better yields',
    'Farmer-saved seeds are cheaper but have lower germination',
    'Quality seeds save money on replanting and increased harvests',
    'Calculate ROI: Quality seeds usually pay for themselves'
  ]
};

export const SEED_STORAGE_GUIDE = {
  proper_storage: [
    'Keep seeds in cool (15-20°C), dry (10-12% moisture) place',
    'Use airtight containers to prevent moisture absorption',
    'Store away from chemicals and pesticides',
    'Protect from pests with tight sealing',
    'Label with variety and storage date'
  ],
  moisture_control: [
    'Excessive moisture (>12%) reduces viability',
    'Use silica gel packets in storage containers',
    'Check moisture periodically if stored long-term',
    'Low humidity zones best for survival'
  ],
  germination_testing: [
    'Test old seeds before planting to check viability',
    'Simple test: Soak 10 seeds in moist blotting paper for 7 days',
    'If 7 or more germinate, seed is usable',
    'Replace seeds with germination rate below 80%'
  ]
};
