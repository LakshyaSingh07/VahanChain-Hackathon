import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface FadeTransitionProps {
  children: React.ReactNode;
  duration?: number;
}

const FadeTransition: React.FC<FadeTransitionProps> = ({ 
  children, 
  duration = 600 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FadeTransition;
