// src/screens/WitnessScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '../theme/tokens';
import { SectionHeader, SourceTag, FactRow, DharmicNote, FrequencyNote, DepletionBar, BreathingCircle, Divider } from '../components/UI';
import { ERAS, DOMAINS } from '../data/research';
import type { Domain, Era, SourceType } from '../data/research';

const { width } = Dimensions.get('window');

export default function WitnessScreen() {
  const [expandedEra, setExpandedEra] = useState<string | null>(null);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <LinearGradient
          colors={['#1E1508', Colors.void]}
          style={styles.hero}
        >
          <BreathingCircle size={120} color={Colors.ochre}>
            <Text style={styles.heroGlyph}>🌍</Text>
          </BreathingCircle>

          <Text style={styles.heroEyebrow}>LAYER I · WITNESS</Text>
          <Text style={styles.heroTitle}>The Earth has been{'\n'}
            <Text style={{ color: Colors.paleGold }}>diminishing</Text>
          </Text>
          <Text style={styles.heroSub}>
            A recorded, timed history of Prithvi's depletion — in verified data and dharmic memory
          </Text>

          {/* Source legend */}
          <View style={styles.legend}>
            {([
              { type: 'verified', label: 'Verified / Peer-reviewed' },
              { type: 'dharmic',  label: 'Dharmic / Traditional' },
              { type: 'observed', label: 'Observed / Unverified' },
            ] satisfies { type: SourceType; label: string }[]).map(l => (
              <View key={l.type} style={styles.legendItem}>
                <SourceTag type={l.type} />
                <Text style={styles.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* ── Timeline ── */}
        <View style={styles.timelineSection}>
          <SectionHeader
            eyebrow="Timed History"
            title="The Long Withdrawal"
            subtitle="Tap any era to expand. The data and the dharma both tell the same story."
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eraScroll}
          >
            {ERAS.map((era) => (
              <EraCard
                key={era.id}
                era={era}
                expanded={expandedEra === era.id}
                onPress={() => setExpandedEra(expandedEra === era.id ? null : era.id)}
              />
            ))}
          </ScrollView>
        </View>

        <Divider />

        {/* ── Five Domains ── */}
        <View style={{ paddingBottom: Spacing.xl }}>
          <SectionHeader
            eyebrow="Five Domains"
            title="Where Prithvi is leaving"
            subtitle="Tap each to see the full data — verified, dharmic, and the frequency layer."
          />

          <View style={styles.domainList}>
            {DOMAINS.map((domain) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                expanded={expandedDomain === domain.id}
                onPress={() => setExpandedDomain(expandedDomain === domain.id ? null : domain.id)}
              />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Era Card ──────────────────────────────────────────────────────────────
interface EraCardProps {
  era: Era;
  expanded: boolean;
  onPress: () => void;
}

function EraCard({ era, expanded, onPress }: EraCardProps) {
  const anim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  return (
    <TouchableOpacity
      style={[styles.eraCard, expanded && styles.eraCardExpanded]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {expanded && <View style={styles.eraActiveBar} />}
      <Text style={styles.eraPeriod}>{era.period}</Text>
      <Text style={styles.eraYuga}>{era.yuga}</Text>
      <Text style={styles.eraTitle}>{era.title}</Text>

      {/* Depletion indicator */}
      <View style={styles.eraDepletionRow}>
        <Text style={styles.eraDepletionLabel}>Depletion</Text>
        <Text style={styles.eraDepletionPct}>{Math.round(era.depletion * 100)}%</Text>
      </View>
      <DepletionBar pct={era.depletion} color={
        era.depletion < 0.2 ? Colors.verified :
        era.depletion < 0.5 ? Colors.gold :
        Colors.muladhara
      } />

      <Text style={styles.eraSummary}>{era.summary}</Text>

      {expanded && (
        <View style={styles.eraDetails}>
          {era.facts.map((fact, i) => (
            <FactRow key={i} {...fact} />
          ))}
          <DharmicNote text={era.dharmicNote} source={era.dharmicSource} />
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── Domain Card ───────────────────────────────────────────────────────────
interface DomainCardProps {
  domain: Domain;
  expanded: boolean;
  onPress: () => void;
}

function DomainCard({ domain, expanded, onPress }: DomainCardProps) {
  return (
    <View style={styles.domainCard}>
      <TouchableOpacity
        style={styles.domainHeader}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.domainIcon}>{domain.icon}</Text>
        <View style={styles.domainMeta}>
          <Text style={styles.domainName}>{domain.name}</Text>
          <Text style={styles.domainSanskrit}>{domain.sanskrit}</Text>
        </View>
        <View style={styles.domainSeverity}>
          <Text style={styles.severityPct}>{domain.severity}</Text>
          <Text style={styles.severityLabel}>{domain.severityLabel}</Text>
        </View>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.domainBody}>
          <DepletionBar pct={domain.depletionPct} color={domain.color} />
          <Text style={styles.domainSummary}>{domain.summary}</Text>

          <View style={styles.factSection}>
            {domain.facts.map((fact, i) => (
              <FactRow key={i} {...fact} />
            ))}
          </View>

          <DharmicNote text={domain.dharmicNote} source={domain.dharmicSource} />

          {domain.frequencyNote && (
            <FrequencyNote
              text={domain.frequencyNote}
              source={domain.frequencySource}
              type={domain.frequencyType}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.void },
  scroll: { flex: 1 },
  content: { paddingBottom: 100 },

  hero: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    gap: Spacing.md,
  },
  heroGlyph: { fontSize: 52 },
  heroEyebrow: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 3,
    color: Colors.ochre, textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 30, color: Colors.parchment, fontFamily: 'serif',
    textAlign: 'center', lineHeight: 38,
  },
  heroSub: {
    fontSize: 15, color: Colors.ash, textAlign: 'center',
    lineHeight: 24, fontStyle: 'italic', maxWidth: 300,
  },
  legend: { gap: 6, alignSelf: 'stretch', marginTop: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendText: { fontSize: 12, color: Colors.ash },

  timelineSection: { paddingTop: Spacing.xl },
  eraScroll: { paddingHorizontal: Spacing.md, gap: Spacing.md, paddingBottom: 4 },

  eraCard: {
    width: width * 0.78,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(193,125,60,0.15)',
    borderRadius: Radius.md,
    padding: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  eraCardExpanded: {
    borderColor: 'rgba(193,125,60,0.45)',
    backgroundColor: 'rgba(193,125,60,0.06)',
  },
  eraActiveBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 3, backgroundColor: Colors.ochre,
  },
  eraPeriod: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.5,
    color: Colors.mud, textTransform: 'uppercase', marginBottom: 4,
  },
  eraYuga: { fontSize: 14, color: Colors.ochre, marginBottom: 4 },
  eraTitle: { fontSize: 18, color: Colors.parchment, fontFamily: 'serif', marginBottom: 8 },
  eraDepletionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  eraDepletionLabel: { fontFamily: 'monospace', fontSize: 9, color: Colors.stone, textTransform: 'uppercase', letterSpacing: 1 },
  eraDepletionPct: { fontFamily: 'monospace', fontSize: 10, color: Colors.ochre },
  eraSummary: { fontSize: 13, color: Colors.ash, lineHeight: 20 },
  eraDetails: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },

  domainList: { paddingHorizontal: Spacing.md, gap: Spacing.sm },
  domainCard: {
    backgroundColor: 'rgba(255,255,255,0.025)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: Radius.md, overflow: 'hidden',
  },
  domainHeader: {
    flexDirection: 'row', alignItems: 'center',
    padding: Spacing.md, gap: 12,
  },
  domainIcon: { fontSize: 26 },
  domainMeta: { flex: 1 },
  domainName: { fontSize: 16, color: Colors.parchment, fontFamily: 'serif' },
  domainSanskrit: { fontFamily: 'monospace', fontSize: 9, color: Colors.ash, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
  domainSeverity: { alignItems: 'flex-end' },
  severityPct: { fontFamily: 'monospace', fontSize: 18, color: '#D07060', fontWeight: '700' },
  severityLabel: { fontFamily: 'monospace', fontSize: 8, color: Colors.stone, textTransform: 'uppercase', letterSpacing: 1 },
  chevron: { color: Colors.mud, fontSize: 10 },
  domainBody: { padding: Spacing.md, paddingTop: 0, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  domainSummary: { fontSize: 14, color: Colors.ash, lineHeight: 22, marginBottom: Spacing.md },
  factSection: { marginBottom: 4 },
});
