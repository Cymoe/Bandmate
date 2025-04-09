import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Modal,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import Swiper from 'react-native-deck-swiper';
import DislikeButton from '../components/ui/DislikeButton';
import InfoButton from '../components/ui/InfoButton';
import LikeButton from '../components/ui/LikeButton';
import HomeIcon from '../components/ui/HomeIcon';
import EventsIcon from '../components/ui/EventsIcon';
import MatchesIcon from '../components/ui/MatchesIcon';
import ChatIcon from '../components/ui/ChatIcon';
import FilterIcon from '../components/ui/FilterIcon';
import MenuIcon from '../components/ui/MenuIcon';
import NotificationIcon from '../components/ui/NotificationIcon';
import TabBar from '../components/navigation/TabBar';

const { width, height } = Dimensions.get('window');

// Define profile type
interface Profile {
  id: string;
  name: string;
  image: any;
  location: string;
  distance: string;
  views: string;
  tags: string[];
  bio: string;
  verified: boolean;
}

// Dummy data for profiles
const profiles: Profile[] = [
  {
    id: '1',
    name: 'Square',
    image: require('../assets/images/avatar.png'),
    location: 'Los Angeles, CA',
    distance: '33 km',
    views: '528 monthly profile views',
    tags: ['Blues', 'Rock', 'Soul'],
    bio: 'Lead guitarist looking for a band. Into classic rock and blues.',
    verified: true,
  },
  {
    id: '2',
    name: 'The Echoes',
    image: require('../assets/images/avatar.png'),
    location: 'San Francisco, CA',
    distance: '45 km',
    views: '342 monthly profile views',
    tags: ['Indie', 'Alternative', 'Pop'],
    bio: 'Indie band looking for a drummer. We have gigs lined up for summer.',
    verified: true,
  },
  {
    id: '3',
    name: 'Melody Masters',
    image: require('../assets/images/avatar.png'),
    location: 'San Diego, CA',
    distance: '28 km',
    views: '621 monthly profile views',
    tags: ['Jazz', 'Funk', 'Soul'],
    bio: 'Jazz ensemble seeking saxophone player. Professional gigs and studio sessions.',
    verified: false,
  },
];

export default function MatchingScreen() {
  const swiperRef = useRef<Swiper<Profile>>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [overlayLabel, setOverlayLabel] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  // Animation values
  const matchAnimation = useRef(new Animated.Value(0)).current;

  const renderCard = (profile: Profile, index: number) => {
    return (
      <View style={styles.profileCard}>
        <Image source={profile.image} style={styles.profileImage} />

        {/* Verified badge at top */}
        {profile.verified && (
          <View style={styles.verifiedBadgeTop}>
            <View style={styles.verifiedIconContainer}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.verifiedText}>VERIFIED ARTIST/BAND</Text>
          </View>
        )}

        {/* Green overlay for LIKE */}
        {swipeDirection === 'right' && index === cardIndex && (
          <View style={styles.swipeOverlayContainer}>
            <LinearGradient
              colors={['rgba(100, 205, 117, 0)', '#64CD75']}
              style={styles.swipeOverlay}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
            />
          </View>
        )}

        {/* Red overlay for NOPE */}
        {swipeDirection === 'left' && index === cardIndex && (
          <View style={styles.swipeOverlayContainer}>
            <LinearGradient
              colors={['rgba(255, 59, 48, 0)', '#FF3B30']}
              style={styles.swipeOverlay}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
            />
          </View>
        )}

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.profileGradient}
        >
          <View style={styles.profileInfo}>
            <View style={styles.profileHeader}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>{profile.name}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                <Text style={styles.locationText}>{profile.location}</Text>
                <Text style={styles.distanceText}>{profile.distance}</Text>
              </View>
              <Text style={styles.viewsText}>{profile.views}</Text>
            </View>

            <View style={styles.tagsContainer}>
              {profile.tags.map((tag: string, idx: number) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{profile.bio}</Text>
              <View style={styles.chevronContainer}>
                <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const handleSwipe = (direction: string) => {
    if (isSwiping) return; // Prevent multiple swipes

    setIsSwiping(true);

    if (direction === 'left') {
      setOverlayLabel('nope');
      setSwipeDirection('left');
      swiperRef.current?.swipeLeft();
    } else if (direction === 'right') {
      setOverlayLabel('like');
      setSwipeDirection('right');
      swiperRef.current?.swipeRight();
    } else if (direction === 'top') {
      swiperRef.current?.swipeTop();
    }
  };

  // Function to handle match animation
  const handleMatch = (profile: Profile) => {
    setMatchedProfile(profile);
    setShowMatchModal(true);

    // Reset animation value
    matchAnimation.setValue(0);

    // Start animation
    Animated.timing(matchAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  // Match modal scale and opacity animations
  const matchScale = matchAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1.1, 1]
  });

  const matchOpacity = matchAnimation.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1]
  });

  const renderOverlay = ({ label }: { label: string }) => {
    return (
      <View style={[
        styles.overlayLabel,
        { borderColor: label === 'LIKE' ? '#4CD964' : '#FF3B30' }
      ]}>
        <Text style={[
          styles.overlayLabelText,
          { color: label === 'LIKE' ? '#4CD964' : '#FF3B30' }
        ]}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#2D1F19', '#121212']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Hi Viktor <Text style={styles.emoji}>👋</Text></Text>
            <Text style={styles.subGreeting}>Hope you had a great day!</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <NotificationIcon color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/filters')}>
            <FilterIcon color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={profiles}
          renderCard={renderCard}
          onSwiped={(cardIndex) => {
            setCardIndex(cardIndex);
            setSwipeDirection(null);
            setIsSwiping(false); // Reset swiping state when swipe is complete
          }}
          onSwipedLeft={() => setSwipeDirection('left')}
          onSwipedRight={(cardIndex) => {
            setSwipeDirection('right');

            // Simulate a match with 50% probability
            if (Math.random() > 0.5) {
              handleMatch(profiles[cardIndex]);
            }
          }}
          onSwipedAll={() => console.log('All cards swiped!')}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          stackScale={10}
          infinite={true}
          showSecondCard={true}
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#FF3B30',
                  color: '#FF3B30',
                  borderWidth: 5,
                  fontSize: 32,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#4CD964',
                  color: '#4CD964',
                  borderWidth: 5,
                  fontSize: 32,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                }
              }
            },
          }}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleSwipe('left')} style={styles.actionButton}>
          <DislikeButton />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSwipe('top')} style={styles.actionButton}>
          <InfoButton />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSwipe('right')} style={styles.actionButton}>
          <LikeButton />
        </TouchableOpacity>
      </View>

      <TabBar />

      {/* Match Modal */}
      <Modal
        transparent={true}
        visible={showMatchModal}
        animationType="none"
        onRequestClose={() => setShowMatchModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.matchContainer,
              {
                opacity: matchOpacity,
                transform: [{ scale: matchScale }]
              }
            ]}
          >
            <LinearGradient
              colors={['#FF3B30', '#121212']}
              style={styles.matchGradient}
            >
              <Text style={styles.matchTitle}>It's a Match!</Text>

              {matchedProfile && (
                <View style={styles.matchProfileContainer}>
                  <Image
                    source={require('../assets/images/avatar.png')}
                    style={styles.matchUserImage}
                  />
                  <Image
                    source={matchedProfile.image}
                    style={styles.matchProfileImage}
                  />
                </View>
              )}

              <Text style={styles.matchText}>
                You and {matchedProfile?.name} have liked each other.
              </Text>

              <View style={styles.matchButtonsContainer}>
                <TouchableOpacity 
                  style={styles.matchButton}
                  onPress={() => {
                    setShowMatchModal(false);
                    router.push('/chats');
                  }}
                >
                  <Text style={styles.matchButtonText}>Send Message</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.matchButton, styles.matchButtonOutline]}
                  onPress={() => setShowMatchModal(false)}
                >
                  <Text style={styles.matchButtonOutlineText}>Keep Swiping</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2D1F19',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  emoji: {
    fontSize: 18,
  },
  subGreeting: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  swiperContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  profileCard: {
    width: width - 40,
    height: height - 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  swipeOverlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  swipeOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  profileGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  verifiedBadgeTop: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
  },
  verifiedIconContainer: {
    backgroundColor: '#0D72EA',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
  },
  profileInfo: {
    gap: 10,
  },
  profileHeader: {
    gap: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '400',
    fontFamily: 'AbrilFatface-Regular',
  },
  verifiedBadge: {
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginRight: 8,
  },
  distanceText: {
    color: 'rgba(255, 255, 255, 0.64)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  viewsText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  bioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bioText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    flex: 1,
    marginRight: 10,
  },
  chevronContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    gap: 24,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 5,
    borderRadius: 10,
  },
  overlayLabelText: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'Poppins-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchContainer: {
    width: width - 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  matchGradient: {
    padding: 24,
    alignItems: 'center',
  },
  matchTitle: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  matchProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  matchUserImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginRight: -20,
  },
  matchProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginLeft: -20,
  },
  matchText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  matchButtonsContainer: {
    width: '100%',
    gap: 12,
  },
  matchButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  matchButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  matchButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  matchButtonOutlineText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
