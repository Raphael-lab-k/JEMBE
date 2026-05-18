import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import syncService from '../services/syncService';
import offlineService from '../services/offlineService';
import { showToast } from '../components/Toast';

const ResourceLibraryScreen = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [syncStatus, setSyncStatus] = useState('Idle');
  const [syncStatusType, setSyncStatusType] = useState('idle');

  useEffect(() => {
    const loadLastSynced = async () => {
      const cached = await offlineService.getLastSynced();
      setLastSynced(cached);
    };
    loadLastSynced();
  }, []);

  const refreshLastSynced = async () => {
    const cached = await offlineService.getLastSynced();
    setLastSynced(cached);
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus('Syncing...');
    setSyncStatusType('syncing');
    const result = await syncService.syncFromRemote();
    setSyncing(false);
    if (result.ok) {
      await refreshLastSynced();
      setSyncStatus('Last sync completed successfully');
      setSyncStatusType('success');
      showToast(`Sync complete. Updated: ${result.updatedKeys ? result.updatedKeys.join(', ') : 'unknown'}`, 'success');
    } else {
      setSyncStatus(`Sync failed: ${result.message || 'unknown error'}`);
      setSyncStatusType('error');
      showToast(`Sync failed: ${result.message || 'unknown error'}`, 'error');
    }
  };

  const lastSyncedLabel = lastSynced ? new Date(lastSynced).toLocaleString() : 'Never synced';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resource Library</Text>
        <Text style={styles.headerSubtitle}>Learning materials and references</Text>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.syncStatus}>Last synced: {lastSyncedLabel}</Text>
          <TouchableOpacity onPress={handleSync} style={{ padding: 6 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>{syncing ? 'Syncing...' : 'Sync Now'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 4 }}>
          <Text style={[styles.syncStatusMessage, styles[`syncStatus_${syncStatusType}`]]}>{syncStatus}</Text>
        </View>
      </View>

      {/* Educational Articles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Educational Articles</Text>
        
        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Understanding NPK Ratios</Text>
          <Text style={styles.resourceDesc}>
            Learn about nitrogen, phosphorus, and potassium ratios and how to choose the right fertilizer for your crops.
          </Text>
        </View>

        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Certified vs Farmer-Saved Seeds</Text>
          <Text style={styles.resourceDesc}>
            Understand the differences between certified and farmer-saved seeds and their impact on your yields.
          </Text>
        </View>

        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Soil Testing Guide</Text>
          <Text style={styles.resourceDesc}>
            A comprehensive guide on how to test your soil and interpret results for better fertilizer application.
          </Text>
        </View>

        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Organic Vs Inorganic Fertilizers</Text>
          <Text style={styles.resourceDesc}>
            Pros and cons of organic and inorganic fertilizers and how to blend them for optimal results.
          </Text>
        </View>
      </View>

      {/* Video Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎥 Video Tutorials</Text>
        
        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>How to Apply Fertilizer Correctly</Text>
          <Text style={styles.videoDuration}>Duration: 8 minutes</Text>
          <Text style={styles.videoDesc}>Step-by-step guide on proper fertilizer application techniques.</Text>
        </View>

        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>Quality Seed Selection Process</Text>
          <Text style={styles.videoDuration}>Duration: 6 minutes</Text>
          <Text style={styles.videoDesc}>Learn how to identify and select quality seeds at the market.</Text>
        </View>

        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>Building Compost at Home</Text>
          <Text style={styles.videoDuration}>Duration: 10 minutes</Text>
          <Text style={styles.videoDesc}>Create nutrient-rich compost from farm waste to supplement fertilizers.</Text>
        </View>

        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>Crop Rotation Strategies</Text>
          <Text style={styles.videoDuration}>Duration: 12 minutes</Text>
          <Text style={styles.videoDesc}>Plan effective crop rotations to maintain soil health and productivity.</Text>
        </View>
      </View>

      {/* Case Studies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Farmer Case Studies</Text>
        
        <View style={styles.caseStudyCard}>
          <Text style={styles.caseStudyTitle}>From 8 to 15 Bags per Acre: Quality Maize Seeds Success</Text>
          <Text style={styles.caseStudyFarmer}>Farmer: Peter Kamau, Nyeri County</Text>
          <Text style={styles.caseStudyDesc}>
            Peter increased his maize yield from 8 bags to 15 bags per acre by switching to certified hybrid seeds and following proper fertilizer application rates. Read how he achieved this sustainable improvement.
          </Text>
        </View>

        <View style={styles.caseStudyCard}>
          <Text style={styles.caseStudyTitle}>Integrated Pest Management: Reducing Losses by 70%</Text>
          <Text style={styles.caseStudyFarmer}>Farmer: Maria Kipchoge, Uasin Gishu County</Text>
          <Text style={styles.caseStudyDesc}>
            Maria implemented IPM practices and reduced crop losses by 70%, while also improving product quality and reducing pesticide spending.
          </Text>
        </View>

        <View style={styles.caseStudyCard}>
          <Text style={styles.caseStudyTitle}>Soil Health = Wealth: Organic Farming Success</Text>
          <Text style={styles.caseStudyFarmer}>Farmer: James Omondi, Kisii County</Text>
          <Text style={styles.caseStudyDesc}>
            James combined organic and chemical fertilizers with crop rotation. After 2 years, his soil fertility improved and production costs decreased.
          </Text>
        </View>
      </View>

      {/* External Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 Helpful Organizations</Text>
        
        <View style={styles.orgCard}>
          <Text style={styles.orgName}>Kenya Agricultural & Livestock Research Organization (KALRO)</Text>
          <Text style={styles.orgInfo}>Research-based agricultural information and certified seeds</Text>
        </View>

        <View style={styles.orgCard}>
          <Text style={styles.orgName}>Kenya Plant Health Inspectorate Service (KEPHIS)</Text>
          <Text style={styles.orgInfo}>Certification of quality seeds and pesticides</Text>
        </View>

        <View style={styles.orgCard}>
          <Text style={styles.orgName}>Food and Agriculture Organization (FAO)</Text>
          <Text style={styles.orgInfo}>Global resources on best practices and agricultural development</Text>
        </View>

        <View style={styles.orgCard}>
          <Text style={styles.orgName}>Local Extension Office</Text>
          <Text style={styles.orgInfo}>County-specific advice adapted to your local conditions</Text>
        </View>
      </View>

      {/* FAQ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❓ Frequently Asked Questions</Text>
        
        <View style={styles.faqCard}>
          <Text style={styles.faqQ}>Q: When is the best time to apply fertilizer?</Text>
          <Text style={styles.faqA}>A: Apply when soil is moist and during active growth periods. Split applications reduce losses and ensure continuous nutrient availability.</Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQ}>Q: How long can seeds be stored?</Text>
          <Text style={styles.faqA}>A: With proper storage (cool, dry conditions), most seeds remain viable for 2-3 years. Always test germination before planting old seeds.</Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQ}>Q: What's the cost-benefit of certified seeds?</Text>
          <Text style={styles.faqA}>A: Although certified seeds cost more upfront, they typically produce 30-50% higher yields, paying for themselves and more.</Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQ}>Q: Can I mix organic and chemical fertilizers?</Text>
          <Text style={styles.faqA}>A: Yes! Combining both provides immediate nutrients from chemicals while organic matter improves long-term soil health.</Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQ}>Q: How often should I rotate crops?</Text>
          <Text style={styles.faqA}>A: Rotate annually if possible. A 3-4 year rotation is ideal but annual rotation is better than none.</Text>
        </View>
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
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  resourceCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2d5016',
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b3700',
    marginBottom: 6,
  },
  resourceDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  videoCard: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1565c0',
    marginBottom: 4,
  },
  videoDuration: {
    fontSize: 11,
    color: '#0d47a1',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  videoDesc: {
    fontSize: 12,
    color: '#444',
  },
  caseStudyCard: {
    backgroundColor: '#f3e5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#7b1fa2',
  },
  caseStudyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a148c',
    marginBottom: 4,
  },
  caseStudyFarmer: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#6a1b9a',
    marginBottom: 6,
  },
  caseStudyDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  orgCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  orgName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 4,
  },
  orgInfo: {
    fontSize: 12,
    color: '#666',
  },
  faqCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  faqQ: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 6,
  },
  faqA: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  syncStatus: {
    color: '#c8e6c9',
    fontSize: 12,
    fontStyle: 'italic',
  },
  syncStatusMessage: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  syncStatus_idle: {
    color: '#dce775',
  },
  syncStatus_syncing: {
    color: '#ffd54f',
  },
  syncStatus_success: {
    color: '#81c784',
  },
  syncStatus_error: {
    color: '#ef5350',
  },
});

export default ResourceLibraryScreen;
