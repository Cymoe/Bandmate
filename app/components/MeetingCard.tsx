import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface MeetingCardProps {
  date: string;
  time: string;
  location: string;
  note?: string;
  onShare?: () => void;
}

export default function MeetingCard({ date, time, location, note, onShare }: MeetingCardProps) {
  // Split date into month and day
  const [month, day] = date.split(' ');
  
  return (
    <ImageBackground
      source={require('@/assets/images/drummer.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(18, 18, 18, 0.2)', 'rgba(0, 0, 0, 0.48)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.dateContainer}>
            <Text style={styles.month}>{month}</Text>
            <Text style={styles.day}>{day}</Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>Anto</Text>
            <View style={styles.timeContainer}>
              <View style={styles.iconFrame}>
                <Ionicons name="time-outline" size={12} color="#FFFFFF" />
              </View>
              <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.location}>{location}</Text>
              <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                <Ionicons name="share-outline" size={16} color="rgba(255, 255, 255, 0.64)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(130, 130, 130, 0.48)',
  },
  backgroundImage: {
    borderRadius: 8,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 8,
    paddingBottom: 16,
    gap: 10,
  },
  dateContainer: {
    width: 39,
    height: 44,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
    backdropFilter: 'blur(16px)',
  },
  month: {
    width: 23,
    height: 8,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#EBEAEC',
    textAlign: 'center',
  },
  day: {
    width: 21,
    height: 14,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#EBEAEC',
    textAlign: 'center',
  },
  detailsContainer: {
    width: 144,
    height: 67,
    gap: 10,
    marginTop: 'auto',
  },
  name: {
    width: 144,
    height: 11,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FFFFFF',
  },
  timeContainer: {
    width: 59,
    height: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconFrame: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    width: 43,
    height: 8,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    color: '#EBEAEC',
  },
  locationRow: {
    width: 144,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  location: {
    width: 87,
    height: 22,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    color: '#EBEAEC',
  },
  shareButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 