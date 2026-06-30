// src/screens/UnderstandScreen.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Animated, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '../theme/tokens';
import { SectionHeader, SourceTag, DharmicNote, FrequencyNote, BreathingCircle, Divider } from '../components/UI';
import { FREQUENCIES } from '../data/research';

interface Chakra {
  name: string;
  en: string;
  color: string;
  element: string;
  icon: string;
  active: boolean;
}

type EvidenceType = 'science' | 'observed' | 'dharmic';

interface Evidence {
  title: string;
  type: EvidenceType;
  text: string;
  source: string;
}

const CHAKRAS: Chakra[] = [
  { name: 'Sahasrara', en: 'Crown',        color: '#7A3A9A', element: 'Akasha',  icon: '🪷', active: false },
  { name: 'Ajna',      en: 'Third Eye',    color: '#4A3A9A', element: 'Light',   icon: '👁',  active: false },
  { name: 'Vishuddha', en: 'Throat',       color: '#2A6A9A', element: 'Akasha',  icon: '🎵', active: false },
  { name: 'Anahata',   en: 'Heart',        color: '#3A7A4A', element: 'Vayu',    icon: '💚', active: false },
  { name: 'Manipura',  en: 'Solar Plexus', color: '#C09020', element: 'Agni',    icon: '🔥', active: false },
  { name: 'Svadhisthana', en: 'Sacral',   color: '#C05520', element: 'Jala',    icon: '🌊', active: false },
  { name: 'Muladhara', en: 'Root',        color: '#B03020', element: 'Prithvi', icon: '🌍', active: true  },
];

const BRIDGE = {
  inner: ['Survival anxiety', 'Bone / joint weakness', 'Mineral deficiencies', 'Loss of belonging', 'Body disconnection', 'Immune dysfunction'],
  outer: ['Soil degradation', 'Sacred glacier loss', 'Food mineral collapse', 'Forest destruction', 'Ancestral land loss', 'Toxic rivers'],
};

const EVIDENCE: Evidence[] = [
  {
    title: 'Mineral depletion → Bone density loss',
    type: 'science',
    text: 'Copper in vegetables has declined 76% since 1940. Copper is directly required for bone collagen formation. US NHANES 2013–14 shows measurable bone mineral density decline — first such drop after decades of stability. The soil → food → body chain is now measurably broken.',
    source: 'NHANES / McCance & Widdowson / PubMed 2018',
  },
  {
    title: 'Earth\'s frequency and human biology',
    type: 'science',
    text: 'The Schumann Resonance (Earth\'s EM heartbeat) sits at 7.83 Hz. Human brain theta waves (healing/meditation state) overlap at 4–8 Hz. NASA discovered that early astronauts deteriorated without exposure to Schumann Resonance — they now include EM field generators as standard equipment. This is the most verified evidence that human biology requires Earth\'s frequency.',
    source: 'Schumann 1952 / NASA aerospace medicine',
  },
  {
    title: '432 Hz → 440 Hz: The frequency divorce',
    type: 'observed',
    text: 'Until 1939, most musical instruments globally were tuned to 432 Hz — the frequency that harmonically resonates with the Schumann Resonance through octave scaling. In 1939, the ISO standardised music at 440 Hz. Many researchers and traditional musicians consider this shift a systemic disconnection of human sound from Earth\'s natural resonance.',
    source: 'ISO 16:1975 / Musicological debate — contested',
  },
  {
    title: 'Water memory and sacred sound',
    type: 'observed',
    text: 'Dr. Masaru Emoto\'s research (Messages from Water, 1999) documented that water crystals form strikingly different structures when exposed to different words, intentions, and music. Polluted water showed chaotic structures; water exposed to sacred chanting showed coherent geometric patterns. Since soil and the human body are 60–70% water, this has direct implications for how sound affects physical form.',
    source: 'Emoto, Messages from Water (1999) — widely cited, scientifically contested',
  },
  {
    title: 'Sacred geography and electromagnetic fields',
    type: 'observed',
    text: 'Pilgrimage sites across traditions correlate measurably with elevated geomagnetic activity and quartz-rich geology. Stonehenge, Hindu tirthas, Chartres Cathedral, and indigenous sacred sites all show distinct EM signatures from surrounding areas. The healing reported at these sites may have a verifiable geophysical basis.',
    source: 'Archaeoacoustics research / geomagnetic surveys',
  },
  {
    title: 'Collective Muladhara crisis',
    type: 'observed',
    text: '3.2 billion people\'s wellbeing is already compromised by soil erosion (FAO). When survival is threatened at mass scale — food scarcity, displacement, drought — the collective Muladhara enters chronic activation. Anxiety disorders, insomnia, and chronic pain (all Muladhara symptoms) have risen in direct proportion to environmental degradation rates since 1950.',
    source: 'FAO / IPBES / WHO mental health data — correlation noted',
  },
];

export default function UnderstandScreen() {
  const [selectedFreq, setSelectedFreq] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <LinearGradient colors={['rgba(176,48,32,0.15)', Colors.void]} style={styles.hero}>
          <BreathingCircle size={100} color={Colors.muladhara}>
            <Text style={{ fontSize: 44 }}>🌍</Text>
          </BreathingCircle>
          <Text style={styles.heroEyebrow}>LAYER II · UNDERSTAND</Text>
          <Text style={styles.heroTitle}>What this means{'\n'}
            <Text style={{ color: Colors.paleGold }}>for you</Text>
          </Text>
          <Text style={styles.heroSub}>The outer damage is not separate from the inner. Prithvi's depletion maps exactly to Muladhara — your root chakra.</Text>
        </LinearGradient>

        {/* Chakra Spine */}
        <View style={styles.spineSection}>
          <SectionHeader eyebrow="Chakra Map" title="The Root is First" />
          <View style={styles.spine}>
            {/* Spine line */}
            <View style={styles.spineLine} />
            {CHAKRAS.map((c, i) => (
              <ChakraRow key={c.name} chakra={c} isLeft={i % 2 === 0} />
            ))}
          </View>

          <DharmicNote
            text="The Chakra system maps onto both individual human physiology and collective Earth ecology. Muladhara — the root — corresponds to Prithvi tattva. When the outer Earth loses coherence, the inner root loses grounding. This is the Vedic understanding of why ecological crisis is simultaneously a spiritual crisis."
            source="Tantric yoga / Kundalini tradition"
          />
        </View>

        <Divider />

        {/* Inner–Outer Bridge */}
        <View style={styles.bridgeSection}>
          <SectionHeader
            eyebrow="The Correspondence"
            title="Inner depletion ↔ Outer depletion"
            subtitle="These are not metaphors. They are descriptions of the same withdrawal of Prithvi tattva at two different scales."
          />
          <View style={styles.bridgeGrid}>
            <View style={styles.bridgeCol}>
              <Text style={[styles.bridgeLabel, { color: Colors.muladhara }]}>Inner · Body</Text>
              {BRIDGE.inner.map((item, i) => (
                <View key={i} style={styles.bridgeItem}>
                  <Text style={styles.bridgeItemText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.bridgeDivider} />
            <View style={styles.bridgeCol}>
              <Text style={[styles.bridgeLabel, { color: Colors.sage }]}>Outer · Earth</Text>
              {BRIDGE.outer.map((item, i) => (
                <View key={i} style={styles.bridgeItem}>
                  <Text style={styles.bridgeItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Divider />

        {/* Frequency Layer */}
        <View style={styles.freqSection}>
          <SectionHeader
            eyebrow="Frequency & Vibration"
            title="The energy layer of depletion"
            subtitle="Beyond the physical, there is a frequency dimension to what is being lost — and what can be restored."
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.freqScroll}>
            {FREQUENCIES.map((f) => (
              <TouchableOpacity
                key={f.hz}
                style={[styles.freqCard, selectedFreq === f.hz && styles.freqCardSelected, { borderColor: selectedFreq === f.hz ? f.color : 'rgba(255,255,255,0.06)' }]}
                onPress={() => setSelectedFreq(selectedFreq === f.hz ? null : f.hz)}
                activeOpacity={0.85}
              >
                <View style={[styles.freqCircle, { backgroundColor: f.color + '40' }]}>
                  <Text style={[styles.freqHz, { color: f.color }]}>{f.hz}</Text>
                  <Text style={[styles.freqHzLabel, { color: f.color + 'AA' }]}>Hz</Text>
                </View>
                <Text style={styles.freqName}>{f.name}</Text>
                <Text style={styles.freqElement}>{f.element}</Text>

                {selectedFreq === f.hz && (
                  <View style={styles.freqExpanded}>
                    <Text style={styles.freqChakra}>{f.chakra}</Text>
                    <Text style={styles.freqEffect}>{f.effect}</Text>
                    <Text style={styles.freqConnection}>{f.connection}</Text>
                    <SourceTag type={f.type} />
                    {f.source && <Text style={styles.freqSource}>— {f.source}</Text>}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Divider />

        {/* Evidence */}
        <View style={styles.evidenceSection}>
          <SectionHeader
            eyebrow="Evidence"
            title="Science, dharma & observation"
          />
          {EVIDENCE.map((ev, i) => (
            <EvidenceCard key={i} ev={ev} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

interface ChakraRowProps {
  chakra: Chakra;
  isLeft: boolean;
}

function ChakraRow({ chakra, isLeft }: ChakraRowProps) {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (chakra.active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.15, duration: 1500, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
        ])
      ).start();
    }
  }, []);

  return (
    <View style={[styles.chakraRow, isLeft ? styles.chakraLeft : styles.chakraRight]}>
      <Animated.View style={[
        styles.chakraDot,
        { backgroundColor: chakra.color + '20', borderColor: chakra.color + (chakra.active ? 'CC' : '50') },
        chakra.active && { transform: [{ scale: pulse }] },
      ]}>
        <Text style={styles.chakraIcon}>{chakra.icon}</Text>
      </Animated.View>
      <View style={[styles.chakraInfo, isLeft ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
        <Text style={[styles.chakraName, { color: chakra.active ? chakra.color : Colors.ochre }]}>{chakra.name}</Text>
        <Text style={styles.chakraEn}>{chakra.en} · {chakra.element}</Text>
        {chakra.active && <Text style={[styles.chakraActive, { color: chakra.color }]}>⟵ Healing begins here</Text>}
      </View>
    </View>
  );
}

interface EvidenceCardProps {
  ev: Evidence;
}

function EvidenceCard({ ev }: EvidenceCardProps) {
  const typeConfig = {
    science:  { label: 'Science', color: '#3A7A4A', bg: 'rgba(58,122,74,0.08)' },
    observed: { label: 'Observed', color: '#8A4A3A', bg: 'rgba(138,74,58,0.08)' },
    dharmic:  { label: 'Dharmic', color: '#C9962A', bg: 'rgba(201,150,42,0.08)' },
  };
  const c = typeConfig[ev.type] || typeConfig.observed;
  return (
    <View style={[styles.evCard, { backgroundColor: c.bg }]}>
      <View style={styles.evHeader}>
        <Text style={styles.evTitle}>{ev.title}</Text>
        <SourceTag type={ev.type} />
      </View>
      <Text style={styles.evText}>{ev.text}</Text>
      {ev.source && <Text style={styles.evSource}>— {ev.source}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.void },
  scroll: { flex: 1 },
  content: { paddingBottom: 100 },

  hero: {
    paddingTop: Spacing.lg, paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.md, alignItems: 'center', gap: Spacing.md,
  },
  heroEyebrow: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 3, color: Colors.ochre, textTransform: 'uppercase' },
  heroTitle: { fontSize: 30, color: Colors.parchment, fontFamily: 'serif', textAlign: 'center', lineHeight: 38 },
  heroSub: { fontSize: 15, color: Colors.ash, textAlign: 'center', lineHeight: 24, fontStyle: 'italic', maxWidth: 300 },

  spineSection: { padding: Spacing.md, paddingBottom: Spacing.lg },
  spine: { alignItems: 'center', paddingVertical: Spacing.md, position: 'relative', gap: 6 },
  spineLine: {
    position: 'absolute', top: Spacing.lg, bottom: Spacing.lg,
    width: 1, backgroundColor: 'rgba(176,48,32,0.2)',
  },
  chakraRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: Spacing.lg, gap: 14 },
  chakraLeft: { flexDirection: 'row-reverse' },
  chakraRight: { flexDirection: 'row' },
  chakraDot: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  chakraIcon: { fontSize: 20 },
  chakraInfo: { flex: 1 },
  chakraName: { fontSize: 15, fontFamily: 'serif' },
  chakraEn: { fontFamily: 'monospace', fontSize: 9, color: Colors.ash, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 },
  chakraActive: { fontSize: 11, fontStyle: 'italic', marginTop: 3 },

  bridgeSection: { padding: Spacing.md, paddingBottom: Spacing.lg },
  bridgeGrid: { flexDirection: 'row', gap: 0, marginTop: 4 },
  bridgeCol: { flex: 1 },
  bridgeDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginHorizontal: 10 },
  bridgeLabel: { fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  bridgeItem: { paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  bridgeItemText: { fontSize: 12, color: Colors.ash, lineHeight: 18 },

  freqSection: { paddingBottom: Spacing.lg },
  freqScroll: { paddingHorizontal: Spacing.md, gap: 10, paddingBottom: 4 },
  freqCard: {
    width: 160,
    backgroundColor: 'rgba(255,255,255,0.025)',
    borderWidth: 1, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center',
  },
  freqCardSelected: { backgroundColor: 'rgba(255,255,255,0.05)' },
  freqCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  freqHz: { fontFamily: 'monospace', fontSize: 22, fontWeight: '700' },
  freqHzLabel: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  freqName: { fontSize: 14, color: Colors.parchment, fontFamily: 'serif', marginBottom: 3 },
  freqElement: { fontSize: 10, color: Colors.ash, textAlign: 'center' },
  freqExpanded: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: 6 },
  freqChakra: { fontFamily: 'monospace', fontSize: 9, color: Colors.ochre, letterSpacing: 1, textTransform: 'uppercase' },
  freqEffect: { fontSize: 12, color: Colors.parchment, lineHeight: 19 },
  freqConnection: { fontSize: 12, color: Colors.ash, lineHeight: 19, fontStyle: 'italic' },
  freqSource: { fontSize: 10, color: Colors.stone, fontStyle: 'italic', marginTop: 4 },

  evidenceSection: { padding: Spacing.md, paddingBottom: Spacing.lg, gap: Spacing.sm },
  evCard: { borderRadius: Radius.md, padding: Spacing.md, gap: 8 },
  evHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  evTitle: { fontSize: 14, color: Colors.parchment, fontFamily: 'serif', flex: 1, lineHeight: 20 },
  evText: { fontSize: 13, color: Colors.ash, lineHeight: 21 },
  evSource: { fontSize: 10, color: Colors.stone, fontStyle: 'italic' },
});
