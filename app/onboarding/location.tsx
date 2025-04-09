import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationScreen() {
  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState(false);

  const handleLocationChange = (text: string) => {
    setLocation(text);
    setIsLocationValid(text.trim().length > 0);
  };

  const clearLocation = () => {
    setLocation('');
    setIsLocationValid(false);
  };

  const goBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('userLocation', location);
      router.push('/'); // Navigate to the main app
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>Registration</Text>
              <Text style={styles.stepIndicator}>2/8</Text>
            </View>
            <Text style={styles.headerSubtitle}>Location</Text>
          </View>
          <View style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '25%' }]} />
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What's your location?</Text>
          <Text style={styles.subtitle}>Share your location to find nearby musicians and events</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <View style={styles.locationInputRow}>
            <View style={styles.flagContainer}>
              <Ionicons name="flag" size={32} color="#FFFFFF" />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={16} color="rgba(255, 255, 255, 0.48)" />
              <TextInput
                style={styles.input}
                placeholder="E.g. Los Angeles"
                placeholderTextColor="rgba(255, 255, 255, 0.48)"
                value={location}
                onChangeText={handleLocationChange}
              />
              {location.length > 0 && (
                <TouchableOpacity onPress={clearLocation}>
                  <Ionicons name="close-circle" size={16} color="rgba(255, 255, 255, 0.48)" />
                </TouchableOpacity>
              )}
              {isLocationValid && (
                <Ionicons name="checkmark-circle" size={16} color="#64CD75" />
              )}
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="#828282" />
            <Text style={styles.infoText}>
              Your location helps us connect you with local musicians and music events. 
              It will only be shown to other users at a city level.
            </Text>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <LinearGradient
        colors={['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 0.16)']}
        style={styles.footer}
      >
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.continueButton,
              isLocationValid ? styles.continueButtonActive : {}
            ]}
            onPress={handleContinue}
            disabled={!isLocationValid}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tosContainer}>
          <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
          <Text style={styles.tosText}>By pressing "Continue" you agree with BandMate TOS.</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  stepIndicator: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
    lineHeight: 22,
  },
  infoButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressIndicator: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingTop: 136,
    paddingHorizontal: 12,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
  },
  locationContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  locationInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    opacity: 0.78,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: -0.03,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.03,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 12,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 85.7143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#FF4B4B',
  },
  continueText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 19,
    color: '#121212',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tosText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.03,
    textAlign: 'center',
  },
});
