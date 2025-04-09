import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
  const handleStartMatching = () => {
    router.push('/onboarding/welcome'); // Navigate to the welcome screen
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="musical-note" size={44} color="#FFFFFF" />
        </View>
        
        <View style={styles.successContainer}>
          {/* Checkmark Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark" size={88} color="#FFFFFF" />
          </View>
          
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>You're all set!</Text>
            <Text style={styles.subtitle}>Let's get some new contracts now.</Text>
          </View>
          
          {/* Start Matching Button */}
          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStartMatching}
          >
            <Text style={styles.startButtonText}>Start matching!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 81,
  },
  logoContainer: {
    width: 51,
    height: 44,
    marginBottom: 94,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    width: 213,
    alignItems: 'center',
    gap: 48,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: 213,
    alignItems: 'center',
    gap: 18,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.64)',
  },
  startButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#121212',
  },
});
