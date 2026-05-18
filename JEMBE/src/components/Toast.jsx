import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';

let _showHandler = null;

export function showToast(message, type = 'info', duration = 3000) {
  if (_showHandler) _showHandler({ message, type, duration });
}

export default function Toast() {
  const [payload, setPayload] = useState({ visible: false, message: '', type: 'info' });
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    _showHandler = ({ message, type, duration = 3000 }) => {
      setPayload({ visible: true, message, type });
      Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }).start(() => {
        setTimeout(() => {
          Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
            setPayload({ visible: false, message: '', type: 'info' });
          });
        }, duration);
      });
    };

    return () => { _showHandler = null; };
  }, [anim]);

  if (!payload.visible) return null;

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-60, 10] });
  const backgroundColor = payload.type === 'success' ? '#2e7d32' : payload.type === 'error' ? '#c62828' : '#333';

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], backgroundColor }] } pointerEvents="none">
      <Text style={styles.message}>{payload.message}</Text>
    </Animated.View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    maxWidth: width - 40,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000,
  },
  message: {
    color: '#fff',
    fontSize: 13,
  },
});
