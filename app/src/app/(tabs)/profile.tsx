/**
 * Profile Screen — migrated from cosmic-compass profile.tsx
 * Features: Avatar, cosmic signature, premium CTA, stats, and settings menu.
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CosmicText } from '@/components/cosmic/CosmicText';
import { GlassCard } from '@/components/cosmic/GlassCard';
import { CosmicColors, CosmicSpacing, CosmicRadii } from '@/constants/cosmic-theme';

const STATS = [
  { v: '47', l: 'Readings' },
  { v: '12', l: 'Day streak' },
  { v: '8', l: 'Saved' },
];

const MENU_ITEMS = [
  { emoji: '⭐', label: 'Saved readings' },
  { emoji: '✨', label: 'Cosmic journal' },
  { emoji: '🔔', label: 'Daily reminders' },
  { emoji: '⚙️', label: 'Preferences' },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <CosmicText type="h2">Profile</CosmicText>
            <View style={styles.headerActions}>
              <Pressable style={styles.headerButton}>
                <CosmicText style={{ fontSize: 16 }}>🔔</CosmicText>
              </Pressable>
              <Pressable style={styles.headerButton}>
                <CosmicText style={{ fontSize: 16 }}>⚙️</CosmicText>
              </Pressable>
            </View>
          </View>

          {/* Profile Card */}
          <View style={styles.section}>
            <GlassCard strong style={styles.profileCard}>
              <View style={styles.profileGlow} />
              <View style={styles.profileContent}>
                <View style={styles.avatarOrb}>
                  <CosmicText style={{ fontSize: 32, fontWeight: '700' }} color={CosmicColors.background}>A</CosmicText>
                </View>
                <CosmicText type="h2" style={{ marginTop: 16 }}>Aurora Vale</CosmicText>
                <CosmicText type="label" color={CosmicColors.gold} style={{ marginTop: 4 }}>
                  Leo ☉ · Pisces ☾ · Scorpio ↑
                </CosmicText>
                <Pressable style={{ marginTop: 16 }}>
                  <CosmicText type="small" color={CosmicColors.violet}>Edit birth details</CosmicText>
                </Pressable>
              </View>
            </GlassCard>
          </View>

          {/* Premium CTA */}
          <View style={styles.section}>
            <View style={styles.premiumOuter}>
              <GlassCard strong style={styles.premiumInner}>
                <View style={styles.premiumRow}>
                  <View style={styles.premiumIcon}>
                    <CosmicText style={{ fontSize: 20 }}>👑</CosmicText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CosmicText type="h3">Nebula Premium</CosmicText>
                    <CosmicText type="small" color={CosmicColors.mutedForeground}>
                      Unlock unlimited readings · $9.99/mo
                    </CosmicText>
                  </View>
                  <CosmicText color={CosmicColors.gold}>›</CosmicText>
                </View>
              </GlassCard>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {STATS.map((s) => (
              <GlassCard key={s.l} style={styles.statCard}>
                <CosmicText type="h2" color={CosmicColors.violet}>{s.v}</CosmicText>
                <CosmicText type="micro" color={CosmicColors.mutedForeground} style={{ marginTop: 4 }}>
                  {s.l}
                </CosmicText>
              </GlassCard>
            ))}
          </View>

          {/* Menu */}
          <View style={styles.section}>
            {MENU_ITEMS.map((m) => (
              <Pressable key={m.label}>
                <GlassCard style={styles.menuItem}>
                  <CosmicText style={{ fontSize: 16 }}>{m.emoji}</CosmicText>
                  <CosmicText type="body" style={{ flex: 1 }}>{m.label}</CosmicText>
                  <CosmicText color={CosmicColors.mutedForeground}>›</CosmicText>
                </GlassCard>
              </Pressable>
            ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CosmicColors.glass,
    borderWidth: 1,
    borderColor: CosmicColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: CosmicSpacing.xl,
    marginTop: CosmicSpacing.xl,
    gap: 8,
  },

  // Profile card
  profileCard: {
    padding: CosmicSpacing.xxl,
    overflow: 'hidden',
  },
  profileGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(147,51,234,0.08)',
  },
  profileContent: {
    alignItems: 'center',
  },
  avatarOrb: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: CosmicColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 10,
  },

  // Premium
  premiumOuter: {
    borderRadius: CosmicRadii.xl,
    borderWidth: 1,
    borderColor: CosmicColors.gold,
    shadowColor: CosmicColors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 4,
  },
  premiumInner: {
    padding: CosmicSpacing.xl,
    borderWidth: 0,
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: CosmicColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: CosmicSpacing.xl,
    marginTop: CosmicSpacing.xl,
    gap: 8,
  },
  statCard: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },

  // Menu
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
