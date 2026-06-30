// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, StatusBar, Platform
} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer, type Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import WitnessScreen from './src/screens/WitnessScreen';
import UnderstandScreen from './src/screens/UnderstandScreen';
import HealScreen from './src/screens/HealScreen';
import { Colors, Spacing } from './src/theme/tokens';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

// ─── Intro Screen ──────────────────────────────────────────────────────────
interface IntroScreenProps {
  onComplete: () => void;
}

function IntroScreen({ onComplete }: IntroScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const breathAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathAnim, { toValue: 1.06, duration: 3000, useNativeDriver: true }),
        Animated.timing(breathAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleEnter = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 700, useNativeDriver: true }),
    ]).start(() => onComplete());
  };

  return (
    <Animated.View style={[styles.intro, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={[Colors.ground, Colors.void, Colors.void]}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View style={[styles.introCircle, { transform: [{ scale: breathAnim }] }]}>
        <Text style={styles.introGlyph}>🌍</Text>
      </Animated.View>

      <Text style={styles.introTitle}>Prithvi</Text>
      <Text style={styles.introSubtitle}>Muladhara</Text>

      <Text style={styles.introSkt}>माता भूमिः पुत्रोऽहं पृथिव्याः</Text>
      <Text style={styles.introTranslation}>"Earth is my mother. I am her child."</Text>
      <Text style={styles.introSource}>— Atharva Veda · Bhumi Sukta 12.1</Text>

      <Text style={styles.introDesc}>
        What has been taken from the Earth{'\n'}has been taken from you.{'\n\n'}
        Witness it. Understand it. Begin to heal it.
      </Text>

      <TouchableOpacity style={styles.introBtn} onPress={handleEnter} activeOpacity={0.8}>
        <Text style={styles.introBtnText}>Enter</Text>
      </TouchableOpacity>

      <Text style={styles.introDevotionNote}>A work of devotion</Text>
    </Animated.View>
  );
}

// ─── Custom Tab Bar ────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const TABS = [
    { name: 'Witness',    icon: '👁',  label: 'Witness' },
    { name: 'Understand', icon: '🧬', label: 'Understand' },
    { name: 'Heal',       icon: '🙏', label: 'Heal' },
  ];

  return (
    <View style={styles.tabBar}>
      <LinearGradient
        colors={['rgba(13,10,6,0)', 'rgba(13,10,6,0.97)']}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
      />
      <View style={styles.tabBarInner}>
        {TABS.map((tab, index) => {
          const focused = state.index === index;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabBarBtn}
              onPress={() => navigation.navigate(tab.name)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabBarIcon, focused && styles.tabBarIconActive]}>
                {tab.icon}
              </Text>
              <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive]}>
                {tab.label}
              </Text>
              {focused && <View style={styles.tabBarDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Root App ──────────────────────────────────────────────────────────────
export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={Colors.void} />

        {showIntro ? (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        ) : (
          <NavigationContainer theme={{ colors: { background: Colors.void } } as Theme}>
            <Tab.Navigator
              tabBar={props => <CustomTabBar {...props} />}
              screenOptions={{ headerShown: false }}
            >
              <Tab.Screen name="Witness"    component={WitnessScreen} />
              <Tab.Screen name="Understand" component={UnderstandScreen} />
              <Tab.Screen name="Heal"       component={HealScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    backgroundColor: Colors.void,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: 10,
  },
  introCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(193,125,60,0.1)',
    borderWidth: 1.5, borderColor: 'rgba(193,125,60,0.4)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
  },
  introGlyph: { fontSize: 56 },
  introTitle: {
    fontSize: 44, color: Colors.parchment,
    fontFamily: 'serif', letterSpacing: 2,
  },
  introSubtitle: {
    fontSize: 18, color: Colors.ochre,
    fontFamily: 'monospace', letterSpacing: 4,
    textTransform: 'uppercase', marginBottom: 16,
  },
  introSkt: {
    fontSize: 20, color: Colors.gold,
    fontFamily: 'serif', textAlign: 'center',
    lineHeight: 32, marginBottom: 4,
    opacity: 0.8,
  },
  introTranslation: {
    fontSize: 14, color: Colors.ash,
    fontStyle: 'italic', textAlign: 'center',
  },
  introSource: {
    fontSize: 11, color: Colors.mud,
    fontFamily: 'monospace', letterSpacing: 0.5,
    marginBottom: 16,
  },
  introDesc: {
    fontSize: 16, color: Colors.ash,
    textAlign: 'center', lineHeight: 26,
    fontStyle: 'italic', maxWidth: 280,
    marginBottom: 20,
  },
  introBtn: {
    borderWidth: 1, borderColor: Colors.ochre,
    paddingHorizontal: 40, paddingVertical: 14,
    borderRadius: 2,
  },
  introBtnText: {
    color: Colors.parchment, fontSize: 18,
    fontFamily: 'serif', letterSpacing: 3,
  },
  introDevotionNote: {
    fontFamily: 'monospace', fontSize: 9,
    color: Colors.mud, letterSpacing: 2,
    textTransform: 'uppercase', marginTop: 10,
  },

  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingTop: 20,
  },
  tabBarInner: {
    flexDirection: 'row',
    borderTopWidth: 1, borderTopColor: 'rgba(193,125,60,0.12)',
    backgroundColor: 'rgba(13,10,6,0.97)',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 10,
  },
  tabBarBtn: {
    flex: 1, alignItems: 'center', gap: 3,
  },
  tabBarIcon: { fontSize: 22, opacity: 0.3 },
  tabBarIconActive: { opacity: 1 },
  tabBarLabel: {
    fontFamily: 'monospace', fontSize: 9,
    letterSpacing: 1, textTransform: 'uppercase',
    color: Colors.stone,
  },
  tabBarLabelActive: { color: Colors.gold },
  tabBarDot: {
    width: 3, height: 3, borderRadius: 1.5,
    backgroundColor: Colors.gold,
    marginTop: 2,
  },
});
