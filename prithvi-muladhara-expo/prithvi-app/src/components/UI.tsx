// src/components/UI.tsx
import React, { ReactNode, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated
} from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme/tokens';
import type { SourceType } from '../data/research';

// ─── Source Tag ────────────────────────────────────────────────────────────
type SourceTagType = SourceType | 'science';

interface SourceTagProps {
  type?: SourceTagType;
}

export function SourceTag({ type }: SourceTagProps) {
  const config = {
    verified:    { label: 'Verified', bg: 'rgba(58,122,74,0.2)',  text: '#6ABF7E', border: 'rgba(58,122,74,0.35)' },
    dharmic:     { label: 'Dharmic',  bg: 'rgba(201,150,42,0.2)', text: '#D4A843', border: 'rgba(201,150,42,0.35)' },
    observed:    { label: 'Observed', bg: 'rgba(138,74,58,0.2)',  text: '#C47060', border: 'rgba(138,74,58,0.35)' },
  } as const;
  const c = type && type in config ? config[type as SourceType] : config.observed;
  return (
    <View style={[styles.tag, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.tagText, { color: c.text }]}>{c.label}</Text>
    </View>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

// ─── Dharmic Note ──────────────────────────────────────────────────────────
interface TextSourceProps {
  text: string;
  source?: string;
}

export function DharmicNote({ text, source }: TextSourceProps) {
  return (
    <View style={styles.dharmicNote}>
      <View style={styles.dharmicBorder} />
      <View style={styles.dharmicContent}>
        <Text style={styles.dharmicLabel}>Dharmic Context</Text>
        <Text style={styles.dharmicText}>{text}</Text>
        {source && <Text style={styles.dharmicSource}>— {source}</Text>}
      </View>
    </View>
  );
}

// ─── Frequency Note ────────────────────────────────────────────────────────
interface FrequencyNoteProps extends TextSourceProps {
  type?: SourceType;
}

export function FrequencyNote({ text, source, type }: FrequencyNoteProps) {
  return (
    <View style={styles.frequencyNote}>
      <View style={styles.freqBorder} />
      <View style={styles.dharmicContent}>
        <View style={styles.freqLabelRow}>
          <Text style={styles.freqLabel}>Frequency / Energy</Text>
          <SourceTag type={type || 'observed'} />
        </View>
        <Text style={styles.dharmicText}>{text}</Text>
        {source && <Text style={styles.dharmicSource}>— {source}</Text>}
      </View>
    </View>
  );
}

// ─── Depletion Bar ─────────────────────────────────────────────────────────
interface DepletionBarProps {
  pct: number;
  color?: string;
}

export function DepletionBar({ pct, color }: DepletionBarProps) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: pct,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [pct]);
  return (
    <View style={styles.barTrack}>
      <Animated.View
        style={[
          styles.barFill,
          {
            width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            backgroundColor: color || Colors.muladhara,
          },
        ]}
      />
    </View>
  );
}

// ─── Pulsing Dot ───────────────────────────────────────────────────────────
interface PulsingDotProps {
  color?: string;
  size?: number;
}

export function PulsingDot({ color = Colors.muladhara, size = 10 }: PulsingDotProps) {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1.6, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color,
      transform: [{ scale: anim }],
      opacity: anim.interpolate({ inputRange: [1, 1.6], outputRange: [1, 0.3] }),
    }} />
  );
}

// ─── Fact Row ──────────────────────────────────────────────────────────────
interface FactRowProps {
  stat: string;
  desc: string;
  source?: string;
  type: SourceType;
}

export function FactRow({ stat, desc, source, type }: FactRowProps) {
  return (
    <View style={styles.factRow}>
      <Text style={styles.factStat}>{stat}</Text>
      <View style={styles.factRight}>
        <Text style={styles.factDesc}>{desc}</Text>
        <View style={styles.factMeta}>
          {source && <Text style={styles.factSource}>{source}</Text>}
          <SourceTag type={type} />
        </View>
      </View>
    </View>
  );
}

// ─── Sacred Divider ────────────────────────────────────────────────────────
export function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerSymbol}>✦</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

// ─── Breathing Circle ─────────────────────────────────────────────────────
interface BreathingCircleProps {
  size?: number;
  color?: string;
  children?: ReactNode;
}

export function BreathingCircle({ size = 120, color = Colors.muladhara, children }: BreathingCircleProps) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 3000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: `${color}18`,
      borderWidth: 1, borderColor: `${color}60`,
      alignItems: 'center', justifyContent: 'center',
      transform: [{ scale }],
    }}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: Radius.sm, borderWidth: 1,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontFamily: 'monospace',
    fontSize: 9, letterSpacing: 1, textTransform: 'uppercase',
  },
  sectionHeader: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md },
  eyebrow: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    color: Colors.ochre, textTransform: 'uppercase', marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 26, color: Colors.parchment,
    fontFamily: 'serif', lineHeight: 32, marginBottom: 6,
  },
  sectionSubtitle: { fontSize: 14, color: Colors.ash, lineHeight: 22 },

  dharmicNote: {
    flexDirection: 'row', marginTop: Spacing.md,
    backgroundColor: 'rgba(201,150,42,0.05)',
    borderRadius: Radius.md, overflow: 'hidden',
  },
  dharmicBorder: { width: 2, backgroundColor: Colors.gold },
  dharmicContent: { flex: 1, padding: Spacing.md },
  dharmicLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.5,
    color: Colors.gold, textTransform: 'uppercase', marginBottom: 6,
  },
  dharmicText: { fontSize: 13, color: '#C4B080', lineHeight: 21, fontStyle: 'italic' },
  dharmicSource: { fontSize: 11, color: Colors.stone, marginTop: 6, fontStyle: 'italic' },

  frequencyNote: {
    flexDirection: 'row', marginTop: Spacing.md,
    backgroundColor: 'rgba(42,74,122,0.08)',
    borderRadius: Radius.md, overflow: 'hidden',
  },
  freqBorder: { width: 2, backgroundColor: '#4A7AC0' },
  freqLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  freqLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.5,
    color: '#7AAAD4', textTransform: 'uppercase',
  },

  barTrack: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 2, overflow: 'hidden', marginVertical: Spacing.md,
  },
  barFill: { height: '100%', borderRadius: 2 },

  factRow: {
    flexDirection: 'row', gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  factStat: {
    fontFamily: 'monospace', fontSize: 12, color: '#D07060',
    fontWeight: '700', width: 64, flexShrink: 0, paddingTop: 2,
  },
  factRight: { flex: 1 },
  factDesc: { fontSize: 13, color: Colors.ash, lineHeight: 20, marginBottom: 5 },
  factMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  factSource: { fontSize: 10, color: Colors.stone, fontStyle: 'italic', flex: 1 },

  divider: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginVertical: Spacing.lg, paddingHorizontal: Spacing.md,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(193,125,60,0.15)' },
  dividerSymbol: { color: Colors.mud, fontSize: 10 },
});
