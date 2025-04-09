import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const { width } = Dimensions.get('window');
const LOGO_SIZE = width * 0.4;

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const opacity = new Animated.Value(1);
  const logoScale = new Animated.Value(1);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationComplete();
      });
    }, 1500);

    return () => clearTimeout(animationTimeout);
  }, []);

  const MusicNote = () => (
    <Svg width={LOGO_SIZE} height={LOGO_SIZE} viewBox="0 0 162 140">
      <G>
        {/* White part of the note */}
        <Path 
          d="M292,752 L358,669 L358,818 C358,861.078 323.078,896 280,896 C236.922,896 202,861.078 202,818 C202,774.922 236.922,740 280,740 L292,740 L292,752 Z" 
          fill="#FFFFFF" 
          transform="translate(-180, -670) scale(0.9)"
        />
        {/* Orange part of the note */}
        <Path 
          d="M358,669 L424,586 L424,735 C424,778.078 389.078,813 346,813 C335.457,813 325.389,810.678 316.33,806.489 C325.395,821.512 340.497,832 358,832 C391.137,832 418,805.137 418,772 C418,738.863 391.137,712 358,712 L358,669 Z" 
          fill="#FF4D00" 
          transform="translate(-180, -670) scale(0.9)"
        />
      </G>
    </Svg>
  );

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity }
      ]}
    >
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
        <MusicNote />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
}); 