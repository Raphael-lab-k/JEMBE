import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const CardItem = ({ title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const modules = [
    {
      id: 1,
      title: 'Fertilizer Guide',
      subtitle: 'Learn about different types of fertilizers',
      navigateTo: 'FertilizerDetail'
    },
    {
      id: 2,
      title: 'Quality Seeds',
      subtitle: 'Understand how to select and store seeds',
      navigateTo: 'SeedDetail'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to JEMBE</Text>
        <Text style={styles.headerSubtitle}>Your Agricultural Education Partner</Text>
        <Text style={styles.headerDescription}>
          Learn how to optimize fertilizer and seed use to increase productivity on your farm
        </Text>
      </View>

      {/* Main Modules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main Learning Modules</Text>
        <FlatList
          data={modules}
          renderItem={({ item }) => (
            <CardItem
              title={item.title}
              subtitle={item.subtitle}
              onPress={() => navigation.navigate(item.navigateTo)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Quick Facts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Did You Know?</Text>
        <View style={styles.factCard}>
          <Text style={styles.factTitle}>💡 Increased Yields</Text>
          <Text style={styles.factText}>Quality seeds can increase your yield by 30-50% compared to farmer-saved seeds</Text>
        </View>
        <View style={styles.factCard}>
          <Text style={styles.factTitle}>📊 Soil Testing</Text>
          <Text style={styles.factText}>Testing soil before fertilizer application ensures you apply only what your soil needs</Text>
        </View>
        <View style={styles.factCard}>
          <Text style={styles.factTitle}>🌱 Crop Rotation</Text>
          <Text style={styles.factText}>Rotating crops naturally restores soil fertility and reduces pest problems</Text>
        </View>
      </View>

      {/* Getting Started */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>1.</Text>
          <Text style={styles.tipText}>Understand your soil through testing</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>2.</Text>
          <Text style={styles.tipText}>Choose appropriate fertilizers and seeds</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>3.</Text>
          <Text style={styles.tipText}>Follow recommended application rates</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>4.</Text>
          <Text style={styles.tipText}>Track your farm activities and improvements</Text>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.callToAction}>
        <Text style={styles.ctaText}>Start learning today to increase your farm productivity!</Text>
      </View>
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
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#e8f5e9',
    marginBottom: 10,
    fontWeight: '600',
  },
  headerDescription: {
    fontSize: 14,
    color: '#c8e6c9',
    lineHeight: 20,
  },
  section: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2d5016',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b3700',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  factCard: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  factTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 5,
  },
  factText: {
    fontSize: 13,
    color: '#2e7d32',
    lineHeight: 18,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  tipNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginRight: 12,
    minWidth: 25,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  callToAction: {
    backgroundColor: '#2d5016',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomeScreen;
