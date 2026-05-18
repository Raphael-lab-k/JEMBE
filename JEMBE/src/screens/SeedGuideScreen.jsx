import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/agricultureSlice';
import offlineService from '../services/offlineService';

// fallbacks
import { SEED_DATA as FALLBACK_SEEDS } from '../data/seedData';

const SeedGuideScreen = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('seeds');
  const [seeds, setSeeds] = useState([]);
  const [selectionGuide, setSelectionGuide] = useState(null);
  const [storageGuide, setStorageGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  const favorites = useSelector(state => state.agriculture.favorites);
  const dispatch = useDispatch();

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  const handleFavorite = (item) => {
    if (isFavorite(item.id)) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const SeedCard = ({ item }) => (
    <View style={styles.seedCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleSection}>
          <Text style={styles.seedName}>{item.name}</Text>
          <Text style={styles.crop}>{item.crop}</Text>
        </View>
        <TouchableOpacity onPress={() => handleFavorite(item)}>
          <Text style={styles.favoriteBtn}>{isFavorite(item.id) ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <TouchableOpacity 
        style={styles.expandBtn}
        onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
      >
        <Text style={styles.expandBtnText}>
          {expandedId === item.id ? 'Hide Details' : 'Show Details'}
        </Text>
      </TouchableOpacity>

      {expandedId === item.id && (
        <View style={styles.expandedContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Varieties:</Text>
            <Text style={styles.varietiesText}>{item.varieties.join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Characteristics:</Text>
            {item.characteristics.map((char, idx) => (
              <Text key={idx} style={styles.listItem}>• {char}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Advantages:</Text>
            {item.advantages.map((advantage, idx) => (
              <Text key={idx} style={styles.listItem}>✓ {advantage}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sourcing:</Text>
            <Text style={styles.detailText}><Text style={styles.bold}>Where:</Text> {item.sourcing.where.join(', ')}</Text>
            <Text style={styles.detailText}><Text style={styles.bold}>Cost:</Text> {item.sourcing.cost}</Text>
            <Text style={styles.detailText}><Text style={styles.bold}>Certification:</Text> {item.sourcing.certification}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Storage:</Text>
            <Text style={styles.detailText}>Temp: {item.storage.temperature}</Text>
            <Text style={styles.detailText}>Humidity: {item.storage.humidity}</Text>
            <Text style={styles.detailText}>Duration: {item.storage.duration}</Text>
            <Text style={styles.detailText}>Container: {item.storage.container}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planting Guide:</Text>
            <Text style={styles.detailText}>Season: {item.planting.season}</Text>
            <Text style={styles.detailText}>Spacing: {item.planting.spacing}</Text>
            <Text style={styles.detailText}>Depth: {item.planting.depth}</Text>
            <Text style={styles.detailText}>Soil: {item.planting.soilType}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yield Potential:</Text>
            <Text style={[styles.detailText, { color: '#2d5016', fontWeight: '600' }]}>
              {item.yield_potential}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tips:</Text>
            {item.tips.map((tip, idx) => (
              <Text key={idx} style={styles.listItem}>• {tip}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
  const loadData = async () => {
    setLoading(true);
    try {
      const cachedSeeds = await offlineService.getSeeds();
      const sel = await offlineService.getSeedSelectionGuide();
      const stor = await offlineService.getSeedStorageGuide();
      setSeeds(Array.isArray(cachedSeeds) ? cachedSeeds : FALLBACK_SEEDS);
      setSelectionGuide(sel || null);
      setStorageGuide(stor || null);
    } catch (err) {
      console.warn('seed load error', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    offlineService.initCache().then(loadData);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quality Seeds Guide</Text>
        <Text style={styles.headerSubtitle}>Sourcing, selection, and storage tips</Text>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={async () => { setLoading(true); await offlineService.refreshCache(); await loadData(); }} style={{ padding: 6 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>{loading ? 'Refreshing...' : 'Refresh Cache'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'seeds' && styles.tabActive]}
          onPress={() => setActiveTab('seeds')}
        >
          <Text style={[styles.tabText, activeTab === 'seeds' && styles.tabTextActive]}>
            Seed Types
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'selection' && styles.tabActive]}
          onPress={() => setActiveTab('selection')}
        >
          <Text style={[styles.tabText, activeTab === 'selection' && styles.tabTextActive]}>
            Selection
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'storage' && styles.tabActive]}
          onPress={() => setActiveTab('storage')}
        >
          <Text style={[styles.tabText, activeTab === 'storage' && styles.tabTextActive]}>
            Storage
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'seeds' && (
        <FlatList
          data={seeds}
          renderItem={({ item }) => <SeedCard item={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      {activeTab === 'selection' && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to Identify Quality Seeds</Text>
          {(selectionGuide && selectionGuide.how_to_identify_quality || []).map((item, idx) => (
            <View key={idx} style={styles.infoItem}>
              <Text style={styles.infoNumber}>{idx + 1}.</Text>
              <Text style={styles.infoText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.infoTitle}>Certification Standards</Text>
          {selectionGuide && selectionGuide.certification_marks && Object.entries(selectionGuide.certification_marks).map(([key, value]) => (
            <View key={key} style={styles.certBox}>
              <Text style={styles.certKey}>{key.toUpperCase()}:</Text>
              <Text style={styles.certValue}>{value}</Text>
            </View>
          ))}

          <Text style={styles.infoTitle}>Price vs Quality Analysis</Text>
          {(selectionGuide && selectionGuide.price_vs_quality || []).map((item, idx) => (
            <View key={idx} style={styles.analysisItem}>
              <Text style={styles.analysisBullet}>•</Text>
              <Text style={styles.analysisText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'storage' && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Proper Storage Practices</Text>
          {(storageGuide && storageGuide.proper_storage || []).map((item, idx) => (
            <View key={idx} style={styles.infoItem}>
              <Text style={styles.infoNumber}>{idx + 1}.</Text>
              <Text style={styles.infoText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.infoTitle}>Moisture Control</Text>
          {(storageGuide && storageGuide.moisture_control || []).map((item, idx) => (
            <View key={idx} style={styles.tipBox}>
              <Text style={styles.tipBullet}>✓</Text>
              <Text style={styles.tipText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.infoTitle}>Germination Testing</Text>
          {(storageGuide && storageGuide.germination_testing || []).map((item, idx) => (
            <View key={idx} style={styles.tipBox}>
              <Text style={styles.tipBullet}>✓</Text>
              <Text style={styles.tipText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Bottom Spacing */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2d5016',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
  },
  tabTextActive: {
    color: '#2d5016',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  seedCard: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleSection: {
    flex: 1,
  },
  seedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  crop: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
    fontStyle: 'italic',
  },
  favoriteBtn: {
    fontSize: 22,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    lineHeight: 18,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 6,
  },
  varietiesText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  listItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
    lineHeight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  bold: {
    fontWeight: '600',
    color: '#2d5016',
  },
  infoSection: {
    padding: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
    marginTop: 15,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5016',
    marginRight: 10,
    minWidth: 25,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  certBox: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  certKey: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1b5e20',
  },
  certValue: {
    fontSize: 12,
    color: '#2e7d32',
    marginTop: 3,
  },
  analysisItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  analysisBullet: {
    fontSize: 16,
    color: '#2d5016',
    marginRight: 10,
  },
  analysisText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f4c3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#fbc02d',
  },
  tipBullet: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f57f17',
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#5d4037',
    lineHeight: 16,
  },
});

export default SeedGuideScreen;
