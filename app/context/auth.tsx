import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

type AuthContextType = {
  signOut: () => void;
  // Add other auth-related functions and state as needed
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signOut = () => {
    // Clear auth state
    router.replace('/(auth)/sign-in');
  };

  return (
    <AuthContext.Provider value={{ signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 