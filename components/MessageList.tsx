import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Message from './Message';

interface MessageData {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isTranslated?: boolean;
  originalText?: string;
  isLiked?: boolean;
  isSent?: boolean;
  isRead?: boolean;
}

const MessageList = () => {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: '1',
      text: "Hi Travis, I'm sorry for not returning your call! Work has been crazy, how have you been?",
      timestamp: '2:56 PM',
      sender: 'CATIE',
      isLiked: false,
      isSent: false,
    },
    {
      id: '2',
      text: "Hi Catie! I've been good actually. Thanks for asking! How is college going for ya?",
      timestamp: '3:02 PM',
      sender: 'TRAVIS',
      isLiked: false,
      isSent: true,
      isRead: true,
    }
  ]);

  const handleLike = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isLiked: !msg.isLiked } : msg
    ));
  };

  const handleTranslate = (messageId: string) => {
    // Here you would integrate with a translation service
    // For now, we'll just simulate translation
    setMessages(messages.map(msg =>
      msg.id === messageId ? {
        ...msg,
        isTranslated: true,
        originalText: msg.text,
        text: "Translated text would go here", // Replace with actual translation
      } : msg
    ));
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map(message => (
        <Message
          key={message.id}
          text={message.text}
          timestamp={message.timestamp}
          sender={message.sender}
          isTranslated={message.isTranslated}
          originalText={message.originalText}
          isLiked={message.isLiked}
          isSent={message.isSent}
          isRead={message.isRead}
          onLike={() => handleLike(message.id)}
          onTranslate={() => handleTranslate(message.id)}
          onReply={() => {}}
          onReport={() => {}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});

export default MessageList; 