import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Dummy data for chats
const DUMMY_CHATS = [
  {
    id: '1',
    name: "Sarah's Band",
    lastMessage: 'Hey, we\'re looking for a drummer!',
    time: '2m ago',
    image: require('@/assets/images/avatar.png'),
    unread: true,
  },
  {
    id: '2',
    name: 'Rock Ensemble',
    lastMessage: 'When can you come for practice?',
    time: '1h ago',
    image: require('@/assets/images/avatar.png'),
    unread: false,
  },
  {
    id: '3',
    name: 'Jazz Quartet',
    lastMessage: 'Great session yesterday!',
    time: '2h ago',
    image: require('@/assets/images/avatar.png'),
    unread: false,
  },
];

const ChatItem = ({ item }: { item: any }) => (
  <TouchableOpacity style={styles.chatItem}>
    <Image source={item.image} style={styles.avatar} />
    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatTime}>{item.time}</Text>
      </View>
      <View style={styles.chatFooter}>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </View>
  </TouchableOpacity>
);

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#2D1F19', '#121212']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      <FlatList
        data={DUMMY_CHATS}
        renderItem={ChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatsList: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  chatTime: {
    fontSize: 12,
    color: '#828282',
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#828282',
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
});
