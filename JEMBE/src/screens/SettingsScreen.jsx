import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import settingsService from '../services/settingsService';
import syncService from '../services/syncService';
import analyticsService from '../services/analyticsService';
import { showToast } from '../components/Toast';

const SettingsScreen = () => {
  const [remoteUrl, setRemoteUrl] = useState('');
  const [autoSync, setAutoSync] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const override = await settingsService.getRemoteUrlOverride();
      const auto = await settingsService.getAutoSyncEnabled();
      setRemoteUrl(override || '');
      setAutoSync(!!auto);
    };
    load();
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    // Basic validation: must be valid URL and use https if provided
    let reachable = null;
    if (remoteUrl && remoteUrl.length > 0) {
      try {
        const parsed = new URL(remoteUrl);
        if (parsed.protocol !== 'https:') {
          setSaving(false);
          showToast('Please use an HTTPS URL', 'error');
          await analyticsService.logEvent('settings_save_failed', { reason: 'not_https', remoteUrl });
          return;
        }
        // quick reachability check (non-blocking for save but we attempt)
        try {
          const reachableResult = await checkReachable(remoteUrl, 3000);
          reachable = !!reachableResult;
        } catch (e) {
          reachable = false;
        }
      } catch (err) {
        setSaving(false);
        showToast('Invalid URL format', 'error');
        await analyticsService.logEvent('settings_save_failed', { reason: 'invalid_url', remoteUrl });
        return;
      }
    }

    await settingsService.setRemoteUrlOverride(remoteUrl || null);
    await settingsService.setAutoSyncEnabled(!!autoSync);
    setSaving(false);
    showToast('Settings saved', 'success');
    await analyticsService.logEvent('settings_saved', { remoteUrl: remoteUrl || null, autoSync: !!autoSync, reachable });
  };

  const handleForceSync = async () => {
    setSaving(true);
    const result = await syncService.syncFromRemote();
    setSaving(false);
    if (result.ok) showToast('Sync complete', 'success');
    else showToast(`Sync failed: ${result.message}`, 'error');
    await analyticsService.logEvent('force_sync', { ok: !!result.ok, message: result.message || '' });
  };

  // simple reachability check using fetch with timeout
  async function checkReachable(url, timeoutMs = 3000) {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const signal = controller ? controller.signal : undefined;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
      const res = await fetch(url, { method: 'GET', signal });
      if (timer) clearTimeout(timer);
      return res && (res.ok || res.status === 200);
    } catch (err) {
      if (timer) clearTimeout(timer);
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sync Settings</Text>

      <Text style={styles.label}>Remote sync URL override</Text>
      <TextInput
        style={styles.input}
        value={remoteUrl}
        onChangeText={setRemoteUrl}
        placeholder="https://your-server.example/jembe.json"
        autoCapitalize="none"
        keyboardType="url"
      />

      <View style={styles.row}>
        <Text style={styles.label}>Enable automatic sync</Text>
        <Switch value={autoSync} onValueChange={setAutoSync} />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 18 }}>
        <TouchableOpacity style={styles.button} onPress={saveSettings} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save Settings'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginLeft: 10, backgroundColor: '#1976d2' }]} onPress={handleForceSync} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? 'Working...' : 'Force Sync'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: '700', color: '#2d5016', marginBottom: 12 },
  label: { color: '#333', marginBottom: 6 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  button: { backgroundColor: '#2d5016', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default SettingsScreen;
