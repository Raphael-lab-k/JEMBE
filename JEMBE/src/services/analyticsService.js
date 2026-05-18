import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'jembe_analytics_events_v1';

async function logEvent(name, props = {}) {
  try {
    const record = { name, props, ts: new Date().toISOString() };
    const raw = await AsyncStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(record);
    await AsyncStorage.setItem(KEY, JSON.stringify(arr));
    // keep console log for local debugging
    console.log('[Analytics] event', record);
    return true;
  } catch (err) {
    console.warn('analytics logEvent error', err);
    return false;
  }
}

async function getEvents() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('analytics getEvents error', err);
    return [];
  }
}

async function clearEvents() {
  try {
    await AsyncStorage.removeItem(KEY);
    return true;
  } catch (err) {
    console.warn('analytics clearEvents error', err);
    return false;
  }
}

export default {
  logEvent,
  getEvents,
  clearEvents,
};
