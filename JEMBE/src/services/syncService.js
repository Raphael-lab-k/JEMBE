import Constants from 'expo-constants';
import offlineService from './offlineService';
import settingsService from './settingsService';

// Default remote URL placeholder. Replace with a real endpoint returning JSON.
const DEFAULT_REMOTE_URL = 'https://example.com/jembe-updates.json';

function getRemoteUrlFromConfig() {
  const expoConfig = Constants.expoConfig || Constants.manifest?.extra || {};
  return expoConfig.remoteSyncUrl || DEFAULT_REMOTE_URL;
}

// Basic validator - checks for presence of expected keys
function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') return false;
  // accept if at least one known key exists
  const allowed = ['fertilizers','fertilizerTips','seeds','seedSelection','seedStorage','bestPractices','seasonalTips','productivityTips'];
  return Object.keys(payload).some(k => allowed.includes(k));
}

async function syncFromRemote(remoteUrl, timeoutMs = 8000) {
  // determine url: explicit param -> user override -> app config -> default
  if (!remoteUrl) {
    const override = await settingsService.getRemoteUrlOverride();
    remoteUrl = override || getRemoteUrlFromConfig();
  }
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const signal = controller ? controller.signal : undefined;
    if (controller) setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(remoteUrl, { method: 'GET', signal });
    if (!res.ok) return { ok: false, status: res.status, message: 'Remote returned non-OK status' };
    const payload = await res.json();
    if (!validatePayload(payload)) return { ok: false, message: 'Payload invalid or missing expected keys' };

    const wrote = await offlineService.setRemoteData(payload);
    if (!wrote) return { ok: false, message: 'Failed to write remote data to cache' };

    await offlineService.setLastSynced(new Date().toISOString());
    return { ok: true, message: 'Sync successful', updatedKeys: Object.keys(payload) };
  } catch (err) {
    if (err.name === 'AbortError') return { ok: false, message: 'Request timed out' };
    return { ok: false, message: err.message || 'Unknown error' };
  }
}

export default {
  syncFromRemote,
};
