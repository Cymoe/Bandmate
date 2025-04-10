import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MusicianProfile } from '../types/types';

type MusicianCardProps = {
  profile: MusicianProfile;
};

export default function MusicianCard({ profile }: MusicianCardProps) {
  const { name, age, primaryInstrument, genres, bio, distance, imageUri } = profile;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageUri }} style={styles.backgroundImage} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      >
        <View style={styles.cardContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}, {age}</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Ionicons name="musical-notes" size={16} color="#fff" />
                <Text style={styles.tagText}>{primaryInstrument}</Text>
              </View>
              
              {genres.slice(0, 2).map((genre, index) => (
                <View key={index} style={styles.tag}>
                  <Ionicons name="radio" size={16} color="#fff" />
                  <Text style={styles.tagText}>{genre}</Text>
                </View>
              ))}
              
              <View style={styles.tag}>
                <Ionicons name="location" size={16} color="#fff" />
                <Text style={styles.tagText}>{distance} miles</Text>
              </View>
            </View>
            
            <Text style={styles.bio} numberOfLines={3}>{bio}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: '85%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  cardContent: {
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoButton: {
    padding: 4,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  bio: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 5,
  },
}); 