import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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
  countryCode: string;
  distance: number;
  latitude: number;
  longitude: number;
}

export default function SelectLocation() {
  const params = useLocalSearchParams();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${Math.round(distance)}km`;
  };

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
          name: 'Current Location',
          vicinity: cityComponent?.long_name || '',
          state: stateComponent?.short_name || '',
          countryCode: countryComponent?.short_name || 'US',
          distance: 0,
          latitude: location.latitude,
          longitude: location.longitude
        };

        // Add current location to locations array immediately
        setLocations([currentLocation]);
      }

      // Then fetch nearby venues
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=15000&type=establishment&key=${GOOGLE_PLACES_API_KEY}`
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
              countryCode: 'US',
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
              distance
            };
          })
          .sort((a: LocationItem, b: LocationItem) => a.distance - b.distance)
          .slice(0, 9); // Get 9 nearby locations

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
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${userLocation.latitude},${userLocation.longitude}&radius=15000&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        const searchResults = data.results.slice(0, 10).map((place: any) => ({
          id: place.place_id,
          name: place.name,
          vicinity: place.formatted_address,
          state: place.formatted_address?.split(',').pop()?.trim() || '',
          countryCode: 'US',
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

  const handleLocationSelect = (selectedLocation: any) => {
    if (params.returnTo === 'meeting-summary') {
      router.push({
        pathname: '/meeting-summary',
        params: {
          locationName: selectedLocation.name,
          countryCode: selectedLocation.countryCode,
          state: selectedLocation.state,
          vicinity: selectedLocation.vicinity,
          date: params.prevDate,
          note: params.prevNote
        }
      });
    } else {
      router.push({
        pathname: '/select-date',
        params: {
          locationName: selectedLocation.name,
          countryCode: selectedLocation.countryCode,
          state: selectedLocation.state,
          vicinity: selectedLocation.vicinity
        }
      });
    }
  };

  const LocationItem = ({ location }: { location: any }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationSelect(location)}
    >
      <View style={styles.locationInfo}>
        {location.name === 'Current Location' && (
          <View style={styles.currentLocationPin}>
            <Ionicons name="location" size={12} color="#FF3B30" />
          </View>
        )}
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.locationAddress}>
            {location.vicinity || location.state}, {location.countryCode}
          </Text>
        </View>
      </View>
      {location.distance !== undefined && (
        <Text style={styles.locationDistance}>{formatDistance(location.distance)}</Text>
      )}
    </TouchableOpacity>
  );

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
          <LocationItem key={location.id} location={location} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  currentLocationPin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationAddress: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  locationDistance: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
    marginLeft: 8,
  },
}); 