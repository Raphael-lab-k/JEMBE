import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logProgress } from '../redux/agricultureSlice';

const ProgressTrackingScreen = () => {
  const [formData, setFormData] = useState({
    activity: '',
    crop: '',
    area: '',
    notes: ''
  });

  const progressLog = useSelector(state => state.agriculture.progressLog);
  const dispatch = useDispatch();

  const handleLogActivity = () => {
    if (!formData.activity || !formData.crop || !formData.area) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    dispatch(logProgress({
      activity: formData.activity,
      crop: formData.crop,
      area: formData.area,
      notes: formData.notes
    }));

    setFormData({ activity: '', crop: '', area: '', notes: '' });
    Alert.alert('Success', 'Activity logged successfully!');
  };

  const getActivityEmoji = (activity) => {
    const emojis = {
      'Fertilizer': '🧪',
      'Seeding': '🌱',
      'Watering': '💧',
      'Weeding': '🌾',
      'Pest Control': '🐛',
      'Harvesting': '🌾',
      'Other': '📝'
    };
    return emojis[activity] || '📝';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Your Progress</Text>
        <Text style={styles.headerSubtitle}>Monitor farm activities and improvements</Text>
      </View>

      {/* Log Activity Form */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>📝 Log Activity</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Activity Type *</Text>
          <View style={styles.pickerButtons}>
            {['Fertilizer', 'Seeding', 'Watering', 'Weeding', 'Pest Control', 'Harvesting', 'Other'].map(
              activity => (
                <TouchableOpacity
                  key={activity}
                  style={[
                    styles.pickerBtn,
                    formData.activity === activity && styles.pickerBtnActive
                  ]}
                  onPress={() => setFormData({ ...formData, activity })}
                >
                  <Text style={[
                    styles.pickerBtnText,
                    formData.activity === activity && styles.pickerBtnTextActive
                  ]}>
                    {activity}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Crop Type *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Maize, Beans, Tomatoes"
            placeholderTextColor="#999"
            value={formData.crop}
            onChangeText={text => setFormData({ ...formData, crop: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Area (acres) *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2.5"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
            value={formData.area}
            onChangeText={text => setFormData({ ...formData, area: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any observations or notes about this activity..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={formData.notes}
            onChangeText={text => setFormData({ ...formData, notes: text })}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleLogActivity}>
          <Text style={styles.submitBtnText}>Log Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Log */}
      <View style={styles.logSection}>
        <View style={styles.logHeader}>
          <Text style={styles.logTitle}>📋 Your Activity Log</Text>
          {progressLog.length > 0 && (
            <Text style={styles.logCount}>{progressLog.length} activities</Text>
          )}
        </View>

        {progressLog.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No activities logged yet.</Text>
            <Text style={styles.emptyStateSubtext}>Start tracking your farm activities above!</Text>
          </View>
        ) : (
          progressLog.slice().reverse().map((log, index) => {
            const logDate = new Date(log.timestamp);
            const dateStr = logDate.toLocaleDateString();
            const timeStr = logDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <View key={index} style={styles.logCard}>
                <View style={styles.logCardHeader}>
                  <View>
                    <Text style={styles.logActivity}>
                      {getActivityEmoji(log.activity)} {log.activity}
                    </Text>
                    <Text style={styles.logCrop}>{log.crop} • {log.area} acres</Text>
                  </View>
                  <View style={styles.logDate}>
                    <Text style={styles.logDateText}>{dateStr}</Text>
                    <Text style={styles.logTimeText}>{timeStr}</Text>
                  </View>
                </View>

                {log.notes && (
                  <View style={styles.logNotes}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText}>{log.notes}</Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </View>

      {/* Statistics */}
      {progressLog.length > 0 && (
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>📊 Statistics</Text>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Activities Logged</Text>
            <Text style={styles.statValue}>{progressLog.length}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Most Logged Activity</Text>
            <Text style={styles.statValue}>
              {progressLog.reduce((acc, log) => {
                acc[log.activity] = (acc[log.activity] || 0) + 1;
                return acc;
              }, {}) && 
              Object.entries(progressLog.reduce((acc, log) => {
                acc[log.activity] = (acc[log.activity] || 0) + 1;
                return acc;
              }, {})).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Area Worked</Text>
            <Text style={styles.statValue}>
              {(progressLog.reduce((sum, log) => sum + parseFloat(log.area || 0), 0)).toFixed(1)} acres
            </Text>
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Tracking Tips</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>✓ Log activities regularly to maintain accurate records</Text>
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>✓ Include detailed notes about conditions and observations</Text>
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>✓ Use tracking data to improve your farming practices</Text>
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>✓ Compare activities across seasons to identify patterns</Text>
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
  formSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 8,
  },
  pickerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginRight: 8,
    marginBottom: 8,
  },
  pickerBtnActive: {
    backgroundColor: '#2d5016',
    borderColor: '#2d5016',
  },
  pickerBtnText: {
    fontSize: 12,
    color: '#666',
  },
  pickerBtnTextActive: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textArea: {
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#2d5016',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logSection: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  logCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    backgroundColor: '#efefef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emptyState: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 6,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#ccc',
  },
  logCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  logCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logActivity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5016',
  },
  logCrop: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  logDate: {
    alignItems: 'flex-end',
  },
  logDateText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
  },
  logTimeText: {
    fontSize: 10,
    color: '#bbb',
  },
  logNotes: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  notesLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  statsSection: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  statLabel: {
    fontSize: 12,
    color: '#1b5e20',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginTop: 4,
  },
  tipsSection: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  tipBox: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  tipText: {
    fontSize: 12,
    color: '#e65100',
  },
});

export default ProgressTrackingScreen;
