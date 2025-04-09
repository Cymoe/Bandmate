import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import TabBar from '../components/navigation/TabBar';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  pinned: boolean;
  read: boolean;
}

const DUMMY_CHATS: ChatItem[] = [
  {
    id: '1',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    unread: 12,
    pinned: true,
    read: false,
  },
  {
    id: '2',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    unread: 4,
    pinned: true,
    read: true,
  },
  {
    id: '3',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    unread: 12,
    pinned: true,
    read: false,
  },
  {
    id: '4',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    unread: 12,
    pinned: false,
    read: false,
  },
  {
    id: '5',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    unread: 4,
    pinned: false,
    read: true,
  },
  {
    id: '6',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    unread: 12,
    pinned: false,
    read: false,
  },
];

const ChatItem: React.FC<{ item: ChatItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.chatItem}>
      <Image 
        source={require('../assets/images/avatar.png')} 
        style={styles.avatar} 
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <View style={styles.lastMessageContainer}>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            {item.read && <Ionicons name="checkmark-done" size={16} color="#8E8E93" />}
            {!item.read && <Ionicons name="checkmark-done" size={16} color="#007AFF" />}
          </View>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState('conversations');
  const [searchText, setSearchText] = useState('');

  const pinnedChats = DUMMY_CHATS.filter(chat => chat.pinned);
  const regularChats = DUMMY_CHATS.filter(chat => !chat.pinned);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#2D1F19', '#121212']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a conversation..."
            placeholderTextColor="#8E8E93"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
              <View style={styles.clearButtonInner}>
                <Ionicons name="close" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'conversations' && styles.activeTab]}
          onPress={() => setActiveTab('conversations')}
        >
          <Text style={[styles.tabText, activeTab === 'conversations' && styles.activeTabText]}>
            Conversations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'matches' && styles.activeTab]}
          onPress={() => setActiveTab('matches')}
        >
          <Text style={[styles.tabText, activeTab === 'matches' && styles.activeTabText]}>
            Matches
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Chat list */}
      <FlatList
        data={[...pinnedChats, ...regularChats]}
        renderItem={({ item }) => <ChatItem item={item} />}
        ListHeaderComponent={() => (
          <>
            {pinnedChats.length > 0 && (
              <View>
                <View style={styles.sectionHeader}>
                  <Ionicons name="pin" size={16} color="#8E8E93" />
                  <Text style={styles.sectionTitle}>ALL PINNED {pinnedChats.length}</Text>
                </View>
              </View>
            )}
            
            <View style={styles.sectionHeader}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#8E8E93" />
              <Text style={styles.sectionTitle}>ALL CONVERSATIONS {regularChats.length}</Text>
            </View>
          </>
        )}
        keyExtractor={item => item.id}
      />
      
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#121212',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#121212',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonInner: {
    backgroundColor: '#48484A',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#121212',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2C2C2E',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: '#121212',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatContent: {
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
    fontFamily: 'Poppins-SemiBold',
  },
  chatTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Poppins-Regular',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 4,
    fontFamily: 'Poppins-Regular',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
