import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function MatchesScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleDislike = () => {
    console.log('Dislike');
  };

  const handleInfo = () => {
    console.log('Info');
  };

  const handleLike = () => {
    console.log('Like');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.greeting}>Hi Viktor 👋</Text>
            <Text style={styles.subGreeting}>Hope you had a great day!</Text>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Content */}
      <View style={styles.profileContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.bandName}>Square</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>@ Los Angeles, CA</Text>
            <Text style={styles.distanceText}>33 km</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>VERIFIED ARTIST/BAND</Text>
          </View>
        </View>

        <View style={styles.genreContainer}>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>Blues</Text>
          </View>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>Soul</Text>
          </View>
        </View>

        <Text style={styles.bio}>
          Lead guitarist looking for a band. Into classic rock and blues.
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.dislikeButton]} 
            onPress={handleDislike}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.infoButton]} 
            onPress={handleInfo}
          >
            <Ionicons name="information" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]} 
            onPress={handleLike}
          >
            <Ionicons name="checkmark" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#828282" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="calendar-outline" size={24} color="#828282" />
          <Text style={styles.tabLabel}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.matchesIconContainer}>
            <View style={styles.matchesIcon} />
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#828282" />
          <Text style={styles.tabLabel}>Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
  subGreeting: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  menuButton: {
    padding: 8,
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  bandName: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
  },
  distanceText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginLeft: 8,
  },
  verifiedBadge: {
    backgroundColor: '#0D72EA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  genreContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
  },
  bio: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 32,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#F41857',
  },
  infoButton: {
    backgroundColor: '#007AFF',
  },
  likeButton: {
    backgroundColor: '#1ED760',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#828282',
    fontSize: 10,
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#fff',
  },
  matchesIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchesIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
  },
});
