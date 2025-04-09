import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationOption {
  name: string;
  region: string;
  country: string;
  distance: string;
}

interface LocationSearchModalProps {
  visible: boolean;
  searchQuery: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onSelectLocation: (location: LocationOption) => void;
}

const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  visible,
  searchQuery,
  onChangeText,
  onClose,
  onSelectLocation,
}) => {
  // Sample location data
  const locationOptions: LocationOption[] = [
    { name: 'San Francisco', region: 'CA', country: 'US', distance: '800m' },
    { name: 'Los Angeles', region: 'CA', country: 'US', distance: '48km' },
    { name: 'San Diego', region: 'CA', country: 'US', distance: '84km' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header with Search Bar */}
        <View style={styles.header}>
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={24} color="#FFFFFF" />
              <TextInput
                style={styles.searchInput}
                placeholder="Where are you located?"
                placeholderTextColor="#B3B3B3"
                value={searchQuery}
                onChangeText={onChangeText}
                autoFocus={true}
              />
              {searchQuery.length > 0 && (
                <View style={styles.cursor} />
              )}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#F8F9FB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Options */}
        <View style={styles.locationList}>
          {locationOptions.map((location, index) => (
            <React.Fragment key={location.name}>
              <TouchableOpacity 
                style={styles.locationItem}
                onPress={() => onSelectLocation(location)}
              >
                <View style={styles.locationContent}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationRegion}>{location.region}, {location.country}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.locationDistance}>{location.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {index < locationOptions.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: '#1F1F1F',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 40,
    backgroundColor: '#313131',
    borderRadius: 8,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  cursor: {
    width: 2,
    height: 16,
    backgroundColor: '#FF4B4B',
    borderRadius: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationList: {
    marginTop: 6,
  },
  locationItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  locationContent: {
    gap: 8,
  },
  locationName: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationRegion: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    letterSpacing: -1,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#828282',
    borderRadius: 100,
  },
  locationDistance: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: -1,
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
    marginLeft: 16,
  },
});

export default LocationSearchModal;
