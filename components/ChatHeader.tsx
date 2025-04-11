import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFillObject}>
        <View style={styles.blurBackground} />
      </BlurView>
      
      <View style={styles.content}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={20} color="#F8F9FB" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <View style={styles.nameRow}>
            <View style={styles.onlineIndicator} />
            <Text style={styles.nameText}>Catie, 24</Text>
          </View>
          
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={12} color="#828186" />
            <Text style={styles.locationText}>Los Angeles</Text>
            <View style={styles.dot} />
            <Text style={styles.roleText}>Solo Artist</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="tune" size={20} color="#F8F9FB" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    zIndex: 9,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 60,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 12,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#64CD75',
    borderRadius: 4,
  },
  nameText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    color: '#F8F9FB',
    letterSpacing: -0.54,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#828186',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#828186',
    borderRadius: 2,
  },
  roleText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#828186',
  },
});

export default ChatHeader; 