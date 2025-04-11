import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = React.useState('');
  const router = useRouter();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleLocationPress = () => {
    router.push('/select-location');
  };

  return (
    <BlurView intensity={60} tint="dark" style={styles.container}>
      <TouchableOpacity 
        style={styles.locationButton}
        onPress={handleLocationPress}
      >
        <Ionicons name="calendar-outline" size={22} color="#B3B3B3" />
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        placeholderTextColor="#828186"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      
      <TouchableOpacity 
        style={[
          styles.sendButton,
          message.trim() ? styles.activeSendButton : null
        ]}
        onPress={handleSend}
      >
        <Ionicons 
          name="send" 
          size={22} 
          color={message.trim() ? "#F8F9FB" : "#B3B3B3"} 
        />
      </TouchableOpacity>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 34,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    gap: 6,
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#121212',
    borderRadius: 100,
    paddingHorizontal: 16,
    color: '#F8F9FB',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeSendButton: {
    backgroundColor: '#FF4D00',
  },
});

export default ChatInput; 