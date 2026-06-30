// src/screens/HealScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Animated, Dimensions, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '../theme/tokens';
import { SectionHeader, BreathingCircle, PulsingDot, Divider } from '../components/UI';
import { MANTRAS, TRADITIONS } from '../data/research';
import type { Mantra, Tradition } from '../data/research';

const { width } = Dimensions.get('window');

interface ChanterPosition {
  x: number;
  y: number;
}

type HealTabId = 'muladhara' | 'gayatri' | 'traditions';

interface HealTab {
  id: HealTabId;
  label: string;
}

// Simulated chanter locations (in real app: backend/WebSocket)
const CHANTER_POSITIONS: ChanterPosition[] = [
  { x: 0.72, y: 0.42 }, { x: 0.25, y: 0.38 }, { x: 0.30, y: 0.60 },
  { x: 0.47, y: 0.28 }, { x: 0.55, y: 0.45 }, { x: 0.62, y: 0.60 },
  { x: 0.78, y: 0.65 }, { x: 0.18, y: 0.45 }, { x: 0.85, y: 0.42 },
  { x: 0.40, y: 0.35 }, { x: 0.50, y: 0.20 }, { x: 0.65, y: 0.30 },
];

const MAP_HEIGHT = 180;

export default function HealScreen() {
  const [activeTab, setActiveTab] = useState<HealTabId>('muladhara');
  const [activeMantra, setActiveMantra] = useState<string | null>(null);
  const [repeatCounts, setRepeatCounts] = useState<Record<string, number>>({});
  const [liveUsers, setLiveUsers] = useState(2847);
  const [todayTotal, setTodayTotal] = useState(14293);
  const [syncJoined, setSyncJoined] = useState(false);
  const [countdown, setCountdown] = useState('');

  // Animate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(u => u + Math.floor(Math.random() * 5) - 2);
      setTodayTotal(t => t + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Countdown to 6 AM IST
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const ist = new Date(now.getTime() + istOffset - now.getTimezoneOffset() * 60000);
      const next = new Date(ist);
      next.setHours(6, 0, 0, 0);
      if (ist >= next) next.setDate(next.getDate() + 1);
      const diff = next.getTime() - ist.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setCountdown(`${h}h ${m}m`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  const onRepeat = (mantraId: string) => {
    setRepeatCounts(c => ({ ...c, [mantraId]: Math.min((c[mantraId] || 0) + 1, 108) }));
  };

  const TABS: HealTab[] = [
    { id: 'muladhara', label: 'Muladhara' },
    { id: 'gayatri',   label: 'Gayatri' },
    { id: 'traditions', label: 'All Traditions' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <LinearGradient colors={['rgba(61,46,20,0.4)', Colors.void]} style={styles.hero}>
          <BreathingCircle size={100} color={Colors.gold}>
            <Text style={{ fontSize: 44 }}>🙏</Text>
          </BreathingCircle>
          <Text style={styles.heroEyebrow}>LAYER III · HEAL</Text>
          <Text style={styles.heroTitle}>Begin the{'\n'}
            <Text style={{ color: Colors.paleGold }}>return</Text>
          </Text>
          <Text style={styles.heroSub}>The mantra carries the frequency of what has been lost. Even one voice is a return to Prithvi.</Text>
        </LinearGradient>

        {/* Live Heatmap */}
        <View style={styles.heatmapCard}>
          <View style={styles.heatmapHeader}>
            <Text style={styles.heatmapTitle}>Chanting Right Now</Text>
            <View style={styles.liveRow}>
              <PulsingDot color={Colors.verified} size={7} />
              <Text style={styles.liveLabel}>LIVE</Text>
            </View>
          </View>

          {/* World map */}
          <View style={styles.mapContainer}>
            <WorldMap />
            {CHANTER_POSITIONS.map((pos, i) => (
              <ChanterDot key={i} x={pos.x} y={pos.y} delay={i * 0.4} />
            ))}
          </View>

          <View style={styles.statsRow}>
            <StatPill num={liveUsers.toLocaleString()} label="Chanting Now" />
            <StatPill num="38" label="Countries" />
            <StatPill num={todayTotal.toLocaleString()} label="Today Total" />
          </View>
        </View>

        {/* Universal Sync */}
        <View style={styles.syncBanner}>
          <View>
            <Text style={styles.syncLabel}>UNIVERSAL SYNC CHANTING</Text>
            <Text style={styles.syncTime}>06:00 AM IST</Text>
            <Text style={styles.syncCountdown}>Next: in {countdown}</Text>
          </View>
          <TouchableOpacity
            style={[styles.syncBtn, syncJoined && styles.syncBtnJoined]}
            onPress={() => setSyncJoined(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.syncBtnText, syncJoined && { color: Colors.void }]}>
              {syncJoined ? '✓ Joined' : 'Join Sync'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chanting tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab content */}
        {activeTab === 'muladhara' && (
          <View style={styles.tabContent}>
            {MANTRAS.filter(m => m.id === 'lam' || m.id === 'bhumi-sukta').map(m => (
              <MantraCard
                key={m.id}
                mantra={m}
                active={activeMantra === m.id}
                repeatCount={repeatCounts[m.id] || 0}
                onPlay={() => setActiveMantra(activeMantra === m.id ? null : m.id)}
                onRepeat={() => onRepeat(m.id)}
              />
            ))}
            <DharmicInsight
              title="Why Muladhara First?"
              text="The Vedic healing tradition always begins at the root. You cannot heal the crown without first healing the root. Muladhara governs survival, physical body, and the relationship with Earth. It is the first chakra blocked by ecological grief, and the first to heal through Prithvi tattva restoration."
              source="Kundalini Yoga / Tantric tradition"
            />
          </View>
        )}

        {activeTab === 'gayatri' && (
          <View style={styles.tabContent}>
            {MANTRAS.filter(m => m.id === 'gayatri').map(m => (
              <MantraCard
                key={m.id}
                mantra={m}
                active={activeMantra === m.id}
                repeatCount={repeatCounts[m.id] || 0}
                onPlay={() => setActiveMantra(activeMantra === m.id ? null : m.id)}
                onRepeat={() => onRepeat(m.id)}
              />
            ))}
            <DharmicInsight
              title="Gayatri and the Earth frequency"
              text="The Gayatri Mantra begins with Bhu — Earth. Every recitation is grounded in Prithvi before ascending. Traditionally chanted at dawn and dusk — the threshold times when Earth's frequency shifts. 108 repetitions is a complete healing cycle: the number relates to the distance of the Sun and Moon to Earth in solar diameters."
              source="Rigveda 3.62.10 / Gayatri Upanishad / Vedic astronomy"
            />
          </View>
        )}

        {activeTab === 'traditions' && (
          <View style={styles.tabContent}>
            <Text style={styles.tradIntro}>The same wound appears in every tradition. Different languages — same healing frequency. God is everywhere. Purity is universal.</Text>
            {TRADITIONS.map(t => (
              <TraditionCard key={t.id} tradition={t} />
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Mantra Card ───────────────────────────────────────────────────────────
interface MantraCardProps {
  mantra: Mantra;
  active: boolean;
  repeatCount: number;
  onPlay: () => void;
  onRepeat: () => void;
}

function MantraCard({ mantra, active, repeatCount, onPlay, onRepeat }: MantraCardProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (active) {
      progressRef.current = Animated.loop(
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: mantra.duration * 1000,
          useNativeDriver: false,
        })
      );
      progressRef.current.start(({ finished }) => {
        if (finished) onRepeat();
      });
    } else {
      progressRef.current?.stop();
      progressAnim.setValue(0);
    }
    return () => progressRef.current?.stop();
  }, [active]);

  const malaDots = Array.from({ length: 12 }, (_, i) => i < Math.floor(repeatCount / 9));

  return (
    <View style={styles.mantraCard}>
      {/* Header */}
      <View style={styles.mantraHeader}>
        <View style={[styles.mantraThumb, { backgroundColor: Colors.ochre + '20' }]}>
          <Text style={styles.mantraThumbIcon}>{mantra.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.mantraName}>{mantra.name}</Text>
          <Text style={styles.mantraTradition}>{mantra.tradition}</Text>
          <Text style={styles.mantraChakra}>{mantra.chakra}</Text>
        </View>
      </View>

      {/* Mantra text */}
      <View style={styles.mantraTextBox}>
        <Text style={styles.mantraText}>{mantra.text}</Text>
        <Text style={styles.mantraRomanized}>{mantra.romanized}</Text>
      </View>
      <Text style={styles.mantraMeaning}>{mantra.meaning}</Text>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, {
            width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          }]} />
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => {}}>
          <Text style={styles.ctrlIcon}>🐢</Text>
          <Text style={styles.ctrlLabel}>Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playBtn, active && styles.playBtnActive]}
          onPress={onPlay}
          activeOpacity={0.85}
        >
          <Text style={styles.playBtnText}>{active ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctrlBtn} onPress={() => {}}>
          <Text style={styles.ctrlIcon}>🔁</Text>
          <Text style={styles.ctrlLabel}>Loop</Text>
        </TouchableOpacity>
      </View>

      {/* Mala counter */}
      <View style={styles.malaRow}>
        <Text style={styles.malaCount}>{repeatCount} / {mantra.repeats} repeats</Text>
        <View style={styles.malaDots}>
          {malaDots.map((done, i) => (
            <View key={i} style={[styles.malaDot, done && styles.malaDotDone]} />
          ))}
        </View>
      </View>

      {/* Why this mantra */}
      <View style={styles.whyBox}>
        <Text style={styles.whyLabel}>WHY THIS MANTRA HEALS</Text>
        <Text style={styles.whyText}>{mantra.why}</Text>
        <Text style={styles.whySource}>— {mantra.whySource}</Text>
      </View>
    </View>
  );
}

// ─── Dharmic Insight ───────────────────────────────────────────────────────
interface DharmicInsightProps {
  title: string;
  text: string;
  source: string;
}

function DharmicInsight({ title, text, source }: DharmicInsightProps) {
  return (
    <View style={styles.insightCard}>
      <Text style={styles.insightTitle}>{title}</Text>
      <Text style={styles.insightText}>{text}</Text>
      <Text style={styles.insightSource}>— {source}</Text>
    </View>
  );
}

// ─── Tradition Card ────────────────────────────────────────────────────────
interface TraditionCardProps {
  tradition: Tradition;
}

function TraditionCard({ tradition }: TraditionCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={[styles.tradCard, { borderLeftColor: tradition.color }]}>
      <TouchableOpacity style={styles.tradHeader} onPress={() => setExpanded(e => !e)} activeOpacity={0.85}>
        <Text style={styles.tradIcon}>{tradition.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.tradName}>{tradition.name}</Text>
          <Text style={styles.tradEssence} numberOfLines={expanded ? 0 : 2}>{tradition.essence}</Text>
        </View>
        <Text style={styles.tradChevron}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.tradBody}>
          {tradition.practices.map((p, i) => (
            <View key={i} style={styles.practiceRow}>
              <Text style={[styles.practiceName, { color: tradition.color }]}>{p.name}</Text>
              <Text style={styles.practiceDesc}>{p.desc}</Text>
              <Text style={styles.practiceChakra}>{p.chakra}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── World Map (simple SVG-like RN view) ──────────────────────────────────
function WorldMap() {
  return (
    <View style={styles.mapInner}>
      <Text style={styles.mapPlaceholder}>🌍</Text>
      <Text style={styles.mapSubtext}>Global chanting map</Text>
    </View>
  );
}

// ─── Chanter Dot ──────────────────────────────────────────────────────────
interface ChanterDotProps {
  x: number;
  y: number;
  delay: number;
}

function ChanterDot({ x, y, delay }: ChanterDotProps) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const start = () => {
      anim.setValue(0);
      Animated.sequence([
        Animated.delay(delay * 1000),
        Animated.timing(anim, { toValue: 1, duration: 2500, useNativeDriver: true }),
      ]).start(() => setTimeout(start, Math.random() * 3000 + 1000));
    };
    start();
  }, []);
  return (
    <Animated.View style={{
      position: 'absolute',
      left: `${x * 100}%`,
      top: y * MAP_HEIGHT,
      width: 12, height: 12, borderRadius: 6,
      backgroundColor: Colors.gold,
      opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.8, 0] }),
      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.5] }) }],
    }} />
  );
}

// ─── Stat Pill ─────────────────────────────────────────────────────────────
interface StatPillProps {
  num: string;
  label: string;
}

function StatPill({ num, label }: StatPillProps) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statNum}>{num}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.void },
  scroll: { flex: 1 },
  content: { paddingBottom: 100 },

  hero: { paddingTop: Spacing.lg, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.md, alignItems: 'center', gap: Spacing.md },
  heroEyebrow: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 3, color: Colors.ochre, textTransform: 'uppercase' },
  heroTitle: { fontSize: 30, color: Colors.parchment, fontFamily: 'serif', textAlign: 'center', lineHeight: 38 },
  heroSub: { fontSize: 15, color: Colors.ash, textAlign: 'center', lineHeight: 24, fontStyle: 'italic', maxWidth: 300 },

  heatmapCard: { margin: Spacing.md, backgroundColor: 'rgba(255,255,255,0.025)', borderWidth: 1, borderColor: 'rgba(193,125,60,0.2)', borderRadius: Radius.md, padding: Spacing.md },
  heatmapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  heatmapTitle: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, color: Colors.ochre, textTransform: 'uppercase' },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveLabel: { fontFamily: 'monospace', fontSize: 9, color: Colors.verified, letterSpacing: 1 },

  mapContainer: { height: MAP_HEIGHT, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: Radius.sm, marginBottom: Spacing.sm, overflow: 'hidden', position: 'relative' },
  mapInner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mapPlaceholder: { fontSize: 48, opacity: 0.15 },
  mapSubtext: { fontFamily: 'monospace', fontSize: 9, color: Colors.mud, letterSpacing: 1, marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statPill: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: Radius.sm, padding: 10, alignItems: 'center' },
  statNum: { fontFamily: 'monospace', fontSize: 18, color: Colors.gold, fontWeight: '700' },
  statLabel: { fontFamily: 'monospace', fontSize: 8, color: Colors.ash, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },

  syncBanner: { marginHorizontal: Spacing.md, marginBottom: Spacing.md, backgroundColor: 'rgba(201,150,42,0.08)', borderWidth: 1, borderColor: 'rgba(201,150,42,0.25)', borderRadius: Radius.md, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  syncLabel: { fontFamily: 'monospace', fontSize: 8, letterSpacing: 2, color: Colors.gold, textTransform: 'uppercase', marginBottom: 4 },
  syncTime: { fontSize: 22, color: Colors.parchment, fontFamily: 'serif' },
  syncCountdown: { fontSize: 12, color: Colors.ash },
  syncBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.gold, paddingHorizontal: 16, paddingVertical: 10, borderRadius: Radius.sm },
  syncBtnJoined: { backgroundColor: Colors.gold },
  syncBtnText: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: Colors.gold },

  tabsRow: { paddingHorizontal: Spacing.md, gap: 8, paddingBottom: 4, paddingTop: 4 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  tabActive: { backgroundColor: 'rgba(193,125,60,0.15)', borderColor: Colors.ochre },
  tabText: { fontFamily: 'monospace', fontSize: 10, color: Colors.ash, letterSpacing: 1, textTransform: 'uppercase' },
  tabTextActive: { color: Colors.ochre },

  tabContent: { padding: Spacing.md, gap: Spacing.md },

  mantraCard: { backgroundColor: 'rgba(255,255,255,0.025)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: Radius.md, padding: Spacing.md, gap: 12 },
  mantraHeader: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  mantraThumb: { width: 52, height: 52, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  mantraThumbIcon: { fontSize: 26 },
  mantraName: { fontSize: 17, color: Colors.parchment, fontFamily: 'serif' },
  mantraTradition: { fontFamily: 'monospace', fontSize: 9, color: Colors.ash, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
  mantraChakra: { fontSize: 12, color: Colors.ochre, marginTop: 3 },
  mantraTextBox: { backgroundColor: 'rgba(201,150,42,0.06)', borderRadius: Radius.sm, padding: Spacing.md, alignItems: 'center' },
  mantraText: { fontSize: 28, color: Colors.gold, fontFamily: 'serif', textAlign: 'center', lineHeight: 42 },
  mantraRomanized: { fontFamily: 'monospace', fontSize: 14, color: Colors.paleGold, letterSpacing: 3, marginTop: 6 },
  mantraMeaning: { fontSize: 13, color: Colors.ash, lineHeight: 21, fontStyle: 'italic' },
  progressWrap: { marginVertical: 2 },
  progressTrack: { height: 3, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.ochre, borderRadius: 2 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 28 },
  ctrlBtn: { alignItems: 'center', gap: 3 },
  ctrlIcon: { fontSize: 20 },
  ctrlLabel: { fontFamily: 'monospace', fontSize: 8, color: Colors.ash, textTransform: 'uppercase', letterSpacing: 1 },
  playBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.ochre, alignItems: 'center', justifyContent: 'center' },
  playBtnActive: { backgroundColor: Colors.gold },
  playBtnText: { fontSize: 24, color: Colors.void },
  malaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  malaCount: { fontFamily: 'monospace', fontSize: 10, color: Colors.ochre, letterSpacing: 1 },
  malaDots: { flexDirection: 'row', gap: 4 },
  malaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(193,125,60,0.2)', borderWidth: 1, borderColor: 'rgba(193,125,60,0.3)' },
  malaDotDone: { backgroundColor: Colors.ochre, borderColor: Colors.ochre },
  whyBox: { backgroundColor: 'rgba(201,150,42,0.05)', borderLeftWidth: 2, borderLeftColor: Colors.gold, paddingLeft: 12, paddingVertical: 10, borderRadius: 2 },
  whyLabel: { fontFamily: 'monospace', fontSize: 8, color: Colors.gold, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  whyText: { fontSize: 13, color: '#C4B080', lineHeight: 21, fontStyle: 'italic' },
  whySource: { fontSize: 10, color: Colors.stone, marginTop: 4, fontStyle: 'italic' },

  insightCard: { backgroundColor: 'rgba(201,150,42,0.06)', borderRadius: Radius.md, padding: Spacing.md, gap: 8 },
  insightTitle: { fontSize: 15, color: Colors.paleGold, fontFamily: 'serif' },
  insightText: { fontSize: 13, color: Colors.ash, lineHeight: 21, fontStyle: 'italic' },
  insightSource: { fontSize: 11, color: Colors.stone, fontStyle: 'italic' },

  tradIntro: { fontSize: 14, color: Colors.ash, lineHeight: 22, fontStyle: 'italic' },
  tradCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: Radius.md, borderLeftWidth: 3, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  tradHeader: { flexDirection: 'row', alignItems: 'flex-start', padding: Spacing.md, gap: 12 },
  tradIcon: { fontSize: 26 },
  tradName: { fontSize: 15, color: Colors.parchment, fontFamily: 'serif', marginBottom: 4 },
  tradEssence: { fontSize: 12, color: Colors.ash, lineHeight: 19 },
  tradChevron: { color: Colors.mud, fontSize: 10, marginTop: 4 },
  tradBody: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, gap: 10 },
  practiceRow: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  practiceName: { fontSize: 13, fontFamily: 'serif', marginBottom: 2 },
  practiceDesc: { fontSize: 12, color: Colors.ash, lineHeight: 18 },
  practiceChakra: { fontFamily: 'monospace', fontSize: 9, color: Colors.mud, marginTop: 3, letterSpacing: 1, textTransform: 'uppercase' },
});
