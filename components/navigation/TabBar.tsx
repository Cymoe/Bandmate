import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import HomeIcon from '../ui/HomeIcon';
import EventsIcon from '../ui/EventsIcon';
import MatchesIcon from '../ui/MatchesIcon';
import ChatIcon from '../ui/ChatIcon';

export default function TabBar() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => {
          console.log('Navigating to matching screen');
          router.replace('/matching');
        }}
      >
        <MatchesIcon color="#FFFFFF" />
        <Text style={styles.tabLabel}>Matches</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => {
          console.log('Navigating to events screen');
          router.replace('/events');
        }}
      >
        <EventsIcon color="#FFFFFF" />
        <Text style={styles.tabLabel}>Events</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => {
          console.log('Navigating to chats screen');
          router.replace('/chats');
        }}
      >
        <ChatIcon color="#FFFFFF" />
        <Text style={styles.tabLabel}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 30,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});
