import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { BEST_PRACTICES as FALLBACK_BP, SEASONAL_TIPS as FALLBACK_SEASONAL, PRODUCTIVITY_TIPS as FALLBACK_PRODUCTIVITY } from '../data/bestPracticesData';
import offlineService from '../services/offlineService';

const BestPracticesScreen = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [practices, setPractices] = useState([]);
  const [seasonal, setSeasonal] = useState({});
  const [productivity, setProductivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const bp = await offlineService.getBestPractices();
      const s = await offlineService.getSeasonalTips();
      const p = await offlineService.getProductivityTips();
      setPractices(Array.isArray(bp) ? bp : FALLBACK_BP);
      setSeasonal(s || FALLBACK_SEASONAL);
      setProductivity(Array.isArray(p) ? p : FALLBACK_PRODUCTIVITY);
    } catch (err) {
      console.warn('best practices load error', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    offlineService.initCache().then(loadData);
  }, []);

  const PracticeCard = ({ item }) => (
    <View style={styles.practiceCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.practiceTitle}>{item.title}</Text>
        <View style={styles.badges}>
          <Text style={styles.badge}>{item.season}</Text>
          <Text style={[styles.badge, styles.badgeDifficulty]}>{item.difficulty}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Duration:</Text>
        <Text style={styles.infoValue}>{item.duration}</Text>
      </View>

      <TouchableOpacity 
        style={styles.expandBtn}
        onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
      >
        <Text style={styles.expandBtnText}>
          {expandedId === item.id ? 'Hide Steps' : 'View Steps'}
        </Text>
      </TouchableOpacity>

      {expandedId === item.id && (
        <View style={styles.expandedContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Steps:</Text>
            {item.steps.map((step, idx) => (
              <Text key={idx} style={styles.stepText}>{idx + 1}. {step}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits:</Text>
            {item.benefits.map((benefit, idx) => (
              <Text key={idx} style={styles.listItem}>✓ {benefit}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Materials Needed:</Text>
            <Text style={styles.materialsText}>{item.materials.join(', ')}</Text>
          </View>

          <View style={styles.costSection}>
            <Text style={styles.sectionTitle}>Cost:</Text>
            <Text style={styles.costText}>{item.cost}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Best Practices Guide</Text>
        <Text style={styles.headerSubtitle}>Proven techniques to boost productivity</Text>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={async () => { setLoading(true); await offlineService.refreshCache(); await loadData(); }} style={{ padding: 6 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>{loading ? 'Refreshing...' : 'Refresh Cache'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Core Practices */}
      <View style={styles.sectionContainer}>
        <Text style={styles.mainTitle}>Core Agricultural Practices</Text>
        <View style={{ marginBottom: 10, alignItems: 'flex-end' }}>
          <Text style={{ color: '#888', fontSize: 12 }}>{loading ? 'Loading cached content...' : ''}</Text>
        </View>
        <FlatList
          data={practices}
          renderItem={({ item }) => <PracticeCard item={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Seasonal Guide */}
      <View style={styles.sectionContainer}>
        <Text style={styles.mainTitle}>Seasonal Guidance</Text>
        {Object.entries(seasonal).map(([season, tips]) => (
          <View key={season} style={styles.seasonCard}>
            <Text style={styles.seasonTitle}>
              {season.replace(/_/g, ' ').toUpperCase()}
            </Text>
            {tips.map((tip, idx) => (
              <Text key={idx} style={styles.seasonTip}>• {tip}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Productivity Tips */}
      <View style={styles.sectionContainer}>
        <Text style={styles.mainTitle}>Productivity Enhancement Tips</Text>
        {productivity.map((item, idx) => (
          <View key={idx} style={styles.tipCard}>
            <Text style={styles.tipQuestion}>{item.tip}</Text>
            <View style={styles.impactBox}>
              <Text style={styles.impactLabel}>Potential Impact:</Text>
              <Text style={styles.impactValue}>{item.impact}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const TouchableOpacity = require('react-native').TouchableOpacity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2d5016',
    padding: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#c8e6c9',
  },
  sectionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  practiceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    marginBottom: 12,
  },
  practiceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#e0e0e0',
    color: '#555',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 8,
  },
  badgeDifficulty: {
    backgroundColor: '#fff3e0',
    color: '#e65100',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginRight: 8,
  },
  infoValue: {
    fontSize: 12,
    color: '#888',
  },
  expandBtn: {
    backgroundColor: '#2d5016',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  expandBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  expandedContent: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    lineHeight: 16,
  },
  listItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  materialsText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  costSection: {
    backgroundColor: '#f0f4c3',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  costText: {
    fontSize: 12,
    color: '#5d4037',
    fontWeight: '500',
  },
  seasonCard: {
    backgroundColor: '#f0f4c3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#fbc02d',
  },
  seasonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5d4037',
    marginBottom: 8,
  },
  seasonTip: {
    fontSize: 12,
    color: '#5d4037',
    marginBottom: 4,
    lineHeight: 16,
  },
  tipCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tipQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 8,
    lineHeight: 18,
  },
  impactBox: {
    backgroundColor: '#e8f5e9',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4caf50',
  },
  impactLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1b5e20',
  },
  impactValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    marginTop: 3,
  },
});

export default BestPracticesScreen;
