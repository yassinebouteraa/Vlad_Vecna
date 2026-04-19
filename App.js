import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, I18nManager, Animated, Easing } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Cairo_400Regular, Cairo_600SemiBold, Cairo_700Bold, Cairo_800ExtraBold } from '@expo-google-fonts/cairo';

import { 
  PlusJakartaSans_400Regular, 
  PlusJakartaSans_500Medium, 
  PlusJakartaSans_600SemiBold, 
  PlusJakartaSans_700Bold, 
  PlusJakartaSans_800ExtraBold 
} from '@expo-google-fonts/plus-jakarta-sans';

import { colors } from './src/theme';
import { discoveries as initialDiscoveries, badges } from './src/data';
import TopBar from './src/components/TopBar';
import BottomNav from './src/components/BottomNav';
import ScanScreen from './src/screens/ScanScreen';
import CodexScreen from './src/screens/CodexScreen';
import MapScreen from './src/screens/MapScreen';
import BadgesScreen from './src/screens/BadgesScreen';
import LoginScreen from './src/screens/LoginScreen';

if (!I18nManager.isRTL) {
  try { I18nManager.allowRTL(true); I18nManager.forceRTL(true); } catch (e) {}
}

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('scan');
  const [totalXP, setTotalXP] = useState(680);
  const [discoveries, setDiscoveries] = useState(initialDiscoveries);
  const [coinAnim, setCoinAnim] = useState(null);

  const scoutName = 'أمين';
  const xpToNextLevel = 1000;

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Cairo_400Regular, 
    Cairo_600SemiBold, 
    Cairo_700Bold, 
    Cairo_800ExtraBold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const flyCoinAndAward = (xp) => {
    const y = new Animated.Value(500);
    const x = new Animated.Value(0);
    const rotate = new Animated.Value(0);
    const scale = new Animated.Value(1);
    const opacity = new Animated.Value(1);

    const anim = { y, x, rotate, scale, opacity };
    setCoinAnim(anim);

    Animated.parallel([
      Animated.timing(y, { toValue: 0, duration: 900, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(x, { toValue: 40, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 1, duration: 900, easing: Easing.linear, useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.3, duration: 200, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.6, duration: 700, useNativeDriver: true })
      ]),
      Animated.sequence([
        Animated.delay(700),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true })
      ])
    ]).start(() => {
      setTotalXP(n => n + xp);
      setCoinAnim(null);
    });
  };

  const handleAddResult = (aiResult) => {
    const newDiscovery = {
      id: 'd' + Date.now(),
      emoji: aiResult.emoji,
      nameAr: aiResult.nameAr,
      rarity: aiResult.rarity,
      xp: aiResult.xp,
      date: 'الآن',
      coords: { latitude: 36.8065 + Math.random() * 0.04, longitude: 10.1815 + Math.random() * 0.04 }
    };
    setDiscoveries(d => [newDiscovery, ...d]);
    flyCoinAndAward(aiResult.xp);
  };

  const handleRetry = () => {
    // Logic if needed
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.root} edges={['top']} onLayout={onLayoutRootView}>
          <ExpoStatusBar style="dark" />
          <LoginScreen onLogin={handleLogin} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top']} onLayout={onLayoutRootView}>
        <ExpoStatusBar style="dark" />

        <TopBar scoutName={scoutName} totalXP={totalXP} xpToNextLevel={xpToNextLevel} coinAnim={coinAnim} />

        <View style={styles.content}>
          {currentScreen === 'scan' && (
            <ScanScreen 
              onAddResult={handleAddResult} 
              onRetry={handleRetry} 
            />
          )}
          {currentScreen === 'codex' && <CodexScreen discoveries={discoveries} />}
          {currentScreen === 'map' && <MapScreen discoveries={discoveries} />}
          {currentScreen === 'badges' && <BadgesScreen badges={badges} />}
        </View>

        <BottomNav current={currentScreen} onChange={setCurrentScreen} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { flex: 1, backgroundColor: colors.surface }
});
