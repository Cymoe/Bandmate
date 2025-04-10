import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashScreen as CustomSplashScreen } from '@/components/SplashScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'), // Using SpaceMono as fallback
    'Poppins-Medium': require('../assets/fonts/SpaceMono-Regular.ttf'),  // Using SpaceMono as fallback
    'Poppins-SemiBold': require('../assets/fonts/SpaceMono-Regular.ttf'), // Using SpaceMono as fallback
    'Poppins-Bold': require('../assets/fonts/SpaceMono-Regular.ttf'),    // Using SpaceMono as fallback
    'AbrilFatface-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'), // Using SpaceMono as fallback temporarily
  });
  const [splashAnimationComplete, setSplashAnimationComplete] = useState(false);

  useEffect(() => {
    if (loaded) {
      // Hide the Expo splash screen
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Don't render anything until the fonts are loaded and splash screen animation is done
  if (!loaded || !splashAnimationComplete) {
    return loaded ? <CustomSplashScreen onAnimationComplete={() => setSplashAnimationComplete(true)} /> : null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            name="matching"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="filters"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="chats"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="events"
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
