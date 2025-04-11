import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MeetingCardProps {
  date: string;
  time: string;
  address: string;
  onAddToCalendar?: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  date,
  time,
  address,
  onAddToCalendar,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Ionicons name="calendar" size={20} color="#F8F9FB" />
      <Text style={styles.headerText}>Meeting Proposed</Text>
    </View>
    
    <View style={styles.content}>
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={16} color="#828186" />
        <Text style={styles.infoText}>{date} at {time}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={16} color="#828186" />
        <Text style={styles.infoText}>{address}</Text>
      </View>
    </View>
    
    <TouchableOpacity 
      style={styles.addButton} 
      onPress={onAddToCalendar}
    >
      <Ionicons name="add-circle-outline" size={20} color="#F8F9FB" />
      <Text style={styles.addButtonText}>Add to Calendar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#F8F9FB',
  },
  content: {
    gap: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#828186',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#F8F9FB',
  },
});

export default MeetingCard; 