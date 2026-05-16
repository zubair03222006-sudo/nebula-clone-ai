/**
 * Compatibility Screen — migrated from cosmic-compass compatibility.tsx
 * Features: Overall score ring, category breakdown bars,
 * strengths/challenges grid, and relationship insight.
 */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { CosmicText } from '@/components/cosmic/CosmicText';
import { GlassCard } from '@/components/cosmic/GlassCard';
import { CosmicColors, CosmicSpacing } from '@/constants/cosmic-theme';

const BREAKDOWN = [
  { emoji: '💖', label: 'Love', score: 92, colorStart: '#f472b6', colorEnd: '#e11d48' },
  { emoji: '💬', label: 'Communication', score: 78, colorStart: '#22d3ee', colorEnd: '#3b82f6' },
  { emoji: '🔥', label: 'Emotional', score: 85, colorStart: '#fbbf24', colorEnd: '#f97316' },
  { emoji: '♾️', label: 'Long-term', score: 88, colorStart: '#a78bfa', colorEnd: '#d946ef' },
];

const OVERALL = 87;

export default function CompatibilityScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <CosmicText type="label" color={CosmicColors.gold}>Cosmic Match</CosmicText>
            <CosmicText type="h1" style={{ marginTop: 4 }}>You & Orion</CosmicText>
            <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 4 }}>
              Leo ✦ Sagittarius
            </CosmicText>
          </View>

          {/* Score Card */}
          <View style={styles.section}>
            <GlassCard strong style={styles.scoreCard}>
              <View style={styles.scoreGlow} />
              <View style={styles.scoreContent}>
                {/* Ring */}
                <View style={styles.ringContainer}>
                  <Svg width={112} height={112} viewBox="0 0 100 100">
                    <Defs>
                      <LinearGradient id="scoreRing" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0%" stopColor={CosmicColors.violet} />
                        <Stop offset="100%" stopColor={CosmicColors.gold} />
                      </LinearGradient>
                    </Defs>
                    <Circle cx={50} cy={50} r={44} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6}
                      transform="rotate(-90 50 50)"
                    />
                    <Circle
                      cx={50} cy={50} r={44}
                      fill="none" stroke="url(#scoreRing)" strokeWidth={6}
                      strokeLinecap="round"
                      strokeDasharray={`${(OVERALL / 100) * 276} 276`}
                      transform="rotate(-90 50 50)"
                    />
                  </Svg>
                  <View style={styles.ringCenter}>
                    <CosmicText type="h1" color={CosmicColors.violet}>{OVERALL}</CosmicText>
                    <CosmicText type="micro" color={CosmicColors.mutedForeground}>Match</CosmicText>
                  </View>
                </View>

                {/* Verdict */}
                <View style={{ flex: 1 }}>
                  <CosmicText type="label" color={CosmicColors.gold}>Cosmic Verdict</CosmicText>
                  <CosmicText type="h2" style={{ marginTop: 4 }}>Soulfire</CosmicText>
                  <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 4 }}>
                    A rare fire-sign duo, bound by adventure and shared brilliance.
                  </CosmicText>
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Breakdown */}
          <View style={styles.section}>
            {BREAKDOWN.map((b) => (
              <GlassCard key={b.label} style={styles.breakdownCard}>
                <View style={styles.breakdownHeader}>
                  <View style={styles.breakdownLabel}>
                    <CosmicText style={{ fontSize: 14 }}>{b.emoji}</CosmicText>
                    <CosmicText type="body">{b.label}</CosmicText>
                  </View>
                  <CosmicText type="h3">{b.score}</CosmicText>
                </View>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${b.score}%`, backgroundColor: b.colorStart }]} />
                </View>
              </GlassCard>
            ))}
          </View>

          {/* Strengths & Challenges */}
          <View style={styles.gridSection}>
            <GlassCard style={styles.gridCard}>
              <CosmicText type="label" color={CosmicColors.gold} style={{ marginBottom: 8 }}>Strengths</CosmicText>
              {['· Shared sense of adventure', '· Magnetic chemistry', '· Mutual respect'].map((s) => (
                <CosmicText key={s} type="small" color="rgba(245,240,255,0.85)" style={{ marginTop: 6 }}>
                  {s}
                </CosmicText>
              ))}
            </GlassCard>
            <GlassCard style={styles.gridCard}>
              <CosmicText type="label" color="#fda4af" style={{ marginBottom: 8 }}>Challenges</CosmicText>
              {['· Both crave the spotlight', '· Restless when settled', '· Watch the ego clash'].map((s) => (
                <CosmicText key={s} type="small" color="rgba(245,240,255,0.85)" style={{ marginTop: 6 }}>
                  {s}
                </CosmicText>
              ))}
            </GlassCard>
          </View>

          {/* Insight */}
          <View style={styles.section}>
            <GlassCard strong style={styles.insightCard}>
              <CosmicText type="label" color={CosmicColors.gold}>Relationship Insight</CosmicText>
              <CosmicText type="h3" style={{ fontStyle: 'italic', lineHeight: 26, marginTop: 8 }}>
                "Two suns can share a sky — if neither dims for the other."
              </CosmicText>
              <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 12 }}>
                Your fire fuels theirs. The work isn't compromise — it's choreography. Find rituals that honor both your individual orbits.
              </CosmicText>
            </GlassCard>
          </View>

          {/* Share button */}
          <View style={styles.section}>
            <GlassCard strong style={styles.shareButton}>
              <CosmicText type="body" color={CosmicColors.gold} style={{ marginRight: 8 }}>🔗</CosmicText>
              <CosmicText type="body">Share your cosmic match</CosmicText>
            </GlassCard>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CosmicColors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: CosmicSpacing.xl,
    paddingTop: 48,
    paddingBottom: 16,
  },
  section: {
    paddingHorizontal: CosmicSpacing.xl,
    marginTop: CosmicSpacing.xxl,
    gap: 12,
  },

  // Score card
  scoreCard: {
    padding: CosmicSpacing.xxl,
    overflow: 'hidden',
  },
  scoreGlow: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(168,85,247,0.12)',
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  ringContainer: {
    width: 112,
    height: 112,
    position: 'relative',
    flexShrink: 0,
  },
  ringCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Breakdown
  breakdownCard: {
    padding: 16,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Grid
  gridSection: {
    flexDirection: 'row',
    paddingHorizontal: CosmicSpacing.xl,
    marginTop: CosmicSpacing.xxl,
    gap: 12,
  },
  gridCard: {
    flex: 1,
    padding: 16,
  },

  // Insight
  insightCard: {
    padding: CosmicSpacing.xl,
  },

  // Share
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
});
