import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BadgeRow = () => (
  <View style={styles.badgeRow}>
    {[1, 2, 3].map((i) => (
      <View key={i} style={styles.badge}>
        <Text style={styles.badgeEmoji}>🧑‍🚀</Text>
        <Text style={styles.badgeText}>€5</Text>
      </View>
    ))}
  </View>
);

const BoostsScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Pattern */}
      <View style={styles.patternContainer}>
        {[1, 2, 3, 4, 5].map((row) => (
          <BadgeRow key={row} />
        ))}
      </View>

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

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Boosts</Text>
          <Ionicons name="flash" size={32} color="#F8F9FB" />
        </View>

        <Text style={styles.subtitle}>
          For an hour be the most reviewed profile in your category and get much more chance to connect with other like minded profiles.
        </Text>

        {/* Options */}
        <Text style={styles.selectTitle}>Select your offer</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.optionCard, selectedOption === 0 && styles.selectedOption]}
            onPress={() => setSelectedOption(0)}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionText}>1 Boost</Text>
              <Text style={styles.priceText}>$7</Text>
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
              <Text style={styles.optionText}>15 Boosts</Text>
              <Text style={styles.priceText}>$6/each</Text>
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
                <Text style={styles.optionText}>30 Boosts</Text>
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most popular</Text>
                </View>
              </View>
              <Text style={styles.priceText}>$5/each</Text>
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
    backgroundColor: '#A19375',
  } as ViewStyle,
  patternContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    gap: 8,
    padding: 8,
  } as ViewStyle,
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  } as ViewStyle,
  badge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
    borderRadius: 100,
    paddingVertical: 8,
    gap: 4,
  } as ViewStyle,
  badgeEmoji: {
    fontSize: 16,
  } as TextStyle,
  badgeText: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    color: '#F8F9FB',
  } as TextStyle,
  scrollView: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  } as ViewStyle,
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  } as ViewStyle,
  logoContainer: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginBottom: 16,
  } as ViewStyle,
  logoText: {
    fontFamily: 'Clash Display',
    fontSize: 48,
    fontWeight: '600',
    color: '#F8F9FB',
    textAlign: 'center',
  } as TextStyle,
  brandName: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
    textAlign: 'center',
    marginBottom: 48,
  } as TextStyle,
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  } as ViewStyle,
  title: {
    fontFamily: 'Clash Display',
    fontSize: 40,
    fontWeight: '600',
    color: '#F8F9FB',
  } as TextStyle,
  subtitle: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    color: '#262626',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  } as TextStyle,
  selectTitle: {
    fontFamily: 'Clash Display',
    fontSize: 24,
    fontWeight: '600',
    color: '#F8F9FB',
    marginBottom: 24,
  } as TextStyle,
  optionsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  } as ViewStyle,
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#404040',
    padding: 20,
  } as ViewStyle,
  selectedOption: {
    borderColor: '#F8F9FB',
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
    fontSize: 20,
    fontWeight: '500',
    color: '#F8F9FB',
  } as TextStyle,
  popularBadge: {
    backgroundColor: '#A19375',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
  } as ViewStyle,
  popularBadgeText: {
    fontFamily: 'Clash Display',
    fontSize: 12,
    fontWeight: '500',
    color: '#262626',
  } as TextStyle,
  priceText: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    color: '#F8F9FB',
  } as TextStyle,
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  radioButtonSelected: {
    borderColor: '#F8F9FB',
  } as ViewStyle,
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F8F9FB',
  } as ViewStyle,
  confirmButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#F8F9FB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  } as ViewStyle,
  confirmText: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  } as TextStyle,
  terms: {
    fontFamily: 'Clash Display',
    fontSize: 10,
    color: '#262626',
    textAlign: 'center',
    lineHeight: 14,
  } as TextStyle,
});

export default BoostsScreen; 