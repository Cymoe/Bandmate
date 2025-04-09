import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    AsyncStorage.getItem('hasCompletedOnboarding')
      .then((value) => {
        setHasCompletedOnboarding(value === 'true');
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // For normal user flow, start at the beginning
  const goToOnboarding = () => {
    router.push('/onboarding/email');
  };

  // Direct navigation options for development
  const goToMatchingScreen = () => {
    router.push('/matching');
  };

  // Direct access to specific onboarding steps for development
  const goToUserTypeScreen = () => {
    router.push('/onboarding/user-type');
  };

  const goToLocationScreen = () => {
    router.push('/onboarding/location');
  };

  const goToInstrumentsScreen = () => {
    router.push('/onboarding/instruments');
  };

  const goToFinalScreen = () => {
    router.push('/onboarding/final');
  };

  const goToSuccessScreen = () => {
    router.push('/onboarding/success');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bandmate Dev Menu</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Onboarding status: {hasCompletedOnboarding ? 'Completed' : 'Not completed'}
        </Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <Text style={styles.sectionTitle}>Main Screens</Text>
          <TouchableOpacity style={styles.button} onPress={goToMatchingScreen}>
            <Text style={styles.buttonText}>Go to Matching Screen</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Complete Onboarding</Text>
          <TouchableOpacity style={styles.button} onPress={goToOnboarding}>
            <Text style={styles.buttonText}>Start Full Onboarding Flow</Text>
          </TouchableOpacity>
          
          <Text style={styles.sectionTitle}>Onboarding Shortcuts</Text>
          <TouchableOpacity style={styles.button} onPress={goToUserTypeScreen}>
            <Text style={styles.buttonText}>User Type Selection</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={goToLocationScreen}>
            <Text style={styles.buttonText}>Location Screen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={goToInstrumentsScreen}>
            <Text style={styles.buttonText}>Instruments Screen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={goToFinalScreen}>
            <Text style={styles.buttonText}>Final Confirmation Screen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={goToSuccessScreen}>
            <Text style={styles.buttonText}>Success Screen</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Text style={styles.note}>
        Note: This development menu won't appear in production builds.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 77, 0, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4D00',
    marginTop: 16,
    marginBottom: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF4D00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  note: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});