import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MessageInput = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView 
        intensity={60}
        tint="dark"
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.blurBackground} />
      </BlurView>
      <View style={styles.content}>
        <View style={styles.calendarButton}>
          <MaterialCommunityIcons name="calendar" size={22} color="#B3B3B3" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#828186"
            selectionColor="#828186"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 34,
    gap: 6,
  },
  calendarButton: {
    width: 44,
    height: 44,
    backgroundColor: '#121212',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    height: 44,
    backgroundColor: '#121212',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 18,
    color: '#828186',
    padding: 0,
  },
});

export default MessageInput; 