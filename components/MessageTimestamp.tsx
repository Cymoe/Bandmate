import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MessageTimestampProps {
  date: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const MessageTimestamp: React.FC<MessageTimestampProps> = ({
  date,
  isExpanded,
  onToggle,
}) => (
  <TouchableOpacity style={styles.container} onPress={onToggle}>
    <View style={styles.line} />
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{date}</Text>
      <Ionicons 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={16} 
        color="#828186" 
      />
    </View>
    <View style={styles.line} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 4,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#828186',
  },
});

export default MessageTimestamp; 