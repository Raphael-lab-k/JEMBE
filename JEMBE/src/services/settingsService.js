import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  remoteOverride: 'jembe_settings_remote_sync_url_v1',
  autoSyncEnabled: 'jembe_settings_auto_sync_enabled_v1',
};

async function getRemoteUrlOverride() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.remoteOverride);
    return raw || null;
  } catch (err) {
    console.warn('getRemoteUrlOverride error', err);
    return null;
  }
}

async function setRemoteUrlOverride(value) {
  try {
    if (!value) {
      await AsyncStorage.removeItem(KEYS.remoteOverride);
      return true;
    }
    await AsyncStorage.setItem(KEYS.remoteOverride, value);
    return true;
  } catch (err) {
    console.warn('setRemoteUrlOverride error', err);
    return false;
  }
}

async function getAutoSyncEnabled() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.autoSyncEnabled);
    if (raw === null) return true; // default true
    return raw === '1';
  } catch (err) {
    console.warn('getAutoSyncEnabled error', err);
    return true;
  }
}

async function setAutoSyncEnabled(enabled) {
  try {
    await AsyncStorage.setItem(KEYS.autoSyncEnabled, enabled ? '1' : '0');
    return true;
  } catch (err) {
    console.warn('setAutoSyncEnabled error', err);
    return false;
  }
}

export default {
  getRemoteUrlOverride,
  setRemoteUrlOverride,
  getAutoSyncEnabled,
  setAutoSyncEnabled,
};
