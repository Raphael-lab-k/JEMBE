import AsyncStorage from '@react-native-async-storage/async-storage';
import { FERTILIZER_DATA, FERTILIZER_TIPS } from '../data/fertilizerData';
import { SEED_DATA, SEED_SELECTION_GUIDE, SEED_STORAGE_GUIDE } from '../data/seedData';
import { BEST_PRACTICES, SEASONAL_TIPS, PRODUCTIVITY_TIPS } from '../data/bestPracticesData';

const KEYS = {
  fertilizers: 'jembe_fertilizers_v1',
  fertilizerTips: 'jembe_fertilizer_tips_v1',
  seeds: 'jembe_seeds_v1',
  seedSelection: 'jembe_seed_selection_v1',
  seedStorage: 'jembe_seed_storage_v1',
  bestPractices: 'jembe_best_practices_v1',
  seasonalTips: 'jembe_seasonal_tips_v1',
  productivityTips: 'jembe_productivity_tips_v1',
  lastSynced: 'jembe_last_synced_v1'
};

async function initCache() {
  try {
    const promises = [];
    promises.push(AsyncStorage.setItem(KEYS.fertilizers, JSON.stringify(FERTILIZER_DATA)));
    promises.push(AsyncStorage.setItem(KEYS.fertilizerTips, JSON.stringify(FERTILIZER_TIPS)));
    promises.push(AsyncStorage.setItem(KEYS.seeds, JSON.stringify(SEED_DATA)));
    promises.push(AsyncStorage.setItem(KEYS.seedSelection, JSON.stringify(SEED_SELECTION_GUIDE)));
    promises.push(AsyncStorage.setItem(KEYS.seedStorage, JSON.stringify(SEED_STORAGE_GUIDE)));
    promises.push(AsyncStorage.setItem(KEYS.bestPractices, JSON.stringify(BEST_PRACTICES)));
    promises.push(AsyncStorage.setItem(KEYS.seasonalTips, JSON.stringify(SEASONAL_TIPS)));
    promises.push(AsyncStorage.setItem(KEYS.productivityTips, JSON.stringify(PRODUCTIVITY_TIPS)));
    await Promise.all(promises);
  } catch (err) {
    // silent fail - app should continue using in-memory defaults
    console.warn('initCache error', err);
  }
}

async function getItem(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('getItem error', key, err);
    return fallback;
  }
}

async function getFertilizers() {
  return getItem(KEYS.fertilizers, FERTILIZER_DATA);
}

async function getFertilizerTips() {
  return getItem(KEYS.fertilizerTips, FERTILIZER_TIPS);
}

async function getSeeds() {
  return getItem(KEYS.seeds, SEED_DATA);
}

async function getSeedSelectionGuide() {
  return getItem(KEYS.seedSelection, SEED_SELECTION_GUIDE);
}

async function getSeedStorageGuide() {
  return getItem(KEYS.seedStorage, SEED_STORAGE_GUIDE);
}

async function getBestPractices() {
  return getItem(KEYS.bestPractices, BEST_PRACTICES);
}

async function getSeasonalTips() {
  return getItem(KEYS.seasonalTips, SEASONAL_TIPS);
}

async function getProductivityTips() {
  return getItem(KEYS.productivityTips, PRODUCTIVITY_TIPS);
}

async function getLastSynced() {
  return getItem(KEYS.lastSynced, null);
}

async function setLastSynced(value) {
  try {
    await AsyncStorage.setItem(KEYS.lastSynced, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn('setLastSynced error', err);
    return false;
  }
}

// For now refresh writes local bundled data into cache. In future this can fetch remote.
async function refreshCache() {
  await initCache();
  return true;
}

// Write a remote data object into local AsyncStorage keys.
// Expected shape (any subset): { fertilizers, fertilizerTips, seeds, seedSelection, seedStorage, bestPractices, seasonalTips, productivityTips }
async function setRemoteData(remote) {
  try {
    const promises = [];
    if (remote.fertilizers) promises.push(AsyncStorage.setItem(KEYS.fertilizers, JSON.stringify(remote.fertilizers)));
    if (remote.fertilizerTips) promises.push(AsyncStorage.setItem(KEYS.fertilizerTips, JSON.stringify(remote.fertilizerTips)));
    if (remote.seeds) promises.push(AsyncStorage.setItem(KEYS.seeds, JSON.stringify(remote.seeds)));
    if (remote.seedSelection) promises.push(AsyncStorage.setItem(KEYS.seedSelection, JSON.stringify(remote.seedSelection)));
    if (remote.seedStorage) promises.push(AsyncStorage.setItem(KEYS.seedStorage, JSON.stringify(remote.seedStorage)));
    if (remote.bestPractices) promises.push(AsyncStorage.setItem(KEYS.bestPractices, JSON.stringify(remote.bestPractices)));
    if (remote.seasonalTips) promises.push(AsyncStorage.setItem(KEYS.seasonalTips, JSON.stringify(remote.seasonalTips)));
    if (remote.productivityTips) promises.push(AsyncStorage.setItem(KEYS.productivityTips, JSON.stringify(remote.productivityTips)));
    if (promises.length === 0) return false;
    await Promise.all(promises);
    return true;
  } catch (err) {
    console.warn('setRemoteData error', err);
    return false;
  }
}

export default {
  initCache,
  getFertilizers,
  getFertilizerTips,
  getSeeds,
  getSeedSelectionGuide,
  getSeedStorageGuide,
  getBestPractices,
  getSeasonalTips,
  getProductivityTips,
  getLastSynced,
  setLastSynced,
  refreshCache,
  setRemoteData
};
