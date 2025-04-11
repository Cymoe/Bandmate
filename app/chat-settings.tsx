import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Switch,
  Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

const ColorOption = ({ color, isSelected, onPress }: { color: string, isSelected?: boolean, onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[styles.colorOption, { backgroundColor: color }]}>
    {isSelected && (
      <View style={styles.colorSelected} />
    )}
  </TouchableOpacity>
);

const SettingToggle = ({ label, sublabel, value, onValueChange, iconName, iconColor = '#FF3B30', isPremium = false }: {
  label: string;
  sublabel?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  iconName: string;
  iconColor?: string;
  isPremium?: boolean;
}) => (
  <View style={styles.settingToggle}>
    <View style={styles.settingContent}>
      <View style={styles.settingIcon}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>
      <View style={styles.settingTexts}>
        <Text style={styles.settingLabel}>{label}</Text>
        {isPremium && <Text style={styles.premiumLabel}>Only with Platinum</Text>}
        {sublabel && <Text style={styles.settingSubLabel}>{sublabel}</Text>}
      </View>
    </View>
    <Switch
      trackColor={{ false: 'rgba(38, 38, 38, 0.64)', true: '#FF3B30' }}
      thumbColor="#141416"
      ios_backgroundColor="rgba(38, 38, 38, 0.64)"
      onValueChange={onValueChange}
      value={value}
      style={styles.settingSwitch}
    />
  </View>
);

const ActionButton = ({ icon, title, subtitle, onPress }: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => (
  <View style={styles.actionContainer}>
    <View style={styles.actionContent}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={24} color="#F8F9FB" />
      </View>
      <View style={styles.actionTexts}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.actionChevron} onPress={onPress}>
      <Ionicons name="chevron-forward" size={24} color="#F8F9FB" />
    </TouchableOpacity>
  </View>
);

export default function ChatSettingsScreen() {
  const params = useLocalSearchParams();
  const { name, id } = params;
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [favoriteEnabled, setFavoriteEnabled] = useState(true);
  const [hideSeenEnabled, setHideSeenEnabled] = useState(true);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  const colors = [
    '#006636', // Green
    '#8DC53E', // Light green
    '#EFE347', // Yellow
    '#FD6D1B', // Orange
    '#EE1045', // Red
    '#D3155D', // Pink
    '#CD88FD', // Purple
    '#575093', // Blue-purple
    '#736356', // Brown
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#141416', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.subtitleContainer}>
            <Ionicons name="options-outline" size={16} color="#828186" style={{ marginRight: 4 }} />
            <Text style={styles.headerSubtitle}>Manage your match</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#F8F9FB" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="brush" size={32} color="#FF3B30" />
            <View style={styles.sectionHeaderTexts}>
              <Text style={styles.sectionTitle}>Theme</Text>
              <Text style={styles.premiumLabel}>Only with Platinum</Text>
            </View>
          </View>
          
          <View style={styles.colorOptionsContainer}>
            {colors.map((color, index) => (
              <ColorOption 
                key={index}
                color={color}
                isSelected={index === selectedColorIndex}
                onPress={() => setSelectedColorIndex(index)}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Notification Settings */}
        <View style={styles.section}>
          <SettingToggle
            label="Turn notifications off"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            iconName="notifications-off"
            iconColor="#FF3B30"
          />
          
          <SettingToggle
            label="Mark as favorite"
            value={favoriteEnabled}
            onValueChange={setFavoriteEnabled}
            iconName="star"
            iconColor="#FF3B30"
          />
          
          <SettingToggle
            label="Hide seen"
            value={hideSeenEnabled}
            onValueChange={setHideSeenEnabled}
            iconName="eye-off"
            iconColor="#FF3B30"
            isPremium={true}
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Actions */}
        <View style={styles.section}>
          <ActionButton
            icon="person-remove"
            title="Remove match"
            subtitle="Will still be able to match and send messages"
            onPress={() => {}}
          />
          
          <View style={styles.divider} />
          
          <ActionButton
            icon="ban"
            title="Block this user"
            subtitle="Will not be able to match or send messages"
            onPress={() => {}}
          />
          
          <View style={styles.divider} />
          
          <ActionButton
            icon="shield"
            title="Report this user"
            subtitle="Will be reported not able to match nor send messages"
            onPress={() => {}}
          />
        </View>
        
        <Text style={styles.footerText}>
          We are constantly working on improving <Text style={styles.boldText}>BandMate</Text>'s experience for all of our users.
        </Text>
      </ScrollView>
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
    alignItems: 'flex-start',
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 32,
    color: '#F8F9FB',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 14,
    color: '#828186',
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 12,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderTexts: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  },
  premiumLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 14,
    color: '#828186',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelected: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F8F9FB',
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
    marginVertical: 12,
  },
  settingToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
    marginVertical: 8,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  settingTexts: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 16,
    fontWeight: '500',
    color: '#F8F9FB',
  },
  settingSubLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 14,
    color: '#828186',
  },
  settingSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    marginVertical: 8,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionTexts: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 20,
    color: '#FFFFFF',
  },
  actionSubtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 10,
    color: '#828186',
  },
  actionChevron: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
    marginVertical: 24,
    paddingHorizontal: 12,
  },
  boldText: {
    fontWeight: '700',
  },
}); 