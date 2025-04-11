import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/useColorScheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'), // Using SpaceMono as fallback
    'Poppins-Medium': require('../assets/fonts/SpaceMono-Regular.ttf'),  // Using SpaceMono as fallback
    'Poppins-SemiBold': require('../assets/fonts/SpaceMono-Regular.ttf'), // Using SpaceMono as fallback
    'Poppins-Bold': require('../assets/fonts/SpaceMono-Regular.ttf'),    // Using SpaceMono as fallback
    'AbrilFatface-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'), // Using SpaceMono as fallback temporarily
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#FFFFFF',
            headerTitle: '',
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="onboarding/email" />
          <Stack.Screen name="onboarding/email-verification" />
          <Stack.Screen name="onboarding/verification-code" />
          <Stack.Screen name="onboarding/create-password" />
          <Stack.Screen name="onboarding/confirm-password" />
          <Stack.Screen name="onboarding/location" />
          <Stack.Screen name="onboarding/pictures" />
          <Stack.Screen name="onboarding/about-you" />
          <Stack.Screen name="onboarding/notifications" />
          <Stack.Screen name="onboarding/success" />
          <Stack.Screen name="onboarding/welcome" />
          <Stack.Screen name="matches" />
          <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
          <Stack.Screen
            name="filters"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="artist-profile" 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="band-profile" 
            options={{ headerShown: true }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
