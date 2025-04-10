import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(18, 18, 18, 0.64)',
          borderTopWidth: 0,
          height: 94,
          paddingTop: 6,
          paddingBottom: 42,
          paddingHorizontal: 32,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#828282',
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 12,
          marginTop: 6,
          fontFamily: 'Roboto',
        },
      }}>
      <Tabs.Screen
        name="matching"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
