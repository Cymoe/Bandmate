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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TabBar from '../components/navigation/TabBar';
import { Feather } from '@expo/vector-icons';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#2D1F19', '#121212']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
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
            source={require('../assets/images/avatar.png')} 
            style={styles.comingSoonImage}
          />
          
          <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
          
          <Text style={styles.comingSoonDescription}>
            We're working on an exciting new feature that will help you discover and join local music events, 
            jam sessions, and concerts with other musicians.
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="calendar" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Find local music events</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="people" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Join jam sessions with other musicians</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="musical-notes" size={24} color="#FF3B30" />
              <Text style={styles.featureText}>Create your own events and invite others</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notifyButton}>
            <Text style={styles.notifyButtonText}>Notify Me When Available</Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  comingSoonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  comingSoonTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  comingSoonDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  featureList: {
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontFamily: 'Poppins-Regular',
  },
  notifyButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 10,
  },
  notifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
