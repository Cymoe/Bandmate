import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function BandProfileScreen() {
  // Get parameters passed to this screen
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/avatar.png')} 
              style={styles.bandImage} 
            />
            <LinearGradient
              colors={['rgba(20, 20, 20, 0.64)', 'rgba(96, 96, 96, 0)']}
              style={styles.imageGradient}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0.64 }}
            />
            
            <View style={styles.bandInfoContainer}>
              <View style={styles.bandInfo}>
                <Text style={styles.bandName}>{name}</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={12} color="#EBEAEC" />
                  <Text style={styles.locationText}>Los Angeles, CA</Text>
                  <Text style={styles.distanceText}>33 km</Text>
                </View>
              </View>
              <Text style={styles.bandSubtitle}>Band</Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.dislikeButton]}>
              <View style={styles.actionButtonIcon}>
                <Ionicons name="close" size={24} color="#121212" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
              <View style={styles.actionButtonIcon}>
                <Ionicons name="chatbubble" size={24} color="#121212" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
              <View style={styles.actionButtonIcon}>
                <Ionicons name="heart" size={24} color="#121212" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {name}</Text>
          <Text style={styles.sectionText}>
            Band with 8 years of experience. Looking to find musicians for jam sessions. 
            Influenced by rock, indie, and alternative music mostly into 90s era.
          </Text>
          <Text style={styles.ageRangeText}>Age range: 36-45 years old</Text>
        </View>
        
        <View style={styles.divider} />
        
        {/* Artist Pick Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artist pick</Text>
          <View style={styles.artistPickCard}>
            <LinearGradient
              colors={['rgba(25, 20, 20, 0.8)', 'rgba(25, 20, 20, 0)']}
              style={styles.artistPickOverlayTop}
              start={{ x: 0.75, y: 0 }}
              end={{ x: 0.25, y: 1 }}
            />
            <LinearGradient
              colors={['rgba(25, 20, 20, 0.8)', 'rgba(25, 20, 20, 0)']}
              style={styles.artistPickOverlayBottom}
              start={{ x: 0.75, y: 1 }}
              end={{ x: 0.25, y: 0 }}
            />
            
            <View style={styles.artistPickHeader}>
              <View style={styles.artistPickInfo}>
                <Image 
                  source={require('../assets/images/avatar.png')} 
                  style={styles.artistPickAvatar} 
                />
                <Text style={styles.artistPickPostedBy}>Posted by Artist</Text>
              </View>
            </View>
            
            <View style={styles.artistPickContent}>
              <View style={styles.artistPickTrack}>
                <Image 
                  source={require('../assets/images/avatar.png')} 
                  style={styles.artistPickTrackImage} 
                />
                <View style={styles.artistPickTrackInfo}>
                  <Text style={styles.artistPickTrackTitle}>Favorite song right now</Text>
                  <Text style={styles.artistPickTrackArtist}>Windshield People Don't Jam</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.languageTag}>
              <Ionicons name="language" size={16} color="#FFFFFF" />
              <Text style={styles.tagText}>English</Text>
            </View>
            <View style={styles.languageTag}>
              <Ionicons name="language" size={16} color="#FFFFFF" />
              <Text style={styles.tagText}>French</Text>
            </View>
            <View style={styles.languageTag}>
              <Ionicons name="language" size={16} color="#FFFFFF" />
              <Text style={styles.tagText}>German</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Music Style Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Music style</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Blues</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Rock</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Soul</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Instruments Section */}
        <View style={styles.section}>
          <View style={styles.instrumentSection}>
            <Text style={styles.sectionTitle}>Bass</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Beginner</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.instrumentSection}>
            <Text style={styles.sectionTitle}>Guitar</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Intermediate</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.instrumentSection}>
            <Text style={styles.sectionTitle}>Piano</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Legend</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.instrumentSection}>
            <Text style={styles.sectionTitle}>Voice</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Advanced</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Looking For Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Looking for</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Jam Sessions</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Studio time</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Gigs</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Band members</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Availability Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Weekdays</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Weekends</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Popular Releases Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <MaterialIcons name="library-music" size={20} color="#1ED760" />
              <Text style={styles.sectionTitle}>Popular releases</Text>
            </View>
            <Text style={styles.sectionHeaderRight}>Show all</Text>
          </View>
          
          <View style={styles.releasesList}>
            <View style={styles.releaseItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.releaseImage} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>Favorite song right now</Text>
                <Text style={styles.releaseArtist}>Single • Square</Text>
              </View>
            </View>
            
            <View style={styles.releaseItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.releaseImage} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>Windshield People Don't Jam</Text>
                <Text style={styles.releaseArtist}>Single • Square</Text>
              </View>
            </View>
            
            <View style={styles.releaseItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.releaseImage} 
              />
              <View style={styles.releaseInfo}>
                <Text style={styles.releaseTitle}>This Charming Man - 2011 Remaster</Text>
                <Text style={styles.releaseArtist}>Single • Square</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {/* Fan Of Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fan of</Text>
            <Text style={styles.sectionHeaderRight}>Show all</Text>
          </View>
          <View style={styles.fanOfContainer}>
            <View style={styles.fanItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.fanImage} 
              />
              <Text style={styles.fanName}>Freddie</Text>
            </View>
            
            <View style={styles.fanItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.fanImage} 
              />
              <Text style={styles.fanName}>David Bowie</Text>
            </View>
            
            <View style={styles.fanItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.fanImage} 
              />
              <Text style={styles.fanName}>Nirvana</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Songs Other Artists Like Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Songs other artists like</Text>
          <View style={styles.songsList}>
            <View style={styles.songItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.songImage} 
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>Favorite song right now</Text>
                <Text style={styles.songArtist}>Square</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={24} color="#B3B3B3" />
            </View>
            
            <View style={styles.songItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.songImage} 
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>Windshield People Don't Jam</Text>
                <Text style={styles.songArtist}>Square</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={24} color="#B3B3B3" />
            </View>
            
            <View style={styles.songItem}>
              <Image 
                source={require('../assets/images/avatar.png')} 
                style={styles.songImage} 
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>This Charming Man</Text>
                <Text style={styles.songArtist}>Square</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={24} color="#B3B3B3" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.footerAction}>
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            <Text style={styles.footerActionText}>Share this profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerAction}>
            <Ionicons name="close-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.footerActionText}>Block this profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerAction}>
            <Ionicons name="flag-outline" size={20} color="#FFFFFF" />
            <Text style={styles.footerActionText}>Report this profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Connect Button */}
        <View style={styles.connectButtonContainer}>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    width: '100%',
    height: 462,
  },
  imageContainer: {
    width: '100%',
    height: 390,
    position: 'relative',
    backgroundColor: '#814734',
  },
  bandImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  bandInfoContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  bandInfo: {
    marginBottom: 8,
  },
  bandName: {
    fontFamily: 'Abril Fatface',
    fontSize: 44,
    lineHeight: 60,
    color: '#FFFFFF',
    letterSpacing: -2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  distanceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.64,
    marginLeft: 4,
  },
  bandSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginTop: 12,
    gap: 16,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#F41857',
    transform: [{ rotate: '180deg' }],
  },
  messageButton: {
    backgroundColor: '#007AFF',
    transform: [{ rotate: '-90deg' }],
  },
  likeButton: {
    backgroundColor: '#1ED760',
  },
  actionButtonIcon: {
    transform: [{ rotate: '180deg' }],
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#262626',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    lineHeight: 21,
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  sectionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  ageRangeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#B3B3B3',
  },
  artistPickCard: {
    width: '100%',
    height: 261,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#191414',
  },
  artistPickOverlayTop: {
    position: 'absolute',
    width: '100%',
    height: 79,
    top: 0,
    opacity: 0.7,
    zIndex: 1,
  },
  artistPickOverlayBottom: {
    position: 'absolute',
    width: '100%',
    height: 97,
    bottom: 0,
    opacity: 0.7,
    zIndex: 1,
  },
  artistPickHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    zIndex: 2,
  },
  artistPickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  artistPickAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  artistPickPostedBy: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  artistPickContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  artistPickTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  artistPickTrackImage: {
    width: 54,
    height: 54,
  },
  artistPickTrackInfo: {
    justifyContent: 'center',
  },
  artistPickTrackTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  artistPickTrackArtist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: '#313131',
    borderRadius: 16,
  },
  languageTag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: '#313131',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  instrumentSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderRight: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: '#B3B3B3',
  },
  releasesList: {
    gap: 8,
  },
  releaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
  },
  releaseImage: {
    width: 80,
    height: 80,
  },
  releaseInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 16,
  },
  releaseTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    lineHeight: 21,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  releaseArtist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: '#B3B3B3',
  },
  showMoreButton: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 16,
    marginTop: 16,
  },
  showMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  fanOfContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  fanItem: {
    alignItems: 'center',
    gap: 8,
  },
  fanImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  fanName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  songsList: {
    gap: 8,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
  },
  songImage: {
    width: 48,
    height: 48,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  songArtist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 17,
    color: '#B3B3B3',
  },
  footerActions: {
    padding: 32,
    gap: 8,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
    marginBottom: 8,
    gap: 10,
  },
  footerActionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  connectButtonContainer: {
    width: '100%',
    height: 130,
    backgroundColor: 'rgba(18, 18, 18, 0.16)',
    backdropFilter: 'blur(2px)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 16,
  },
  connectButton: {
    paddingVertical: 10,
    paddingHorizontal: 64,
    backgroundColor: '#FF3B30',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
    letterSpacing: -0.2,
  },
});
