import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const MusicStyleChip = ({ label }: { label: string }) => (
  <View style={styles.chip}>
    <Text style={styles.chipText}>{label}</Text>
  </View>
);

const SharedMediaItem = ({ icon }: { icon: IconName }) => (
  <View style={styles.mediaItem}>
    <Ionicons name={icon} size={24} color="#FFFFFF" />
  </View>
);

const SettingToggle = ({ 
  icon, 
  label, 
  value, 
  onChange,
  silverOnly,
}: { 
  icon: IconName;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  silverOnly?: boolean;
}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingLeft}>
      <Ionicons name={icon} size={24} color="#FF3B30" />
      <View style={styles.settingTexts}>
        <Text style={styles.settingLabel}>{label}</Text>
        {silverOnly && (
          <View style={styles.silverBadge}>
            <Ionicons name="star" size={12} color="#FE6F3B" />
            <Text style={styles.silverText}>Only with Silver</Text>
          </View>
        )}
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: '#262626', true: '#FF3B30' }}
      thumbColor={value ? '#141416' : '#141416'}
    />
  </View>
);

const ThemeColor = ({ color, selected }: { color: string; selected?: boolean }) => (
  <TouchableOpacity 
    style={[
      styles.themeColor,
      { backgroundColor: color },
      selected && styles.themeColorSelected
    ]}
  />
);

export default function ChatSettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#141416', '#000000']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.subtitleRow}>
              <Ionicons name="settings-outline" size={16} color="#828186" />
              <Text style={styles.subtitle}>Manage your match</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close-outline" size={24} color="#F8F9FB" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MUSIC STYLE</Text>
          <View style={styles.chipRow}>
            <MusicStyleChip label="Blues" />
            <MusicStyleChip label="Rock" />
            <MusicStyleChip label="Soul" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>SHARED MEDIA</Text>
            <Text style={styles.count}>4</Text>
          </View>
          <View style={styles.mediaGrid}>
            <SharedMediaItem icon="musical-notes-outline" />
            <SharedMediaItem icon="image-outline" />
            <SharedMediaItem icon="document-text-outline" />
            <SharedMediaItem icon="link-outline" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMMUNICATION</Text>
          <View style={styles.settingsList}>
            <SettingToggle
              icon="star-outline"
              label="Mark as favorite"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="calendar-outline"
              label="Scheduled messages"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="mic-outline"
              label="Voice messages"
              value={true}
              onChange={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACY & SECURITY</Text>
          <View style={styles.settingsList}>
            <SettingToggle
              icon="link"
              label="Block sharing links"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="images"
              label="Block sharing media"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="eye-off-outline"
              label="Block screenshots"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="time-outline"
              label="Hide last seen"
              value={true}
              onChange={() => {}}
              silverOnly
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="checkmark-done-outline"
              label="Hide read status"
              value={true}
              onChange={() => {}}
              silverOnly
            />
            <View style={styles.divider} />
            <SettingToggle
              icon="lock-closed-outline"
              label="Secure with PIN code"
              value={true}
              onChange={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPEARANCE</Text>
          <View style={styles.settingsList}>
            <SettingToggle
              icon="moon-outline"
              label="Dark Mode"
              value={true}
              onChange={() => {}}
            />
            <View style={styles.divider} />
            <View style={styles.themeSection}>
              <View style={styles.themeTitleRow}>
                <Ionicons name="brush-outline" size={24} color="#FF3B30" />
                <View style={styles.themeTexts}>
                  <Text style={styles.settingLabel}>Theme</Text>
                  <View style={styles.silverBadge}>
                    <Ionicons name="star-outline" size={12} color="#FE6F3B" />
                    <Text style={styles.silverText}>Only with Silver</Text>
                  </View>
                </View>
              </View>
              <View style={styles.themeColors}>
                <ThemeColor color="#006636" selected />
                <ThemeColor color="#8DC53E" />
                <ThemeColor color="#EFE347" />
                <ThemeColor color="#FD6D1B" />
                <ThemeColor color="#EE1045" />
                <ThemeColor color="#D3155D" />
                <ThemeColor color="#CD88FD" />
                <ThemeColor color="#575093" />
                <ThemeColor color="#736356" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT ACTIONS</Text>
          <View style={styles.accountActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="person-remove-outline" size={24} color="#F8F9FB" />
              </View>
              <View style={styles.actionTexts}>
                <Text style={styles.actionTitle}>Remove match</Text>
                <Text style={styles.actionSubtitle}>Will still be able to match and send messages</Text>
              </View>
              <View style={styles.actionArrow}>
                <Ionicons name="chevron-forward-outline" size={24} color="#F8F9FB" />
              </View>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="close-circle-outline" size={24} color="#F8F9FB" />
              </View>
              <View style={styles.actionTexts}>
                <Text style={styles.actionTitle}>Block this user</Text>
                <Text style={styles.actionSubtitle}>Will not be able to match or send messages</Text>
              </View>
              <View style={styles.actionArrow}>
                <Ionicons name="chevron-forward-outline" size={24} color="#F8F9FB" />
              </View>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="warning-outline" size={24} color="#F8F9FB" />
              </View>
              <View style={styles.actionTexts}>
                <Text style={styles.actionTitle}>Report this user</Text>
                <Text style={styles.actionSubtitle}>Will be reported not able to match nor send messages</Text>
              </View>
              <View style={styles.actionArrow}>
                <Ionicons name="chevron-forward-outline" size={24} color="#F8F9FB" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>
          We are constantly working on improving BandMate's experience for all our users
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 375,
    minHeight: 812,
    paddingHorizontal: 12,
    paddingBottom: 64,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 44,
    marginBottom: 32,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 36,
    color: '#F8F9FB',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#828186',
    marginLeft: 4,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.2,
    color: '#828186',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  count: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#828186',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 4,
  },
  chip: {
    backgroundColor: '#313131',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
  },
  chipText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mediaItem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsList: {
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
    borderRadius: 8,
    overflow: 'hidden',
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
  settingTexts: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#F8F9FB',
  },
  silverBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(254, 111, 59, 0.16)',
    borderRadius: 4,
  },
  silverText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: '#FE6F3B',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
  },
  themeSection: {
    padding: 16,
  },
  themeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  themeTexts: {
    flex: 1,
  },
  themeColors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeColor: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeColorSelected: {
    borderColor: '#F8F9FB',
  },
  accountActions: {
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTexts: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#F8F9FB',
  },
  actionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#828186',
  },
  actionArrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionDivider: {
    height: 1,
    backgroundColor: 'rgba(130, 129, 134, 0.16)',
  },
  footer: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
    lineHeight: 15,
    letterSpacing: -0.01 * 12,
  },
}); 