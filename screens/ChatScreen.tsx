import React from 'react';
import { View, StyleSheet } from 'react-native';
import MessageInput from '../components/MessageInput';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default ChatScreen; 