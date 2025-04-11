import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, useWindowDimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const SettingToggle = ({ 
  icon, 
  label, 
  value, 
  onChange,
  silverOnly,
  subtitle,
  showChevron
}: { 
  icon: IconName;
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  silverOnly?: boolean;
  subtitle?: string;
  showChevron?: boolean;
}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#FF3B30" />
      </View>
      <View style={styles.settingTexts}>
        <Text style={styles.settingLabel}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        {silverOnly && (
          <View style={styles.silverBadge}>
            <Ionicons name="star" size={12} color="#FE6F3B" />
            <Text style={styles.silverText}>Only with Silver</Text>
          </View>
        )}
      </View>
    </View>
    {showChevron ? (
      <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
    ) : (
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#262626', true: '#FF3B30' }}
        thumbColor={value ? '#141416' : '#141416'}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />
    )}
  </View>
);

export default function AppSettingsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const horizontalPadding = 12;
  const contentWidth = width - (horizontalPadding * 2);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => router.back() }
    ]);
  };

  return (
    <LinearGradient
      colors={['#141416', '#000000']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: horizontalPadding }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>App Settings</Text>
            <View style={styles.subtitleRow}>
              <Ionicons name="settings-outline" size={16} color="#828186" />
              <Text style={styles.subtitle}>Customize your experience</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close-outline" size={24} color="#F8F9FB" />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { width: contentWidth }]}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity onPress={() => router.push('/(app)/notification-settings')}>
              <SettingToggle
                icon="notifications-outline"
                label="Notification Settings"
                showChevron
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { width: contentWidth }]}>
          <Text style={styles.sectionTitle}>PRIVACY</Text>
          <View style={styles.settingsList}>
            <SettingToggle
              icon="location-outline"
              label="Location Services"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="eye-outline"
              label="Profile Visibility"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="analytics-outline"
              label="Analytics Sharing"
              value={false}
              onChange={() => {}}
            />
          </View>
        </View>

        <View style={[styles.section, { width: contentWidth }]}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.settingsList}>
            <SettingToggle
              icon="person-outline"
              label="Edit Profile"
              showChevron
              onChange={() => router.push('/artist-profile')}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="star-outline"
              label="Upgrade to Silver"
              showChevron
              onChange={() => router.push('/(subscription)/plans')}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="shield-checkmark-outline"
              label="Privacy Policy"
              showChevron
              onChange={() => router.push('/(legal)/privacy')}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="document-text-outline"
              label="Terms of Service"
              showChevron
              onChange={() => router.push('/(legal)/terms')}
            />
          </View>
        </View>

        <View style={[styles.section, { width: contentWidth }]}>
          <Text style={styles.sectionTitle}>DANGER ZONE</Text>
          <View style={styles.settingsList}>
            <SettingToggle
              icon="trash-outline"
              label="Delete Account"
              subtitle="This action cannot be undone"
              showChevron
              onChange={() => router.push('/(settings)/delete-account')}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="log-out-outline"
              label="Sign Out"
              subtitle="You will need to sign in again"
              showChevron
              onChange={handleSignOut}
            />
          </View>
        </View>

        <Text style={styles.footer}>
          BandMate v1.0.0
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  scrollContent: {
    paddingBottom: 64,
    gap: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    width: '100%',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontFamily: 'Abril Fatface',
    fontSize: 32,
    lineHeight: 43,
    color: '#F8F9FB',
    marginBottom: 4,
    letterSpacing: -0.03 * 32,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 21,
    color: '#828186',
    letterSpacing: -0.03 * 14,
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#262626',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: 'rgba(255, 255, 255, 0.48)',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  settingsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTexts: {
    gap: 8,
  },
  settingLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: '#F8F9FB',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
    color: '#828186',
  },
  silverBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(254, 111, 59, 0.16)',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  silverText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
    color: '#FE6F3B',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  footer: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: -0.01 * 12,
    marginTop: 32,
  },
}); 