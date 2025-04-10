import React from 'react';

export interface MusicianProfile {
  id: string;
  name: string;
  age: number;
  primaryInstrument: string;
  genres: string[];
  bio: string;
  distance: number;
  imageUri: string;
}

// This exports an empty component to satisfy the requirement
// for a default export in Expo Router
export default function Types() {
  return null;
} 