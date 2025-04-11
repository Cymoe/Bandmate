import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SuperLikesScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#141416', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#F8F9FB" />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>PSC</Text>
        </View>
        <Text style={styles.brandName}>PRIVATE SOCIAL CLUB</Text>

        {/* Special Offers Badge */}
        <View style={styles.specialOffersContainer}>
          <Ionicons name="star" size={16} color="#141416" />
          <Text style={styles.specialOffersText}>Special offers</Text>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Super likes</Text>
          <Ionicons name="star" size={32} color="#007BFF" />
        </View>

        <Text style={styles.subtitle}>
          Stand out with Super Likes and get much more chance to connect with other like minded profiles.
        </Text>

        {/* Options */}
        <Text style={styles.selectTitle}>Select your offer</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.optionCard, selectedOption === 0 && styles.selectedOption]}
            onPress={() => setSelectedOption(0)}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionText}>Get 3 Super Likes!</Text>
              <Text style={styles.priceText}>$3/each</Text>
            </View>
            <View style={[styles.radioButton, selectedOption === 0 && styles.radioButtonSelected]}>
              {selectedOption === 0 && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionCard, selectedOption === 1 && styles.selectedOption]}
            onPress={() => setSelectedOption(1)}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionText}>Get 9 Super Likes!</Text>
              <Text style={styles.priceText}>$2.50/each</Text>
            </View>
            <View style={[styles.radioButton, selectedOption === 1 && styles.radioButtonSelected]}>
              {selectedOption === 1 && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionCard, selectedOption === 2 && styles.selectedOption]}
            onPress={() => setSelectedOption(2)}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <Text style={styles.optionText}>Get 20 Super Likes!</Text>
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most popular</Text>
                </View>
              </View>
              <Text style={styles.priceText}>$2/each</Text>
            </View>
            <View style={[styles.radioButton, selectedOption === 2 && styles.radioButtonSelected]}>
              {selectedOption === 2 && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By clicking Confirm your purchase you will be billed, and your subscription will be automatically renewed for the same price and duration until you decide to cancel it yourself through the Google Play's settings. By clicking Confirm you also accept PSC's Terms of Use.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  } as ViewStyle,
  scrollView: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  } as ViewStyle,
  backButton: {
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2D30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  } as ViewStyle,
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2C2D30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,
  logoText: {
    fontFamily: 'Clash Display',
    fontSize: 24,
    fontWeight: '600',
    color: '#F8F9FB',
  } as TextStyle,
  brandName: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#F8F9FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 32,
  } as TextStyle,
  specialOffersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A19375',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    marginBottom: 24,
  } as ViewStyle,
  specialOffersText: {
    fontFamily: 'Clash Display',
    fontSize: 14,
    fontWeight: '600',
    color: '#141416',
  } as TextStyle,
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  } as ViewStyle,
  title: {
    fontFamily: 'Clash Display',
    fontSize: 32,
    fontWeight: '600',
    color: '#F8F9FB',
  } as TextStyle,
  subtitle: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    color: '#71727A',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  } as TextStyle,
  selectTitle: {
    fontFamily: 'Clash Display',
    fontSize: 18,
    fontWeight: '600',
    color: '#F8F9FB',
    alignSelf: 'flex-start',
    marginBottom: 16,
  } as TextStyle,
  optionsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  } as ViewStyle,
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141414',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262626',
    padding: 16,
  } as ViewStyle,
  selectedOption: {
    borderColor: '#A19375',
  } as ViewStyle,
  optionContent: {
    flex: 1,
    gap: 4,
  } as ViewStyle,
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  } as ViewStyle,
  optionText: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  } as TextStyle,
  popularBadge: {
    backgroundColor: '#A19375',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  } as ViewStyle,
  popularBadgeText: {
    fontFamily: 'Clash Display',
    fontSize: 12,
    fontWeight: '500',
    color: '#141416',
  } as TextStyle,
  priceText: {
    fontFamily: 'Clash Display',
    fontSize: 14,
    color: '#F8F9FB',
  } as TextStyle,
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262626',
    backgroundColor: '#141416',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  radioButtonSelected: {
    borderColor: '#A19375',
  } as ViewStyle,
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A19375',
  } as ViewStyle,
  confirmButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  } as ViewStyle,
  confirmText: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FB',
  } as TextStyle,
  terms: {
    fontFamily: 'Clash Display',
    fontSize: 10,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 14,
  } as TextStyle,
});

export default SuperLikesScreen; 