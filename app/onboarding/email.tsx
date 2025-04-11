import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    setIsValid(emailRegex.test(text));
  };

  const handleContinue = () => {
    if (isValid) {
      router.push('/onboarding/email-verification');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Registration</Text>
            <Text style={styles.headerStep}>1/8</Text>
          </View>
          <Text style={styles.headerSubtitle}>Email</Text>
        </View>
        <Pressable style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground} />
        <View style={styles.progressBarFill} />
      </View>
      
      {/* Main content */}
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What's your email?</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E.g. abc@email.com"
              placeholderTextColor="rgba(255, 255, 255, 0.48)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
            />
          </View>
          
          <View style={styles.helperTextContainer}>
            <View style={styles.helperTextRow}>
              <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
              <Text style={styles.helperText}>Please enter a valid email address.</Text>
            </View>
          </View>
          
          <View style={styles.helperTextContainer}>
            <View style={styles.helperTextRow}>
              <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
              <Text style={styles.helperText}>We will later use this email to verify your account.</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Bottom footer */}
      <View style={styles.footerContainer}>
        <View style={styles.buttonRow}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={27} color="#FFFFFF" />
          </Pressable>
          
          <Pressable 
            style={[styles.continueButton, !isValid && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!isValid}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </View>
        
        <View style={styles.tosContainer}>
          <Ionicons name="information-circle-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
          <Text style={styles.tosText}>
            By pressing "<Text style={styles.tosHighlight}>Continue</Text>" you agree with <Text style={styles.tosHighlight}>BandMate TOS</Text>.
          </Text>
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
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
    zIndex: 2,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  headerStep: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  progressBarBackground: {
    position: 'absolute',
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1,
  },
  progressBarFill: {
    position: 'absolute',
    width: '12.5%', // 1/8 of the progress
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  mainContent: {
    flex: 1,
    paddingTop: 152,
    paddingHorizontal: 16,
    gap: 24,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 27,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 12,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 16,
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: 0,
    paddingVertical: 0,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 18,
    marginVertical: 2,
  },
  helperTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  helperText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    flex: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingBottom: 34,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: 'rgba(18, 18, 18, 0)',
    backdropFilter: 'blur(16px)',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 48,
    borderRadius: 85.7143,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  continueButtonText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 17.1429,
    lineHeight: 19,
    color: '#121212',
    textAlign: 'center',
  },
  tosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 18,
    paddingHorizontal: 8,
  },
  tosText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
    marginLeft: 4,
  },
  tosHighlight: {
    color: 'rgba(255, 255, 255, 0.64)',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
});
