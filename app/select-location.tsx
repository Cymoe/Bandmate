import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';
import { GOOGLE_PLACES_API_KEY } from '@env';
import LocationPin from './components/LocationPin';

interface LocationItem {
  id: string;
  name: string;
  vicinity: string;
  state: string;
  country: string;
  distance: number;
  latitude: number;
  longitude: number;
}

const LocationItem = ({ name, vicinity, state, country, distance, id }: LocationItem) => (
  <TouchableOpacity 
    style={styles.locationItem}
    onPress={() => {
      router.back();
    }}
  >
    <View style={styles.locationContent}>
      <View style={styles.nameContainer}>
        <Text style={styles.cityText}>
          {id === 'current_location' ? 'Current Location' : name}
        </Text>
        {id === 'current_location' && <LocationPin />}
      </View>
      <View style={styles.locationDetails}>
        <Text style={styles.stateCountryText}>{`${vicinity || state}, ${country}`}</Text>
        {id !== 'current_location' && (
          <>
            <View style={styles.dot} />
            <Text style={styles.distanceText}>{formatDistance(distance)}</Text>
          </>
        )}
      </View>
    </View>
    <View style={styles.separator} />
  </TouchableOpacity>
);

const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${Math.round(distance)}km`;
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function SelectLocation() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Location permission is required to show nearby venues.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userLoc = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(userLoc);
        
        // Fetch nearby places when user location is obtained
        fetchNearbyPlaces(userLoc);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch location data.');
      }
    })();
  }, []);

  const fetchNearbyPlaces = async (location: { latitude: number; longitude: number }) => {
    try {
      setIsLoading(true);
      // First, get the current location details using reverse geocoding
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();
      
      let currentLocation: LocationItem | null = null;
      
      if (geocodeData.results?.length > 0) {
        const result = geocodeData.results[0];
        const cityComponent = result.address_components.find((c: any) => 
          c.types.includes('locality') || c.types.includes('sublocality')
        );
        const stateComponent = result.address_components.find((c: any) => 
          c.types.includes('administrative_area_level_1')
        );
        const countryComponent = result.address_components.find((c: any) => 
          c.types.includes('country')
        );
        
        currentLocation = {
          id: 'current_location',
          name: cityComponent?.long_name || 'Current Location',
          vicinity: '',
          state: stateComponent?.short_name || '',
          country: countryComponent?.short_name || 'US',
          distance: 0,
          latitude: location.latitude,
          longitude: location.longitude
        };
      }

      // Then fetch nearby venues
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&type=establishment&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        const nearbyLocations = data.results
          .map((place: any) => {
            const distance = calculateDistance(
              location.latitude,
              location.longitude,
              place.geometry.location.lat,
              place.geometry.location.lng
            );
            
            return {
              id: place.place_id,
              name: place.name,
              vicinity: place.vicinity,
              state: place.vicinity?.split(',').pop()?.trim() || '',
              country: 'US',
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
              distance
            };
          })
          .sort((a: LocationItem, b: LocationItem) => a.distance - b.distance)
          .slice(0, 9); // Get 9 nearby locations to make room for current location

        // Combine current location with nearby locations
        setLocations(currentLocation ? [currentLocation, ...nearbyLocations] : nearbyLocations);
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      Alert.alert('Error', 'Failed to fetch nearby locations.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchPlaces = async (query: string) => {
    if (!userLocation || query.length < 2) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${userLocation.latitude},${userLocation.longitude}&radius=5000&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        const searchResults = data.results.slice(0, 10).map((place: any) => ({
          id: place.place_id,
          name: place.name,
          vicinity: place.formatted_address,
          state: place.formatted_address?.split(',').pop()?.trim() || '',
          country: 'US',
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            place.geometry.location.lat,
            place.geometry.location.lng
          )
        }));

        setLocations(searchResults.sort((a: LocationItem, b: LocationItem) => a.distance - b.distance));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to search locations.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchField}>
            <Ionicons name="search" size={24} color="#FFFFFF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location"
              placeholderTextColor="rgba(255, 255, 255, 0.48)"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                searchPlaces(text);
              }}
              selectionColor="#FF3B30"
            />
            {isLoading && <ActivityIndicator style={styles.loader} color="#FFFFFF" />}
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location List */}
      <ScrollView style={styles.locationList}>
        {locations.map((location) => (
          <LocationItem key={location.id} {...location} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    paddingTop: 112,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 108,
    backgroundColor: '#1F1F1F',
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 12,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    height: 40,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  loader: {
    marginRight: 8,
  },
  cancelText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 17,
    color: '#FFFFFF',
    width: 43,
    maxWidth: 60,
    textAlign: 'right',
  },
  locationList: {
    flex: 1,
  },
  locationItem: {
    width: '100%',
    height: 61,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  locationContent: {
    gap: 8,
  },
  cityText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stateCountryText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -1,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#828282',
    borderRadius: 100,
  },
  distanceText: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -1,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#262626',
    marginTop: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
}); 