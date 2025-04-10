import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#2D1F19', '#121212']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.comingSoonContainer}>
          <Image 
            source={require('../../assets/images/avatar.png')} 
            style={styles.comingSoonImage}
          />
          
          <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
          
          <Text style={styles.comingSoonDescription}>
            We're working on an exciting new feature that will help you discover and join local music events, 
            jam sessions, and concerts with other musicians.
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="calendar" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>Browse upcoming events in your area</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="people" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>Connect with other musicians at events</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="musical-notes" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>Host your own jam sessions</Text>
            </View>
          </View>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  comingSoonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  comingSoonImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  comingSoonDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  featureList: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
