import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import offlineService from './src/services/offlineService';
import syncService from './src/services/syncService';
import Toast from './src/components/Toast';
import settingsService from './src/services/settingsService';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import FertilizerGuideScreen from './src/screens/FertilizerGuideScreen';
import SeedGuideScreen from './src/screens/SeedGuideScreen';
import BestPracticesScreen from './src/screens/BestPracticesScreen';
import ResourceLibraryScreen from './src/screens/ResourceLibraryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import ProgressTrackingScreen from './src/screens/ProgressTrackingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d5016',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="HomeStack" 
      component={HomeScreen}
      options={{ title: 'JEMBE - Agricultural Education' }}
    />
    <Stack.Screen 
      name="FertilizerDetail"
      component={FertilizerGuideScreen}
      options={{ title: 'Fertilizer Guide' }}
    />
    <Stack.Screen 
      name="SeedDetail"
      component={SeedGuideScreen}
      options={{ title: 'Quality Seeds Guide' }}
    />
  </Stack.Navigator>
);

const BestPracticesStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d5016',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="BestPracticesStack" 
      component={BestPracticesScreen}
      options={{ title: 'Best Practices' }}
    />
  </Stack.Navigator>
);

const ResourceStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d5016',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="ResourceStack" 
      component={ResourceLibraryScreen}
      options={{ title: 'Resource Library' }}
    />
  </Stack.Navigator>
);

const TrackingStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2d5016',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="TrackingStack" 
      component={ProgressTrackingScreen}
      options={{ title: 'Track Your Progress' }}
    />
  </Stack.Navigator>
);

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#2d5016',
      tabBarInactiveTintColor: '#ccc',
      tabBarStyle: {
        borderTopColor: '#e0e0e0',
        paddingBottom: 5,
      },
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeStackNavigator}
      options={{
        title: 'Home',
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen 
      name="BestPractices" 
      component={BestPracticesStackNavigator}
      options={{
        title: 'Best Practices',
        tabBarLabel: 'Tips',
      }}
    />
    <Tab.Screen 
      name="Resources" 
      component={ResourceStackNavigator}
      options={{
        title: 'Resource Library',
        tabBarLabel: 'Resources',
      }}
    />
    <Tab.Screen 
      name="Tracking" 
      component={TrackingStackNavigator}
      options={{
        title: 'Track Progress',
        tabBarLabel: 'Progress',
      }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        title: 'Settings',
        tabBarLabel: 'Settings',
      }}
    />
    <Tab.Screen 
      name="Analytics" 
      component={AnalyticsScreen}
      options={{
        title: 'Analytics',
        tabBarLabel: 'Analytics',
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const appStateRef = useRef(AppState.currentState);
  const isConnectedRef = useRef(false);
  const syncInProgressRef = useRef(false);

  useEffect(() => {
    const runInitialSetup = async () => {
      await offlineService.initCache().catch(() => {});
      const state = await NetInfo.fetch();
      isConnectedRef.current = !!state.isConnected && state.isInternetReachable !== false;
      if (isConnectedRef.current) {
        await performAutoSync();
      }
    };

    runInitialSetup();

    const netInfoUnsubscribe = NetInfo.addEventListener(async state => {
      const connected = !!state.isConnected && state.isInternetReachable !== false;
      if (connected && !isConnectedRef.current) {
        const enabled = await settingsService.getAutoSyncEnabled();
        if (enabled) performAutoSync();
      }
      isConnectedRef.current = connected;
    });

    const appStateSubscription = AppState.addEventListener('change', async nextAppState => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        if (isConnectedRef.current) {
          const enabled = await settingsService.getAutoSyncEnabled();
          if (enabled) performAutoSync();
        }
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      netInfoUnsubscribe();
      appStateSubscription.remove();
    };
  }, []);

  const performAutoSync = async () => {
    if (syncInProgressRef.current) return;
    syncInProgressRef.current = true;
    const result = await syncService.syncFromRemote();
    if (!result.ok) {
      console.log('[AutoSync] failed:', result.message);
    } else {
      console.log('[AutoSync] success:', result.updatedKeys || []);
    }
    syncInProgressRef.current = false;
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

