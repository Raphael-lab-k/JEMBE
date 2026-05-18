import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/agricultureSlice';
import offlineService from '../services/offlineService';

// fallback in-memory data (used briefly while loading)
import { FERTILIZER_TIPS as FALLBACK_TIPS } from '../data/fertilizerData';

const FertilizerGuideScreen = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fertilizers, setFertilizers] = useState([]);
  const [tips, setTips] = useState(FALLBACK_TIPS);
  const [loading, setLoading] = useState(true);

  const favorites = useSelector(state => state.agriculture.favorites);
  const dispatch = useDispatch();

  const categories = ['all', 'Macronutrient', 'Organic Matter'];

  const filteredFertilizers = selectedCategory === 'all'
    ? fertilizers
    : fertilizers.filter(f => f.category === selectedCategory);

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  const handleFavorite = (item) => {
    if (isFavorite(item.id)) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const FertilizerCard = ({ item }) => (
    <View style={styles.fertilizerCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleSection}>
          <Text style={styles.fertilizername}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
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
            <Text style={styles.sectionTitle}>Benefits:</Text>
            {item.benefits.map((benefit, idx) => (
              <Text key={idx} style={styles.listItem}>• {benefit}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sources:</Text>
            {item.sources.map((source, idx) => (
              <Text key={idx} style={styles.listItem}>• {source}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Method:</Text>
            <Text style={styles.detailText}>Timing: {item.applicationMethod.timing}</Text>
            <Text style={styles.detailText}>Rate: {item.applicationMethod.rate}</Text>
            <Text style={styles.detailText}>Frequency: {item.applicationMethod.frequency}</Text>
            <Text style={styles.warningText}>⚠️ {item.applicationMethod.warning}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best For Crops:</Text>
            <Text style={styles.cropsText}>{item.crops.join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Practices:</Text>
            {item.bestPractices.map((practice, idx) => (
              <Text key={idx} style={styles.listItem}>✓ {practice}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const cached = await offlineService.getFertilizers();
      const cachedTips = await offlineService.getFertilizerTips();
      setFertilizers(Array.isArray(cached) ? cached : []);
      setTips(Array.isArray(cachedTips) ? cachedTips : FALLBACK_TIPS);
    } catch (err) {
      console.warn('loadData error', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // ensure cache exists and load data
    offlineService.initCache().then(loadData);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await offlineService.refreshCache();
    await loadData();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fertilizer Guide</Text>
        <Text style={styles.headerSubtitle}>Learn about types, benefits, and application methods</Text>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={handleRefresh} style={{ padding: 6 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>{loading ? 'Refreshing...' : 'Refresh Cache'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Type:</Text>
        <View style={styles.filterButtons}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterBtn,
                selectedCategory === cat && styles.filterBtnActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.filterBtnText,
                selectedCategory === cat && styles.filterBtnTextActive
              ]}>
                {cat === 'all' ? 'All Types' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Fertilizers List */}
      <FlatList
        data={filteredFertilizers}
        renderItem={({ item }) => <FertilizerCard item={item} />}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Quick Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
        {tips.slice(0, 3).map(tip => (
          <View key={tip.id} style={styles.tipBox}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipContent}>{tip.content}</Text>
          </View>
        ))}
      </View>

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
  filterSection: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterBtnActive: {
    backgroundColor: '#2d5016',
    borderColor: '#2d5016',
  },
  filterBtnText: {
    fontSize: 12,
    color: '#666',
  },
  filterBtnTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  fertilizerCard: {
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
  fertilizername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  category: {
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
  warningText: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: 5,
    fontWeight: '500',
  },
  cropsText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  tipsSection: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  tipBox: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  tipContent: {
    fontSize: 12,
    color: '#2e7d32',
    lineHeight: 16,
  },
});

export default FertilizerGuideScreen;
