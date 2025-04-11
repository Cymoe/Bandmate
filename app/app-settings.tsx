import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppSettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#141416', '#000000']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 56 }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>My Profile</Text>
            <View style={styles.subtitleContainer}>
              <Ionicons name="settings-outline" size={12} color="rgba(255, 255, 255, 0.48)" />
              <Text style={styles.subtitle}>Manage your preferences</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#F8F9FB" />
          </TouchableOpacity>
        </View>

        {/* Content Sections */}
        <View style={styles.sections}>
          {/* General Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require('../assets/images/profile_image.png')}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editProfileButton}>
                  <Ionicons name="pencil" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.discoverButton}
              onPress={() => router.push('/discover')}
            >
              <Text style={styles.discoverButtonText}>Discover Offers</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Bonuses Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bonuses</Text>
            <View style={styles.bonusItems}>
              <TouchableOpacity style={styles.bonusItem}>
                <Ionicons name="star" size={24} color="#007BFF" />
                <Text style={styles.bonusText}>Super Likes</Text>
                <Text style={styles.bonusPrice}>$2/each</Text>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bonusItem}>
                <Ionicons name="flash" size={24} color="#575093" />
                <Text style={styles.bonusText}>Boosts</Text>
                <Text style={styles.bonusPrice}>$5/each</Text>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bonusItem}>
                <Ionicons name="play-back" size={24} color="#F8F9FB" />
                <Text style={styles.bonusText}>Rewinds</Text>
                <Text style={styles.bonusPrice}>$1/each</Text>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.bonusItem, styles.bonusItemGold]}>
                <Text style={styles.bonusTextGold}>Subscription plans</Text>
                <Text style={styles.bonusPriceGold}>$10/month</Text>
                <Ionicons name="chevron-forward" size={24} color="#A19375" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsItems}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="analytics-outline" size={24} color="#A19375" />
                  <View>
                    <Text style={styles.settingText}>Analytics</Text>
                    <Text style={styles.settingSubtext}>Only with Platinum</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="card-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Payment method</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="notifications-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Notifications</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="key-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Change my password</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Two factors authentication</Text>
                </View>
                <Switch 
                  value={true}
                  onValueChange={() => {}}
                  trackColor={{ false: '#828186', true: '#A19375' }}
                  thumbColor={true ? '#141416' : '#F8F9FB'}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpText}>Help us improve BM</Text>
              <View style={styles.startNow}>
                <Text style={styles.startNowText}>Start now</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.settingsItems}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="contrast-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Dark mode</Text>
                </View>
                <Switch 
                  value={true}
                  onValueChange={() => {}}
                  trackColor={{ false: '#828186', true: '#A19375' }}
                  thumbColor={true ? '#141416' : '#F8F9FB'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="person-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Mark as unavailable</Text>
                </View>
                <Switch 
                  value={false}
                  onValueChange={() => {}}
                  trackColor={{ false: '#828186', true: '#A19375' }}
                  thumbColor={false ? '#141416' : '#F8F9FB'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#A19375" />
                  <View>
                    <Text style={styles.settingText}>Only see verified profiles</Text>
                    <Text style={styles.settingSubtext}>Only with Platinum</Text>
                  </View>
                </View>
                <Switch 
                  value={false}
                  onValueChange={() => {}}
                  trackColor={{ false: '#828186', true: '#A19375' }}
                  thumbColor={false ? '#141416' : '#F8F9FB'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="heart-outline" size={24} color="#A19375" />
                  <View>
                    <Text style={styles.settingText}>Only show the ones I liked</Text>
                    <Text style={styles.settingSubtext}>Only with Platinum</Text>
                  </View>
                </View>
                <Switch 
                  value={false}
                  onValueChange={() => {}}
                  trackColor={{ false: '#828186', true: '#A19375' }}
                  thumbColor={false ? '#141416' : '#F8F9FB'}
                />
              </View>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="language-outline" size={24} color="#A19375" />
                  <View>
                    <Text style={styles.settingText}>App language</Text>
                    <Text style={styles.settingSubtext}>English (US)</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="refresh-outline" size={24} color="#A19375" />
                  <Text style={styles.settingText}>Automatic updates</Text>
                </View>
                <Switch 
                  value={true}
                  onValueChange={() => {}}
                  trackColor={{ false: '#828186', true: '#A19375' }}
                  thumbColor={true ? '#141416' : '#F8F9FB'}
                />
              </View>
            </View>
          </View>

          {/* Community Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community</Text>
            <View style={styles.settingsItems}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.socialIcon}>
                    <Image 
                      source={require('../assets/images/twitter_icon.png')}
                      style={styles.xLogo}
                    />
                  </View>
                  <Text style={styles.settingText}>Follow us on X</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.socialIcon}>
                    <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                  </View>
                  <Text style={styles.settingText}>Follow us on Facebook</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.socialIcon}>
                    <Ionicons name="logo-instagram" size={24} color="#E4405F" />
                  </View>
                  <Text style={styles.settingText}>Follow us on Instagram</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="star-outline" size={24} color="#A19375" />
                  <View>
                    <Text style={styles.settingText}>Rate this app</Text>
                    <Text style={styles.settingSubtext}>4.9 rating on the Play Store & App Store</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="#F8F9FB" />
              <Text style={styles.deleteText}>Close my account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyright}>
            ©2025 Sola Group. All rights reserved. Sola Group, SG, the Sola Group logo, BandMate, BandMate (stylized), BM, BM logo are trademarks or registered of Sola Group in the USA and elsewhere. All other trademarks are the property of their respective owners.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 34,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sections: {
    gap: 32,
  },
  section: {
    gap: 24,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 20,
    color: '#F8F9FB',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userTexts: {
    gap: 4,
  },
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  },
  userEmail: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#828186',
  },
  editProfile: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#A19375',
  },
  discoverButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
    backgroundColor: '#A19375',
    borderRadius: 100,
  },
  discoverText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
  },
  learnMore: {
    backgroundColor: '#141416',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  learnMoreText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  bonusItems: {
    gap: 8,
  },
  bonusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
  },
  bonusItemGold: {
    borderColor: '#A19375',
  },
  bonusText: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
    marginLeft: 8,
  },
  bonusTextGold: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#A19375',
  },
  bonusPrice: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#F8F9FB',
    marginRight: 8,
  },
  bonusPriceGold: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#A19375',
    marginRight: 8,
  },
  settingsItems: {
    gap: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 12,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  settingText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  },
  settingSubtext: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#828186',
  },
  helpButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 100,
  },
  helpText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  startNow: {
    backgroundColor: '#F8F9FB',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  startNowText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#141416',
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: '#EBEAEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xLogo: {
    width: 12,
    height: 12,
  },
  fbLogo: {
    width: 16,
    height: 16,
  },
  igLogo: {
    width: 16,
    height: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
  },
  footer: {
    marginTop: 24,
    gap: 8,
  },
  logoutButton: {
    height: 56,
    backgroundColor: '#F8F9FB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
  },
  deleteButton: {
    height: 56,
    backgroundColor: '#EE1045',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  deleteText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  copyright: {
    marginTop: 24,
    fontFamily: 'Poppins',
    fontSize: 10,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.48)',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  editProfileButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1C',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
  },
  discoverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
  },
  discoverButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 