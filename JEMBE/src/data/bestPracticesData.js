// Best practices guide for smallholder farmers
export const BEST_PRACTICES = [
  {
    id: 'bp-001',
    title: 'Soil Health is Foundation',
    season: 'All year',
    difficulty: 'Easy',
    duration: '1-2 hours preparation',
    steps: [
      'Conduct soil test annually',
      'Add organic matter (compost/manure)',
      'Practice crop rotation to prevent soil depletion',
      'Avoid continuous cropping same area'
    ],
    benefits: [
      'Higher productivity',
      'Lower fertilizer costs',
      'Better crop health',
      'Long-term sustainability'
    ],
    materials: ['Compost', 'Manure', 'Crop residues'],
    cost: 'Low - use farm resources'
  },
  {
    id: 'bp-002',
    title: 'Water Management Efficiency',
    season: 'Dry season',
    difficulty: 'Medium',
    duration: '2-3 hours per watering',
    steps: [
      'Water early morning or late evening',
      'Water at soil level, not leaves',
      'Use drip irrigation where possible',
      'Mulch to retain soil moisture',
      'Check soil moisture before watering'
    ],
    benefits: [
      'Increases yields by 30-50%',
      'Saves water and money',
      'Reduces disease pressure',
      'Enables dry season farming'
    ],
    materials: ['Hoses', 'Mulch', 'Irrigation pipes'],
    cost: 'Medium - upfront investment pays back'
  },
  {
    id: 'bp-003',
    title: 'Integrated Pest Management',
    season: 'Growing season',
    difficulty: 'Medium',
    duration: 'Ongoing monitoring',
    steps: [
      'Scout fields regularly for pests',
      'Use cultural practices (removing infected plant parts)',
      'Apply biological controls (beneficial insects)',
      'Use chemical pesticides only as last resort',
      'Keep proper spray records'
    ],
    benefits: [
      'Reduces crop losses to 10-15%',
      'Lowers pesticide costs',
      'Healthier produce',
      'Protects environment'
    ],
    materials: ['Spray equipment', 'Natural sprays'],
    cost: 'Low - cheaper than total crop loss'
  },
  {
    id: 'bp-004',
    title: 'Proper Fertilizer Application',
    season: 'Growing season',
    difficulty: 'Easy',
    duration: '2-4 hours per application',
    steps: [
      'Test soil before applying fertilizer',
      'Apply correct rate for your crop',
      'Split applications reduce waste',
      'Apply when soil is moist',
      'Incorporate organic matter',
      'Keep records of applications'
    ],
    benefits: [
      'Maximizes crop yield',
      'Reduces fertilizer costs',
      'Improves product quality',
      'Protects environment'
    ],
    materials: ['Fertilizer', 'Application tools'],
    cost: 'Medium - proper application saves money'
  },
  {
    id: 'bp-005',
    title: 'Quality Seed Selection',
    season: 'Before planting',
    difficulty: 'Easy',
    duration: '1 hour for selection',
    steps: [
      'Buy certified seeds from authorized dealers',
      'Inspect seeds for quality and damage',
      'Check expiry dates',
      'Store properly until planting',
      'Test germination if uncertain',
      'Use appropriate variety for your area'
    ],
    benefits: [
      'Increases productivity 30-50%',
      'Ensures genetic quality',
      'Better disease resistance',
      'Consistent crop quality'
    ],
    materials: ['Certified seeds'],
    cost: 'Premium - but ROI is positive'
  },
  {
    id: 'bp-006',
    title: 'Crop Rotation Planning',
    season: 'Before season',
    difficulty: 'Easy',
    duration: '1-2 hours planning',
    steps: [
      'Divide field into 3-4 sections',
      'Rotate different crop families yearly',
      'Include legumes to restore nitrogen',
      'Document rotation plan',
      'Follow plan consistently'
    ],
    benefits: [
      'Reduces pest buildup',
      'Improves soil fertility naturally',
      'Diverse production',
      'Better market access'
    ],
    materials: ['Planning paper', 'Seeds for rotation crops'],
    cost: 'Very low'
  }
];

export const SEASONAL_TIPS = {
  rains_preparation: [
    'Prepare land early - clear previous crop residues',
    'Build soil by adding compost/manure',
    'Repair/prepare terraces to prevent erosion',
    'Test seeds for germination',
    'Plan crop rotation'
  ],
  early_rains: [
    'Plant early for better establishment',
    'Use certified quality seeds',
    'Space plants correctly',
    'Apply starter fertilizer at planting',
    'Start monitoring for pests'
  ],
  mid_season: [
    'Thin seedlings for proper spacing',
    'Remove weeds early (crucial)',
    'Apply top-up fertilizer if needed',
    'Scout for pest and disease problems',
    'Maintain consistent weeding'
  ],
  late_season: [
    'Stop vegetative fertilizer application',
    'Increase potassium for fruit quality',
    'Harvest matured products to encourage more flowering',
    'Prepare for next season',
    'Control any remaining pests'
  ],
  dry_season: [
    'Implement water harvesting',
    'Use drip irrigation if possible',
    'Apply mulch to conserve moisture',
    'Grow drought-tolerant varieties',
    'Plan off-season activities'
  ]
};

export const PRODUCTIVITY_TIPS = [
  {
    tip: 'Use improved varieties that match your agro-ecology',
    impact: '+30% yield potential'
  },
  {
    tip: 'Apply recommended fertilizer rates based on soil test',
    impact: '+25-40% productivity'
  },
  {
    tip: 'Control weeds effectively - prevent yield loss',
    impact: '+10-20% yield protection'
  },
  {
    tip: 'Practice timely weeding (3 weedings in season)',
    impact: '+15-30% yield improvement'
  },
  {
    tip: 'Manage pests and diseases early',
    impact: '+10-25% loss prevention'
  },
  {
    tip: 'Proper spacing - don\'t overcrowd plants',
    impact: '+15% quality improvement'
  },
  {
    tip: 'Combine organic and inorganic fertilizers',
    impact: '+20% sustainable productivity'
  },
  {
    tip: 'Water consistently and appropriately',
    impact: '+30-50% in dry season'
  },
  {
    tip: 'Harvest at right maturity stage',
    impact: '+20% quality and market value'
  },
  {
    tip: 'Keep records to learn and improve',
    impact: '+5-10% annual improvement'
  }
];
