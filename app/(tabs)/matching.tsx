import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
  interpolate,
  Extrapolate,
  withTiming,
  useDerivedValue,
  cancelAnimation,
  useAnimatedReaction
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { GestureDetector, Gesture, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;
const SWIPE_OUT_DURATION = 250;
const ROTATION_ANGLE = 8;

type Profile = {
  id: string;
  name: string;
  type: 'band' | 'artist';
  location: string;
  distance: number;
  matchPercent: number;
  genres: string[];
  commonMatches: number;
  bio?: string;
  image?: string;
  monthlyViews?: number;
};

export default function MatchingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [swiping, setSwiping] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [profiles] = useState<Profile[]>([
    {
      id: 'square-123',
      name: 'Square',
      type: 'band',
      location: 'Los Angeles, CA',
      distance: 33,
      matchPercent: 64,
      genres: ['Blues', 'Rock', 'Soul'],
      commonMatches: 4,
      bio: 'Lead guitarist looking for a band. Into classic rock and blues.',
      image: 'https://picsum.photos/400/600',
      monthlyViews: 528
    },
    {
      id: 'sarah-456',
      name: 'Sarah Connor',
      type: 'artist',
      location: 'San Francisco, CA',
      distance: 15,
      matchPercent: 78,
      genres: ['Jazz', 'Soul', 'R&B'],
      commonMatches: 2,
      bio: 'Vocalist seeking band members. Love jazz and soul music.',
      image: 'https://picsum.photos/400/601',
      monthlyViews: 412
    },
    {
      id: 'groove-789',
      name: 'Groove Machine',
      type: 'band',
      location: 'Seattle, WA',
      distance: 45,
      matchPercent: 92,
      genres: ['Funk', 'Jazz', 'Electronic'],
      commonMatches: 6,
      bio: 'Electronic funk band looking for keyboardist.',
      image: 'https://picsum.photos/400/602',
      monthlyViews: 743
    }
  ]);

  // Animated values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const likeOpacity = useSharedValue(0);
  const nopeOpacity = useSharedValue(0);
  const nextCardScale = useSharedValue(0.92);
  const nextCardOpacity = useSharedValue(0.85);

  // Reset animation state
  const resetAnimationState = () => {
    translateX.value = 0;
    translateY.value = 0;
    likeOpacity.value = 0;
    nopeOpacity.value = 0;
    nextCardScale.value = 0.92;
    nextCardOpacity.value = 0.85;
  };

  // Animate next card to become the top card
  const animateNextCard = () => {
    nextCardScale.value = withSpring(1, {
      damping: 12,
      stiffness: 80,
      mass: 0.6,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2
    });
    nextCardOpacity.value = withSpring(1, {
      damping: 12,
      stiffness: 80,
      mass: 0.6,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2
    });
  };

  // Force swipe in a direction
  const forceSwipe = (direction: 'right' | 'left' | 'up') => {
    if (swiping) return;
    setSwiping(true);
    
    // Cancel any ongoing animations
    cancelAnimation(translateX);
    cancelAnimation(translateY);
    
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : direction === 'left' ? -SCREEN_WIDTH * 1.5 : 0;
    const y = direction === 'up' ? -SCREEN_HEIGHT * 1.5 : 0;

    // Show appropriate indicator
    if (direction === 'right') {
      likeOpacity.value = withTiming(1, { duration: 150 });
    } else if (direction === 'left') {
      nopeOpacity.value = withTiming(1, { duration: 150 });
    }

    // Start animating the next card
    animateNextCard();

    // Animate the card out
    translateX.value = withSpring(
      x, 
      {
        damping: 12,
        stiffness: 80,
        mass: 0.5,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2
      },
      () => {
        runOnJS(handleSwipeComplete)(direction);
      }
    );

    if (direction === 'up') {
      translateY.value = withSpring(
        y, 
        {
          damping: 12,
          stiffness: 80,
          mass: 0.5,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2
        }
      );
    }
  };

  // Handle swipe completion
  const handleSwipeComplete = (direction: 'right' | 'left' | 'up') => {
    // Reset position
    translateX.value = 0;
    translateY.value = 0;
    
    // Update index
    setCurrentIndex(prevIndex => (prevIndex + 1) % profiles.length);
    
    // Reset other animated values
    likeOpacity.value = 0;
    nopeOpacity.value = 0;
    nextCardScale.value = 0.92;
    nextCardOpacity.value = 0.85;
    
    // Allow new swipes after a short delay
    setTimeout(() => setSwiping(false), 50);
  };

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setSwiping)(true);
    })
    .onUpdate((event) => {
      // Update position
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      
      // Update indicators
      if (event.translationX > 20) {
        likeOpacity.value = Math.min(event.translationX / (SWIPE_THRESHOLD * 1.2), 1);
        nopeOpacity.value = 0;
      } else if (event.translationX < -20) {
        nopeOpacity.value = Math.min(-event.translationX / (SWIPE_THRESHOLD * 1.2), 1);
        likeOpacity.value = 0;
      } else {
        likeOpacity.value = 0;
        nopeOpacity.value = 0;
      }
      
      // Update next card
      const absX = Math.abs(event.translationX);
      const progress = Math.min(absX / (SCREEN_WIDTH * 0.2), 1);
      nextCardScale.value = 0.92 + (progress * 0.08);
      nextCardOpacity.value = 0.85 + (progress * 0.15);
    })
    .onEnd((event) => {
      const swipeVelocityThreshold = Platform.OS === 'ios' ? 500 : 400;
      
      // Check if swipe should complete
      const hasExceededPositionThreshold = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      const hasExceededVelocityThreshold = Math.abs(event.velocityX) > swipeVelocityThreshold;
      
      if (hasExceededVelocityThreshold || hasExceededPositionThreshold) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        
        // Complete the swipe
        const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        
        translateX.value = withSpring(
          x, 
          {
            damping: 12,
            stiffness: 80,
            mass: 0.5,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            velocity: event.velocityX
          },
          () => {
            runOnJS(handleSwipeComplete)(direction);
          }
        );
      } else {
        // Return to center with spring animation
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
          mass: 0.5,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          velocity: event.velocityX
        });
        
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
          mass: 0.5,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          velocity: event.velocityY
        });
        
        // Fade out indicators
        likeOpacity.value = withTiming(0, { duration: 150 });
        nopeOpacity.value = withTiming(0, { duration: 150 });
        
        // Return next card to original state
        nextCardScale.value = withSpring(0.92, {
          damping: 15,
          stiffness: 150,
          mass: 0.5
        });
        
        nextCardOpacity.value = withSpring(0.85, {
          damping: 15,
          stiffness: 150,
          mass: 0.5
        });
        
        // Allow new swipes
        runOnJS(setSwiping)(false);
      }
    })
    .onFinalize(() => {
      // Ensure swiping state is reset if gesture is interrupted
      if (swiping) {
        runOnJS(setSwiping)(false);
      }
    });

  // Animated styles for the top card
  const cardAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotateValue}deg` }
      ]
    };
  });

  // Animated styles for the next card
  const nextCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: nextCardScale.value }
      ],
      opacity: nextCardOpacity.value
    };
  });

  // Render cards
  const renderCards = () => {
    if (initialLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    // Create array of visible cards
    const visibleCards = [];
    
    // Add current card if available
    if (currentIndex < profiles.length) {
      visibleCards.push({
        profile: profiles[currentIndex],
        index: currentIndex,
        isTopCard: true
      });
    }
    
    // Add next card if available
    if (currentIndex + 1 < profiles.length) {
      visibleCards.push({
        profile: profiles[currentIndex + 1],
        index: currentIndex + 1,
        isTopCard: false
      });
    }
    
    // If we've reached the end, add the first card as the next card
    if (currentIndex + 1 >= profiles.length && profiles.length > 1) {
      visibleCards.push({
        profile: profiles[0],
        index: 0,
        isTopCard: false
      });
    }

    // No cards? Show empty state
    if (visibleCards.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No more profiles</Text>
        </View>
      );
    }

    return (
      <View style={styles.cardContainer} pointerEvents="box-none">
        {visibleCards.map(({ profile, index, isTopCard }) => {
          if (isTopCard) {
            return (
              <GestureDetector key={`card-${profile.id}`} gesture={panGesture}>
                <Animated.View 
                  style={[
                    styles.card,
                    cardAnimatedStyle,
                    {
                      zIndex: 10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 10
                    }
                  ]}
                >
                  {renderCardContent(profile, true)}
                </Animated.View>
              </GestureDetector>
            );
          }

          return (
            <Animated.View 
              key={`card-${profile.id}`}
              style={[
                styles.card, 
                nextCardAnimatedStyle,
                { 
                  zIndex: profiles.length - index,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                  marginTop: 6
                }
              ]}
              pointerEvents="none"
            >
              {renderCardContent(profile, false)}
            </Animated.View>
          );
        }).reverse()}
      </View>
    );
  };

  // Render card content
  const renderCardContent = (profile: Profile, isTopCard: boolean) => {
    const isLoaded = imagesLoaded[profile.id];
    
    return (
      <>
        <Image
          source={{ uri: profile.image }}
          style={styles.cardBackground}
          resizeMode="cover"
          fadeDuration={0}
          onLoad={() => {
            if (!imagesLoaded[profile.id]) {
              setImagesLoaded(prev => ({...prev, [profile.id]: true}));
            }
          }}
        />
        
        {isTopCard && (
          <>
            <Animated.View 
              style={[
                styles.overlayLabel, 
                styles.likeLabel,
                { opacity: likeOpacity }
              ]}
              pointerEvents="none"
            >
              <Text style={[styles.overlayText, { color: '#00CC00' }]}>LIKE</Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.overlayLabel, 
                styles.nopeLabel,
                { opacity: nopeOpacity }
              ]}
              pointerEvents="none"
            >
              <Text style={[styles.overlayText, { color: '#FF0000' }]}>NOPE</Text>
            </Animated.View>
          </>
        )}
        
        <LinearGradient
          colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'transparent']}
          locations={[0, 0.25, 0.5, 1]}
          style={styles.overlayTop}
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.85)']}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.overlayBottom}
        />

        <Animated.View style={[styles.cardContent, { opacity: isLoaded ? 1 : 0 }]}>
          <View style={styles.verifiedContainer}>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={24} color="#0D72EA" />
              <Text style={styles.verifiedTextBadge}>
                {profile.type === 'band' ? 'VERIFIED BAND' : 'VERIFIED ARTIST'}
              </Text>
            </View>
            <View style={styles.matchPercent}>
              <Text style={styles.matchPercentText}>{profile.matchPercent}%</Text>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.nameText}>{profile.name}</Text>
            
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#FFFFFF" />
              <Text style={styles.locationText}>{profile.location}</Text>
              <Text style={styles.distanceText}>{profile.distance} km</Text>
            </View>
            
            <View style={styles.matchesContainer}>
              <View style={styles.avatarsContainer}>
                {[1, 2, 3].map((_, i) => (
                  <Image
                    key={i}
                    source={{ uri: `https://picsum.photos/24/24?random=${i}` }}
                    style={[styles.matchAvatar, { zIndex: 3 - i, marginLeft: i > 0 ? -8 : 0 }]}
                    fadeDuration={0}
                  />
                ))}
              </View>
              <Text style={styles.matchesText}>
                {profile.commonMatches} matches in common
              </Text>
            </View>
            
            <Text style={styles.viewsText}>
              {profile.monthlyViews} monthly profile views
            </Text>
            
            <View style={styles.genresContainer}>
              {profile.genres.map((genre, i) => (
                <View key={i} style={styles.genreChip}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.bioContainer}>
              <Text style={styles.bioText} numberOfLines={2}>
                {profile.bio}
              </Text>
              <TouchableOpacity 
                style={styles.moreButton}
                onPress={() => {
                  const route = profile.type === 'band' ? '/band-profile' : '/artist-profile';
                  router.push({
                    pathname: route,
                    params: { id: profile.id }
                  });
                }}
              >
                <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </>
    );
  };

  // Preload images
  useEffect(() => {
    const initialLoadedState = profiles.reduce((acc, profile) => {
      acc[profile.id] = false;
      return acc;
    }, {} as {[key: string]: boolean});
    
    setImagesLoaded(initialLoadedState);
    
    const preloadImages = async () => {
      const imageLoadPromises = profiles.map(profile => {
        if (profile.image) {
          return Image.prefetch(profile.image)
            .then(() => {
              setImagesLoaded(prev => ({...prev, [profile.id]: true}));
              return true;
            })
            .catch(err => {
              console.log('Image prefetch error:', err);
              setImagesLoaded(prev => ({...prev, [profile.id]: true}));
              return false;
            });
        }
        return Promise.resolve(true);
      });
      
      try {
        await Promise.all(imageLoadPromises);
      } catch (error) {
        console.log('Error preloading images:', error);
        profiles.forEach(profile => {
          setImagesLoaded(prev => ({...prev, [profile.id]: true}));
        });
      }
      
      setTimeout(() => {
        setInitialLoading(false);
        
        // Reset animations
        translateX.value = 0;
        translateY.value = 0;
        likeOpacity.value = 0;
        nopeOpacity.value = 0;
        nextCardScale.value = 0.92;
        nextCardOpacity.value = 0.85;
      }, 300);
    };
    
    preloadImages();
    
    // Cleanup
    return () => {
      translateX.value = 0;
      translateY.value = 0;
      likeOpacity.value = 0;
      nopeOpacity.value = 0;
      nextCardScale.value = 0.92;
      nextCardOpacity.value = 0.85;
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient
          colors={['#733B2C', '#121212']}
          locations={[0.2, 0.7]}
          style={styles.hero}
        />
        
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: 'https://picsum.photos/32/32' }}
                style={styles.userAvatar}
              />
              <View style={styles.userTexts}>
                <Text style={styles.greeting}>Hi Viktor 👋</Text>
                <Text style={styles.subgreeting}>Hope you had a great day!</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={28} color="rgba(255, 255, 255, 0.48)" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="menu-outline" size={28} color="rgba(255, 255, 255, 0.48)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rewindButton]}
            onPress={() => {
              if (!swiping && currentIndex > 0) {
                setSwiping(true);
                setCurrentIndex(currentIndex - 1);
                
                // Reset animation values
                translateX.value = 0;
                translateY.value = 0;
                likeOpacity.value = 0;
                nopeOpacity.value = 0;
                nextCardScale.value = 0.92;
                nextCardOpacity.value = 0.85;
                
                setTimeout(() => setSwiping(false), 300);
              }
            }}
          >
            <Ionicons name="play-skip-back" size={24} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.nopeButton]}
            onPress={() => !swiping && forceSwipe('left')}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={40} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.superLikeButton]}
            onPress={() => !swiping && forceSwipe('up')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-up" size={40} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => !swiping && forceSwipe('right')}
            activeOpacity={0.7}
          >
            <Ionicons name="heart" size={40} color="#121212" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.boostButton]}
            activeOpacity={0.7}
          >
            <Ionicons name="flash" size={24} color="#121212" />
          </TouchableOpacity>
        </View>
        
        {renderCards()}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  hero: {
    flex: 1,
    backgroundColor: '#733B2C',
    paddingTop: 100,
  },
  cardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9000,
    elevation: 9000,
    paddingBottom: 100, // More space at bottom for buttons
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.62,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333', // Fallback color while image loads
    elevation: 9999,
  },
  overlayLabel: {
    position: 'absolute',
    padding: 10,
    borderWidth: 4,
    borderRadius: 10,
    zIndex: 2,
  },
  likeLabel: {
    top: 20,
    left: 20,
    borderColor: '#00CC00',
    transform: [{ rotate: '-30deg' }],
  },
  nopeLabel: {
    top: 20,
    right: 20,
    borderColor: '#FF0000',
    transform: [{ rotate: '30deg' }],
  },
  overlayText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: 104,
    left: 0,
    top: 0,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 267,
    height: 32,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 17,
  },
  userTexts: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    width: 150,
    height: 28,
  },
  greeting: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subgreeting: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: 76,
    height: 28,
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    width: '100%',
    height: 32,
    zIndex: 2,
  },
  titleWithImg: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedIcon: {
    width: 24,
    height: 24,
  },
  titleTexts: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  verifiedText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  matchPercentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
    borderRadius: 100,
  },
  percentText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    zIndex: 2,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  nameText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 44,
    lineHeight: 60,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  distanceText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.64,
  },
  matchesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  matchAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  matchesText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
  },
  viewsText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  genreChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    borderRadius: 16,
  },
  genreText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bioText: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
  moreButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedTextBadge: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  matchPercent: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
  },
  matchPercentText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    zIndex: 8000,
    elevation: 8000,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  rewindButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FF4B4B',
    transform: [{ rotate: '-180deg' }],
  },
  nopeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#F41857',
  },
  superLikeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#007AFF',
    transform: [{ rotate: '-90deg' }],
  },
  likeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#1ED760',
  },
  boostButton: {
    width: 48,
    height: 48,
    backgroundColor: '#8400E7',
    transform: [{ rotate: '-180deg' }],
  },
  overlayTop: {
    position: 'absolute',
    width: '100%',
    height: 120,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  overlayBottom: {
    position: 'absolute',
    width: '100%',
    height: 280,
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333', // Add background color to prevent transparent flashing
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    zIndex: 10000,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
