import { Image, StyleSheet, View } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const BandmateLogo = () => {
  const colorScheme = useColorScheme();
  const orange = '#FF4D00';
  
  return (
    <Svg width={200} height={170} viewBox="0 0 162 140">
      <G>
        {/* White part of the note */}
        <Path 
          d="M292,752 L358,669 L358,818 C358,861.078 323.078,896 280,896 C236.922,896 202,861.078 202,818 C202,774.922 236.922,740 280,740 L292,740 L292,752 Z" 
          fill={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} 
          transform="translate(-180, -670) scale(0.9)"
        />
        {/* Orange part of the note */}
        <Path 
          d="M358,669 L424,586 L424,735 C424,778.078 389.078,813 346,813 C335.457,813 325.389,810.678 316.33,806.489 C325.395,821.512 340.497,832 358,832 C391.137,832 418,805.137 418,772 C418,738.863 391.137,712 358,712 L358,669 Z" 
          fill={orange} 
          transform="translate(-180, -670) scale(0.9)"
        />
      </G>
    </Svg>
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === 'dark' ? '#1D1D1D' : '#F5F5F5';
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: bgColor, dark: bgColor }}
      headerImage={
        <View style={styles.logoContainer}>
          <BandmateLogo />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bandmate</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="subtitle">Welcome to Bandmate!</ThemedText>
        <ThemedText>
          Your ultimate companion for music practice, collaboration, and performance.
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.featureContainer}>
        <ThemedText type="subtitle">Features</ThemedText>
        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">Practice Sessions</ThemedText>
          <ThemedText>Track your practice time and progress</ThemedText>
        </View>
        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">Setlist Manager</ThemedText>
          <ThemedText>Organize your songs and sets for gigs</ThemedText>
        </View>
        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">Band Collaboration</ThemedText>
          <ThemedText>Share notes and schedules with bandmates</ThemedText>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeContainer: {
    gap: 8,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 77, 0, 0.1)',
  },
  featureContainer: {
    gap: 16,
    marginBottom: 24,
  },
  featureItem: {
    gap: 4,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
