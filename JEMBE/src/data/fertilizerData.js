// Agricultural content database for fertilizers
export const FERTILIZER_DATA = [
  {
    id: 'nit-001',
    name: 'Nitrogen Fertilizers',
    category: 'Macronutrient',
    description: 'Essential for leaf and stem growth',
    benefits: [
      'Promotes leafy green growth',
      'Increases plant biomass',
      'Improves crop yield',
      'Enhances protein content in plants'
    ],
    sources: [
      'Urea (46% N)',
      'Ammonium Nitrate (33% N)',
      'Ammonium Sulfate (20% N)',
      'Compost and manure'
    ],
    applicationMethod: {
      timing: 'Apply during active growth phase',
      rate: '50-150 kg/ha depending on crop',
      frequency: 'Split applications recommended',
      warning: 'Avoid over-application as it reduces fruit quality'
    },
    crops: ['Maize', 'Rice', 'Wheat', 'Vegetables', 'Coffee'],
    season: 'All seasons with water availability',
    cost: 'Moderate - widely available',
    bestPractices: [
      'Use correct application rate for your soil type',
      'Apply when soil is moist',
      'Combine with organic matter for better results',
      'Split applications reduce leaching losses'
    ]
  },
  {
    id: 'phos-001',
    name: 'Phosphorus Fertilizers',
    category: 'Macronutrient',
    description: 'Crucial for root development and flowering',
    benefits: [
      'Strengthens root systems',
      'Promotes flowering and fruiting',
      'Increases disease resistance',
      'Improves seed quality'
    ],
    sources: [
      'Superphosphate (20% P2O5)',
      'Triple Superphosphate (45% P2O5)',
      'Bone meal',
      'Rock phosphate'
    ],
    applicationMethod: {
      timing: 'Apply before planting or early season',
      rate: '20-100 kg P2O5/ha',
      frequency: 'Usually single application',
      warning: 'Phosphorus moves slowly in soil - apply in root zone'
    },
    crops: ['Beans', 'Peas', 'Potatoes', 'Fruits', 'Vegetables'],
    season: 'Plant before sowing',
    cost: 'Moderate to expensive',
    bestPractices: [
      'Conduct soil test to determine need',
      'Incorporate into soil',
      'Works well with organic matter',
      'Improves nutrient availability in acidic soils'
    ]
  },
  {
    id: 'pot-001',
    name: 'Potassium Fertilizers',
    category: 'Macronutrient',
    description: 'Enhances plant strength and crop quality',
    benefits: [
      'Improves water retention in plants',
      'Increases disease resistance',
      'Enhances fruit quality and flavor',
      'Strengthens cell walls',
      'Improves drought tolerance'
    ],
    sources: [
      'Muriate of Potash (60% K2O)',
      'Sulfate of Potash (50% K2O)',
      'Wood ash',
      'Seaweed extracts'
    ],
    applicationMethod: {
      timing: 'During growing season',
      rate: '40-150 kg K2O/ha',
      frequency: 'Single or split applications',
      warning: 'Excess potassium can interfere with magnesium uptake'
    },
    crops: ['Bananas', 'Citrus', 'Potatoes', 'Tomatoes', 'Fruits'],
    season: 'Growing season',
    cost: 'Moderate',
    bestPractices: [
      'Test soil before application',
      'Apply in soluble form during growing season',
      'Combine with nitrogen for balanced nutrition',
      'Important for storage crops'
    ]
  },
  {
    id: 'org-001',
    name: 'Organic Fertilizers',
    category: 'Organic Matter',
    description: 'Natural fertilizers that improve soil health',
    benefits: [
      'Improves soil structure and water retention',
      'Increases beneficial microorganisms',
      'Provides slow-release nutrients',
      'Reduces chemical dependency',
      'Improves soil health long-term'
    ],
    sources: [
      'Compost from crop residues',
      'Animal manure (cattle, poultry, goat)',
      'Vermicompost',
      'Green manure crops'
    ],
    applicationMethod: {
      timing: 'Before planting or during season',
      rate: '5-20 tons per hectare',
      frequency: 'Annual application recommended',
      warning: 'Must be well-decomposed to avoid weed seeds'
    },
    crops: ['All crops benefit'],
    season: 'All seasons',
    cost: 'Low - renewable resource',
    bestPractices: [
      'Compost for 3-6 months before use',
      'Mix thoroughly into soil',
      'Combine with chemical fertilizers for best results',
      'Make your own compost from farm waste'
    ]
  }
];

export const FERTILIZER_COMPARISON = {
  nitrogen: {
    deficiency: 'Yellowing of leaves, stunted growth',
    excess: 'Excessive vegetative growth, delayed maturity',
    best_for: 'Leafy vegetables, cereals, grasses'
  },
  phosphorus: {
    deficiency: 'Purple/red discoloration, weak root system',
    excess: 'Generally uncommon, may lock up other nutrients',
    best_for: 'Root crops, legumes, flowering plants'
  },
  potassium: {
    deficiency: 'Brown scorching on leaf edges, weak stems',
    excess: 'May affect calcium and magnesium uptake',
    best_for: 'Fruits, tubers, quality crops'
  }
};

export const FERTILIZER_TIPS = [
  {
    id: 'tip-1',
    title: 'Soil Testing is Essential',
    content: 'Test your soil before applying fertilizers. This ensures you apply only what your soil needs.',
    difficulty: 'Easy',
    season: 'Before planting'
  },
  {
    id: 'tip-2',
    title: 'Balanced Nutrition Matters',
    content: 'Mix nitrogen, phosphorus, and potassium in ratios suitable for your crop (e.g., 10:10:10 or 15:15:15).',
    difficulty: 'Easy',
    season: 'Growing season'
  },
  {
    id: 'tip-3',
    title: 'Timing is Critical',
    content: 'Apply fertilizers when soil moisture is adequate and synchronize with crop growth stages.',
    difficulty: 'Medium',
    season: 'All'
  },
  {
    id: 'tip-4',
    title: 'Combine Organic and Inorganic',
    content: 'Mix 50% manure with 50% chemical fertilizer for best results and soil health.',
    difficulty: 'Medium',
    season: 'All'
  },
  {
    id: 'tip-5',
    title: 'Avoid Over-Application',
    content: 'Excess fertilizer pollutes groundwater, burns plants, and wastes money. Follow recommended rates.',
    difficulty: 'Easy',
    season: 'All'
  },
  {
    id: 'tip-6',
    title: 'Proper Storage',
    content: 'Store fertilizers in cool, dry places away from moisture to maintain nutrient content.',
    difficulty: 'Easy',
    season: 'All'
  }
];
