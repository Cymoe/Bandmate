import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" redirect />
        <Stack.Screen name="login" />
        <Stack.Screen name="onboarding/email" />
        <Stack.Screen name="onboarding/email-verification" />
        <Stack.Screen name="onboarding/verification-code" />
        <Stack.Screen name="onboarding/create-password" />
        <Stack.Screen name="onboarding/confirm-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
