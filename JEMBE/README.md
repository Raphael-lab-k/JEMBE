# JEMBE - Agricultural Education Platform

An educational mobile application empowering smallholder farmers to understand and optimize their use of fertilizers and quality seeds for increased productivity.

## Overview

JEMBE is a React Native mobile app designed specifically for smallholder farmers in sub-Saharan Africa. It provides practical, evidence-based information about:

- **Fertilizer Education**: Types of fertilizers, benefits, application methods, and best practices
- **Quality Seeds**: Selection, sourcing, storage, and certification standards
- **Best Practices**: Proven agricultural techniques to boost productivity
- **Resource Library**: Articles, videos, case studies, and FAQs
- **Progress Tracking**: Log and monitor farm activities

## Features

### 📚 Learning Modules

1. **Fertilizer Guide**
   - Comprehensive database of 4+ fertilizer types
   - Benefits and application instructions
   - Best crops for each fertilizer
   - Cost information and warnings

2. **Quality Seeds Guide**
   - Information on major crops (maize, beans, tomatoes, wheat)
   - Variety recommendations with characteristics
   - Sourcing and certification information
   - Storage guidelines and germination testing

3. **Best Practices**
   - 6 core agricultural practices with step-by-step guides
   - Seasonal guidance for all year-round farming
   - 10+ productivity enhancement tips
   - Cost analysis for each practice

4. **Resource Library**
   - Educational articles
   - Video tutorials and case studies
   - Farmer success stories
   - Links to government and NGO resources
   - Comprehensive FAQ section

5. **Progress Tracking**
   - Log farm activities (fertilizing, seeding, watering, weeding, etc.)
   - Track by crop type and farm size
   - View activity statistics
   - Monitor improvements over time

### 🎨 User Interface

- **Green and white color scheme** - reflecting agriculture
- **Intuitive navigation** - bottom tab navigation for easy access
- **Expandable content cards** - reveal details on demand
- **Farmer-friendly design** - optimized for ease of use

## Technology Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation with Tab & Stack Navigators
- **State Management**: Redux Toolkit
- **Language**: JavaScript/JSX
- **Platforms**: iOS, Android, Web

## Project Structure

```
JEMBE/
├── src/
│   ├── screens/           # Main screen components
│   │   ├── HomeScreen.jsx
│   │   ├── FertilizerGuideScreen.jsx
│   │   ├── SeedGuideScreen.jsx
│   │   ├── BestPracticesScreen.jsx
│   │   ├── ResourceLibraryScreen.jsx
│   │   └── ProgressTrackingScreen.jsx
│   ├── redux/             # State management
│   │   ├── agricultureSlice.js
│   │   └── store.js
│   ├── data/              # Agricultural content database
│   │   ├── fertilizerData.js
│   │   ├── seedData.js
│   │   └── bestPracticesData.js
│   ├── components/        # Reusable components
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── assets/                # Images and icons
├── App.jsx                # Main app component
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Navigate to the project directory:
```bash
cd /home/raphael/Desktop/JEMBE
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open on your device:
   - **Android**: Press `a` in the terminal or scan the QR code with Expo Go app
   - **iOS**: Press `i` in the terminal or scan the QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## Core Content

### Fertilizers Covered

1. **Nitrogen Fertilizers** - For leafy growth
2. **Phosphorus Fertilizers** - For root development
3. **Potassium Fertilizers** - For plant strength
4. **Organic Fertilizers** - For soil health

### Crops Included

- Maize/Corn
- Beans (various types)
- Tomatoes
- Wheat
- Bananas
- Citrus Fruits
- Potatoes
- Various vegetables

### Best Practices

1. Soil Health Foundation
2. Water Management Efficiency
3. Integrated Pest Management
4. Proper Fertilizer Application
5. Quality Seed Selection
6. Crop Rotation Planning

## Data Features

### Fertilizer Database
- 4 main types with detailed information
- Benefits and characteristics
- Application methods with timing and rates
- Warning information
- Suitable crops for each type
- Cost indicators

### Seed Database
- 4+ crop-specific seed types
- Variety information
- Sourcing and certification guidelines
- Storage requirements with temperature and humidity
- Planting guides
- Yield potential information
- Practical tips

### Best Practices Guide
- Step-by-step implementation guides
- Seasonal recommendations
- Productivity impact metrics
- Material requirements
- Cost analysis

## Future Enhancements

- [ ] Language localization (Swahili, local languages)
- [ ] Offline mode for rural areas
- [ ] Weather integration
- [ ] GPS-based weather and soil recommendations
- [ ] Community forum for farmer discussions
- [ ] Video content integration
- [ ] Farm record keeping and analytics
- [ ] Integration with input suppliers
- [ ] SMS notifications for seasonal reminders
- [ ] Multi-user household profiles

## Contributing

This is an open agricultural education project. Contributions are welcome including:
- New crop information
- Additional fertilizer data
- Farmer success stories
- Video content
- Translations
- Bug reports and improvements

## License

This project is open source and available for use in agricultural education.

## Contact & Support

For questions, suggestions, or to contribute:
- Agricultural Extension Offices
- KALRO (Kenya Agricultural & Livestock Research Organization)
- Local farming cooperatives

## Acknowledgments

- KALRO for agricultural research data
- KEPHIS for certification standards
- FAO for best practices guidelines
- Smallholder farmers for valuable feedback

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Status**: Production Ready
