import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated as RNAnimated, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.45; // Tinder uses a larger threshold
const SWIPE_OUT_DURATION = 250;
const ROTATION_ANGLE = 12; // Tinder's rotation angle

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

  // Animation values with better initial values for smoother transitions
  const position = useRef(new RNAnimated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
    extrapolate: 'clamp'
  });
  const likeOpacity = useRef(new RNAnimated.Value(0)).current;
  const nopeOpacity = useRef(new RNAnimated.Value(0)).current;
  const nextCardScale = useRef(new RNAnimated.Value(0.9)).current;
  const nextCardOpacity = useRef(new RNAnimated.Value(0.8)).current;

  // Reset animation state
  const resetAnimationState = () => {
    position.setValue({ x: 0, y: 0 });
    likeOpacity.setValue(0);
    nopeOpacity.setValue(0);
    nextCardScale.setValue(0.9);
    nextCardOpacity.setValue(0.8);
  };

  // Force card to swipe out
  const forceSwipe = (direction: 'right' | 'left' | 'up') => {
    if (swiping) return;
    setSwiping(true);

    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : direction === 'left' ? -SCREEN_WIDTH * 1.5 : 0;
    const y = direction === 'up' ? -SCREEN_HEIGHT * 1.5 : 0;

    // Animate card out with simpler animation
    RNAnimated.timing(position, {
      toValue: { x, y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true
    }).start(() => {
      // Reset position immediately
      position.setValue({ x: 0, y: 0 });
      
      // Update index after animation completes
      setCurrentIndex(prevIndex => {
        // Ensure we don't go out of bounds
        return (prevIndex + 1) % profiles.length;
      });
      
      // Reset animation values
      likeOpacity.setValue(0);
      nopeOpacity.setValue(0);
      nextCardScale.setValue(0.9);
      nextCardOpacity.setValue(0.8);
      
      // Allow swiping again
      setSwiping(false);
    });
  };

  // Get card style based on index
  const getCardStyle = (index: number) => {
    if (index < currentIndex) return null;
    if (index > currentIndex + 1) return null;

    if (index === currentIndex) {
      // Current card
      const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
        extrapolate: 'clamp'
      });

      return {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate }
        ],
        zIndex: profiles.length - index
      };
    } else {
      // Next card
      return {
        transform: [
          { scale: nextCardScale }
        ],
        opacity: nextCardOpacity,
        zIndex: profiles.length - index
      };
    }
  };

  // Handle gesture movement
  const handleGestureEvent = RNAnimated.event(
    [{ nativeEvent: { translationX: position.x, translationY: position.y } }],
    { useNativeDriver: true }
  );

  // Handle gesture state changes
  const handleStateChange = (event: any) => {
    const { nativeEvent } = event;

    if (nativeEvent.state === State.BEGAN) {
      setSwiping(true);
    }
    else if (nativeEvent.state === State.ACTIVE) {
      const { translationX } = nativeEvent;
      
      // Update like/nope labels with smoother transitions
      if (translationX > 0) {
        // LIKE
        const progress = Math.min(translationX / SWIPE_THRESHOLD, 1);
        likeOpacity.setValue(progress);
        nopeOpacity.setValue(0);
      } else if (translationX < 0) {
        // NOPE
        const progress = Math.min(-translationX / SWIPE_THRESHOLD, 1);
        nopeOpacity.setValue(progress);
        likeOpacity.setValue(0);
      }
      
      // Update next card scale based on current card movement
      const absX = Math.abs(translationX);
      const progress = Math.min(absX / (SCREEN_WIDTH * 0.3), 1);
      nextCardScale.setValue(0.9 + (progress * 0.1));
      nextCardOpacity.setValue(0.8 + (progress * 0.2));
    }
    else if (nativeEvent.oldState === State.ACTIVE) {
      const { translationX, translationY, velocityX, velocityY } = nativeEvent;

      // Tinder-like swipe detection with better thresholds
      const hasHighVelocity = Math.abs(velocityX) > 800;
      const hasMetThreshold = Math.abs(translationX) > SWIPE_THRESHOLD;
      const isQuickSwipe = Math.abs(velocityX) > 300 && Math.abs(translationX) > SCREEN_WIDTH * 0.2;
      
      if (hasHighVelocity || hasMetThreshold || isQuickSwipe) {
        // Swipe left or right
        forceSwipe(translationX > 0 ? 'right' : 'left');
      }
      else if (translationY < -SCREEN_HEIGHT * 0.15 && Math.abs(translationX) < SCREEN_WIDTH * 0.15) {
        // Super like (up swipe)
        forceSwipe('up');
      }
      else {
        // Return to center with spring animation
        RNAnimated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 40,
          useNativeDriver: true
        }).start(() => {
          // Reset labels
          RNAnimated.parallel([
            RNAnimated.timing(likeOpacity, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true
            }),
            RNAnimated.timing(nopeOpacity, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true
            }),
            RNAnimated.spring(nextCardScale, {
              toValue: 0.9,
              friction: 5,
              tension: 40,
              useNativeDriver: true
            }),
            RNAnimated.spring(nextCardOpacity, {
              toValue: 0.8,
              friction: 5,
              tension: 40,
              useNativeDriver: true
            })
          ]).start(() => {
            setSwiping(false);
          });
        });
      }
    }
  };

  const renderCards = () => {
    if (initialLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    // Create a simple array of visible cards
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

    return (
      <View style={styles.cardContainer} pointerEvents="box-none">
        {visibleCards.map(({ profile, index, isTopCard }) => {
          const cardStyle = isTopCard ? {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: position.x.interpolate({
                  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                  outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
                  extrapolate: 'clamp'
                })
              }
            ],
            zIndex: 10
          } : {
            transform: [
              { scale: nextCardScale }
            ],
            opacity: nextCardOpacity,
            zIndex: 5
          };

          if (isTopCard) {
            return (
              <PanGestureHandler
                key={`top-${profile.id}`}
                onGestureEvent={handleGestureEvent}
                onHandlerStateChange={handleStateChange}
                minDist={5}
                enabled={!swiping}
              >
                <RNAnimated.View 
                  style={[
                    styles.card,
                    cardStyle,
                    {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 10
                    }
                  ]}
                >
                  {renderCardContent(profile, true)}
                </RNAnimated.View>
              </PanGestureHandler>
            );
          }

          return (
            <RNAnimated.View 
              key={`card-${profile.id}`}
              style={[
                styles.card, 
                cardStyle,
                { 
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5
                }
              ]}
              pointerEvents="none"
            >
              {renderCardContent(profile, false)}
            </RNAnimated.View>
          );
        }).reverse()}
      </View>
    );
  };

  // Update card rendering to use fade in animation for smoother transitions
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
            <RNAnimated.View 
              style={[
                styles.overlayLabel, 
                styles.likeLabel,
                { opacity: likeOpacity }
              ]}
            >
              <Text style={[styles.overlayText, { color: '#00CC00' }]}>LIKE</Text>
            </RNAnimated.View>
            
            <RNAnimated.View 
              style={[
                styles.overlayLabel, 
                styles.nopeLabel,
                { opacity: nopeOpacity }
              ]}
            >
              <Text style={[styles.overlayText, { color: '#FF0000' }]}>NOPE</Text>
            </RNAnimated.View>
          </>
        )}
        
        {/* Enhanced gradient overlays for smoother transitions */}
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'transparent']}
          locations={[0, 0.25, 0.5, 1]}
          style={styles.overlayTop}
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.overlayBottom}
        />

        {/* Add opacity animation for content to reduce flashing */}
        <RNAnimated.View style={[styles.cardContent, { opacity: isLoaded ? 1 : 0 }]}>
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
                    style={[styles.matchAvatar, { zIndex: 3 - i }]}
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
        </RNAnimated.View>
      </>
    );
  };

  // Preload all profile images at once to eliminate flashing
  useEffect(() => {
    // Start with placeholder images loaded
    const initialLoadedState = profiles.reduce((acc, profile) => {
      acc[profile.id] = false;
      return acc;
    }, {} as {[key: string]: boolean});
    
    setImagesLoaded(initialLoadedState);
    
    const preloadImages = async () => {
      // Create array of prefetch promises
      const imageLoadPromises = profiles.map(profile => {
        if (profile.image) {
          return Image.prefetch(profile.image)
            .then(() => {
              setImagesLoaded(prev => ({...prev, [profile.id]: true}));
              return true;
            })
            .catch(err => {
              console.log('Image prefetch error:', err);
              // Still mark as loaded to avoid hanging
              setImagesLoaded(prev => ({...prev, [profile.id]: true}));
              return false;
            });
        }
        return Promise.resolve(true);
      });
      
      // Wait for all promises to resolve
      await Promise.all(imageLoadPromises);
      
      // Set loading complete
      setTimeout(() => {
        setInitialLoading(false);
      }, 200); // Short delay to ensure smooth transition
    };
    
    preloadImages();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Background gradient */}
        <LinearGradient
          colors={['#733B2C', '#121212']}
          locations={[0.2, 0.7]}
          style={styles.hero}
        />
        
        {/* Header */}
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
        
        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rewindButton]}
            onPress={() => !swiping && forceSwipe('left')}
          >
            <Ionicons name="play-skip-back" size={24} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.nopeButton]}
            onPress={() => !swiping && forceSwipe('left')}
          >
            <Ionicons name="close" size={40} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.superLikeButton]}
            onPress={() => !swiping && forceSwipe('up')}
          >
            <Ionicons name="arrow-up" size={40} color="#121212" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => !swiping && forceSwipe('right')}
          >
            <Ionicons name="heart" size={40} color="#121212" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.boostButton]}>
            <Ionicons name="flash" size={24} color="#121212" />
          </TouchableOpacity>
        </View>
        
        {/* Cards Container - Rendered last to be on top */}
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
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subgreeting: {
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Abril Fatface',
    fontSize: 44,
    lineHeight: 60,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
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
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  distanceText: {
    fontFamily: 'Poppins',
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
    marginLeft: -8,
  },
  matchesText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#FFFFFF',
  },
  viewsText: {
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#FFFFFF',
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
    fontFamily: 'Poppins',
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
    transform: [{ rotate: '-180deg' }],
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
});
