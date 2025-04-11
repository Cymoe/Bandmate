import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const THEME = {
  fonts: {
    clashDisplay: 'Clash Display',
  },
  colors: {
    white: '#F8F9FB',
    gold: '#A19375',
    darkGray: '#2C2D30',
    darkerGray: '#262626',
    darkest: '#141416',
    blue: '#007AFF',
    textGray: '#828186',
  },
  radius: {
    sm: 6,
    md: 12,
    full: 100,
  },
};

const commonStyles = {
  centered: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
};

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

const RewindsScreen = () => {
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
          <Text style={styles.title}>Rewinds</Text>
          <Ionicons name="play-back" size={32} color="#F8F9FB" />
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
              <View style={styles.optionHeader}>
                <Text style={styles.optionText}>1 Rewind</Text>
                <View style={styles.tryFirstBadge}>
                  <Text style={styles.tryFirstText}>Try it first</Text>
                </View>
              </View>
              <Text style={styles.priceText}>$2</Text>
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
              <View style={styles.optionHeader}>
                <Text style={styles.optionText}>3 Rewinds</Text>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveText}>Save 33%</Text>
                </View>
              </View>
              <Text style={styles.priceText}>$1.75/each</Text>
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
                <Text style={styles.optionText}>6 Rewinds</Text>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveText}>Save 66%</Text>
                </View>
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most popular</Text>
                </View>
              </View>
              <Text style={styles.priceText}>$1/each</Text>
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

      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.overlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.27 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.darkest,
  } as ViewStyle,
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
  } as ViewStyle,
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  } as ViewStyle,
  backButton: {
    ...commonStyles.centered,
    width: 40,
    height: 40,
    borderRadius: THEME.radius.full,
    backgroundColor: THEME.colors.darkGray,
  } as ViewStyle,
  title: {
    fontFamily: THEME.fonts.clashDisplay,
    fontSize: 24,
    fontWeight: '600',
    color: THEME.colors.white,
    textAlign: 'center',
  } as TextStyle,
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    height: 56,
  } as ViewStyle,
  content: {
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingTop: 120,
  } as ViewStyle,
  optionCard: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    backgroundColor: THEME.colors.darkGray,
    borderRadius: THEME.radius.md,
    padding: 16,
    gap: 12,
  } as ViewStyle,
  selectedOption: {
    borderColor: THEME.colors.gold,
  } as ViewStyle,
  optionContent: {
    flex: 1,
  } as ViewStyle,
  optionText: {
    fontFamily: THEME.fonts.clashDisplay,
    fontSize: 16,
    color: THEME.colors.white,
  } as TextStyle,
  badgesContainer: {
    flexDirection: 'row' as const,
    gap: 4,
    marginTop: 4,
  } as ViewStyle,
  badge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: THEME.radius.full,
  } as ViewStyle,
  badgeEmoji: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.165,
  },
  badgeText: {
    fontFamily: THEME.fonts.clashDisplay,
    fontSize: 8,
    color: THEME.colors.white,
  } as TextStyle,
  priceText: {
    fontFamily: THEME.fonts.clashDisplay,
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.white,
  } as TextStyle,
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: THEME.radius.sm * 2,
    borderWidth: 1,
    borderColor: THEME.colors.darkerGray,
    backgroundColor: THEME.colors.darkest,
    ...commonStyles.centered,
  } as ViewStyle,
  radioButtonSelected: {
    borderColor: THEME.colors.gold,
  } as ViewStyle,
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: THEME.radius.sm,
    backgroundColor: THEME.colors.gold,
  } as ViewStyle,
  confirmButton: {
    backgroundColor: THEME.colors.blue,
    borderRadius: THEME.radius.md,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    marginTop: 32,
    ...commonStyles.centered,
  } as ViewStyle,
  confirmText: {
    fontFamily: THEME.fonts.clashDisplay,
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.white,
  } as TextStyle,
  terms: {
    fontFamily: THEME.fonts.clashDisplay,
    fontSize: 10,
    color: THEME.colors.textGray,
    textAlign: 'center',
    lineHeight: 12,
  } as TextStyle,
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '27%',
  } as ViewStyle,
  patternContainer: {
    position: 'absolute',
    width: 455,
    height: 366,
    left: (width - 455) / 2,
    top: 0,
    gap: 6,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2C2D30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontFamily: 'Clash Display',
    fontSize: 24,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  brandName: {
    fontFamily: 'Clash Display',
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
    borderWidth: 2,
    borderColor: '#F8F9FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#71727A',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  selectTitle: {
    fontFamily: 'Clash Display',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 16,
    letterSpacing: -0.165,
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 24,
    gap: 16,
  },
  tryFirstBadge: {
    backgroundColor: '#575093',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
  } as ViewStyle,
  tryFirstText: {
    fontFamily: 'Clash Display',
    fontSize: 12,
    fontWeight: '500',
    color: '#F8F9FB',
  } as TextStyle,
  saveBadge: {
    backgroundColor: '#1C8E46',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
  } as ViewStyle,
  saveText: {
    fontFamily: 'Clash Display',
    fontSize: 12,
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
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  } as ViewStyle,
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  } as ViewStyle,
});

export default RewindsScreen; 