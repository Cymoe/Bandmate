import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MeetingModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateMeeting: (date: string, time: string, location: string) => void;
}

const MeetingModal = ({ visible, onClose, onCreateMeeting }: MeetingModalProps) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState('');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDate(selectedTime);
    }
  };

  const handleCreate = () => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    onCreateMeeting(formattedDate, formattedTime, location);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView intensity={60} tint="dark" style={styles.blurView}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Meeting</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#F8F9FB" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.inputRow}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={24} color="#828186" />
              <Text style={styles.inputText}>
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.inputRow}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={24} color="#828186" />
              <Text style={styles.inputText}>
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>

            <View style={styles.inputRow}>
              <Ionicons name="location-outline" size={24} color="#828186" />
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                placeholderTextColor="#828186"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <TouchableOpacity 
              style={[styles.createButton, !location && styles.disabledButton]}
              onPress={handleCreate}
              disabled={!location}
            >
              <Text style={styles.createButtonText}>Create Meeting</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blurView: {
    width: '90%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: '#262626',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#F8F9FB',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#F8F9FB',
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#F8F9FB',
    marginLeft: 12,
    padding: 0,
  },
  createButton: {
    backgroundColor: '#64CD75',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  createButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#121212',
  },
});

export default MeetingModal; 