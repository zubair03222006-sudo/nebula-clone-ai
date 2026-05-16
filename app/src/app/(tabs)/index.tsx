/**
 * Nebula Home Screen — migrated from cosmic-compass index.tsx
 * Features: Hero section with nebula image, daily horoscope card,
 * insight grid, cosmic snapshot (big 3), daily insight, and AI CTA.
 */
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { CosmicText } from '@/components/cosmic/CosmicText';
import { GlassCard } from '@/components/cosmic/GlassCard';
import { CosmicColors, CosmicSpacing, CosmicRadii } from '@/constants/cosmic-theme';

const nebulaHero = require('@/assets/images/nebula-hero.jpg');

const insights = [
  { emoji: '💖', label: 'Love', value: 'Magnetic', tint: 'rgba(236, 72, 153, 0.2)' },
  { emoji: '💼', label: 'Career', value: 'Focused', tint: 'rgba(251, 191, 36, 0.2)' },
  { emoji: '😊', label: 'Mood', value: 'Radiant', tint: 'rgba(139, 92, 246, 0.2)' },
  { emoji: '⚡', label: 'Energy', value: '8.4', tint: 'rgba(34, 211, 238, 0.2)' },
];

const BIG_THREE = [
  { emoji: '☀️', name: 'Sun', sign: 'Leo', desc: 'Bold, radiant, generous', color: CosmicColors.gold },
  { emoji: '🌙', name: 'Moon', sign: 'Pisces', desc: 'Intuitive & dreamy', color: CosmicColors.neon },
  { emoji: '✨', name: 'Rising', sign: 'Scorpio', desc: 'Magnetic presence', color: CosmicColors.violet },
];

export default function HomeScreen() {
  const router = useRouter();
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Hero Section ─── */}
        <View style={styles.hero}>
          <Image source={nebulaHero} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <SafeAreaView style={styles.heroContent}>
            <View style={styles.heroTopRow}>
              <CosmicText type="micro" color={CosmicColors.mutedForeground}>
                {dayName} · {monthDay}
              </CosmicText>
              <CosmicText type="micro" color={CosmicColors.mutedForeground}>
                ⭐ Waxing Moon
              </CosmicText>
            </View>

            <View style={styles.heroTextBlock}>
              <GlassCard style={styles.signBadge} rounded="full">
                <CosmicText type="label" color={CosmicColors.gold}>
                  Your Sign · Leo
                </CosmicText>
              </GlassCard>
              <CosmicText type="hero" style={styles.heroTitle}>
                Hello, <CosmicText type="hero" color={CosmicColors.violet} style={{ fontStyle: 'italic' }}>Aurora</CosmicText>
              </CosmicText>
              <CosmicText type="body" color={CosmicColors.mutedForeground} style={styles.heroSub}>
                The cosmos aligns in your favor today. A subtle shift opens unexpected doors.
              </CosmicText>
            </View>

            {/* Featured Horoscope Card */}
            <Pressable onPress={() => router.push('/chart' as any)}>
              <GlassCard strong style={styles.horoscopeCard}>
                <View style={styles.glowBlob} />
                <View style={styles.horoscopeHeader}>
                  <View>
                    <CosmicText type="label" color={CosmicColors.gold}>Daily Horoscope</CosmicText>
                    <CosmicText type="h2" style={{ marginTop: 4 }}>Today's Energy</CosmicText>
                  </View>
                  <View style={styles.sparkleIcon}>
                    <CosmicText style={{ fontSize: 24 }}>✨</CosmicText>
                  </View>
                </View>
                <CosmicText type="body" color="rgba(245,240,255,0.85)" style={{ marginTop: 16 }}>
                  Venus enters your sphere with quiet generosity. Trust the slow pull — small choices today ripple far. Wear something gold.
                </CosmicText>
                <View style={styles.readMore}>
                  <CosmicText type="small" color={CosmicColors.violet}>
                    Read full reading →
                  </CosmicText>
                </View>
              </GlassCard>
            </Pressable>
          </SafeAreaView>
        </View>

        {/* ─── Insight Grid ─── */}
        <View style={styles.section}>
          <View style={styles.insightGrid}>
            {insights.map((it) => (
              <GlassCard key={it.label} style={styles.insightCard}>
                <View style={[styles.insightGlow, { backgroundColor: it.tint }]} />
                <CosmicText style={{ fontSize: 16 }}>{it.emoji}</CosmicText>
                <CosmicText type="micro" color={CosmicColors.mutedForeground} style={{ marginTop: 12 }}>
                  {it.label}
                </CosmicText>
                <CosmicText type="h2" style={{ marginTop: 4 }}>{it.value}</CosmicText>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* ─── Cosmic Snapshot (Big 3) ─── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CosmicText type="h3">Your Cosmic Snapshot</CosmicText>
            <CosmicText type="small" color={CosmicColors.mutedForeground}>Big 3</CosmicText>
          </View>
          <Pressable onPress={() => router.push('/profile' as any)}>
            <GlassCard style={styles.snapshotCard}>
              {BIG_THREE.map((p, i) => (
                <View
                  key={p.name}
                  style={[styles.snapshotRow, i < 2 && styles.snapshotRowBorder]}
                >
                  <GlassCard strong style={styles.snapshotIcon}>
                    <CosmicText style={{ fontSize: 20 }}>{p.emoji}</CosmicText>
                  </GlassCard>
                  <View style={styles.snapshotInfo}>
                    <View style={styles.snapshotNameRow}>
                      <CosmicText type="micro" color={CosmicColors.mutedForeground}>{p.name}</CosmicText>
                      <CosmicText type="h3" style={{ marginLeft: 8 }}>{p.sign}</CosmicText>
                    </View>
                    <CosmicText type="small" color={CosmicColors.mutedForeground}>{p.desc}</CosmicText>
                  </View>
                  <CosmicText color={CosmicColors.mutedForeground}>›</CosmicText>
                </View>
              ))}
            </GlassCard>
          </Pressable>
        </View>

        {/* ─── Daily Insight ─── */}
        <View style={styles.section}>
          <CosmicText type="h3" style={{ marginBottom: 12 }}>Daily Insight</CosmicText>
          <GlassCard style={styles.insightBlock}>
            <View style={styles.insightGlowPurple} />
            <CosmicText type="h3" style={{ fontStyle: 'italic', lineHeight: 26 }}>
              "You're being asked to stop performing and start arriving."
            </CosmicText>
            <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 12 }}>
              With the Moon in Pisces softening your defenses, vulnerability becomes your superpower. Let someone in today — even quietly.
            </CosmicText>
            <View style={styles.luckyRow}>
              <CosmicText type="label" color={CosmicColors.gold}>Lucky color</CosmicText>
              <View style={styles.luckyDot} />
              <CosmicText type="label" color={CosmicColors.gold} style={{ marginLeft: 12 }}>Number</CosmicText>
              <CosmicText type="h3" color={CosmicColors.gold} style={{ marginLeft: 4 }}>7</CosmicText>
            </View>
          </GlassCard>
        </View>

        {/* ─── AI Astrologer CTA ─── */}
        <View style={styles.section}>
          <Pressable onPress={() => router.push('/chat' as any)}>
            <View style={styles.ctaOuter}>
              <GlassCard strong style={styles.ctaInner}>
                <View style={styles.ctaContent}>
                  <View style={styles.ctaIcon}>
                    <CosmicText style={{ fontSize: 24 }}>💬</CosmicText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CosmicText type="label" color={CosmicColors.gold}>Premium</CosmicText>
                    <CosmicText type="h3" style={{ marginTop: 2 }}>Ask the AI Astrologer</CosmicText>
                    <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 2 }}>
                      Unlimited cosmic guidance, anytime
                    </CosmicText>
                  </View>
                  <CosmicText color={CosmicColors.foreground}>→</CosmicText>
                </View>
              </GlassCard>
            </View>
          </Pressable>
        </View>

        {/* Onboarding link */}
        <View style={[styles.section, { alignItems: 'center', marginVertical: 24 }]}>
          <Pressable onPress={() => router.push('/onboarding' as any)}>
            <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ textDecorationLine: 'underline' }}>
              New here? Take the cosmic tour →
            </CosmicText>
          </Pressable>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CosmicColors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero
  hero: {
    position: 'relative',
    minHeight: 480,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: CosmicColors.background,
    opacity: 0.5,
  },
  heroContent: {
    paddingHorizontal: CosmicSpacing.xl,
    paddingTop: CosmicSpacing.lg,
    paddingBottom: CosmicSpacing.xxl,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTextBlock: {
    marginTop: 32,
  },
  signBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroTitle: {
    marginTop: 16,
  },
  heroSub: {
    marginTop: 8,
    maxWidth: 260,
  },
  horoscopeCard: {
    marginTop: 28,
    padding: CosmicSpacing.xl,
  },
  glowBlob: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  horoscopeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sparkleIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: CosmicColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 6,
  },
  readMore: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Sections
  section: {
    paddingHorizontal: CosmicSpacing.xl,
    marginTop: CosmicSpacing.section,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },

  // Insight grid
  insightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    width: '47%',
    padding: 16,
    overflow: 'hidden',
  },
  insightGlow: {
    position: 'absolute',
    top: -24,
    right: -24,
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  // Cosmic Snapshot
  snapshotCard: {
    padding: CosmicSpacing.xl,
  },
  snapshotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
  },
  snapshotRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  snapshotIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snapshotInfo: {
    flex: 1,
  },
  snapshotNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  // Daily insight
  insightBlock: {
    padding: CosmicSpacing.xl,
    overflow: 'hidden',
  },
  insightGlowPurple: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  luckyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  luckyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CosmicColors.gold,
  },

  // CTA
  ctaOuter: {
    borderRadius: CosmicRadii.xl,
    borderWidth: 1,
    borderColor: CosmicColors.violet,
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  ctaInner: {
    padding: CosmicSpacing.xl,
    borderWidth: 0,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ctaIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: CosmicColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 6,
  },
});
