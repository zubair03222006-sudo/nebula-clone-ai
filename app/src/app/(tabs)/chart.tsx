/**
 * Chart Screen — migrated from cosmic-compass chart.tsx
 * Features: SVG birth chart wheel with zodiac signs, planet placements,
 * selected planet detail card, and house list.
 */
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Text as SvgText, Defs, LinearGradient, Stop, G } from 'react-native-svg';

import { CosmicText } from '@/components/cosmic/CosmicText';
import { GlassCard } from '@/components/cosmic/GlassCard';
import { CosmicColors, CosmicSpacing } from '@/constants/cosmic-theme';

const SIGNS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const PLANETS = [
  { sym: '☉', name: 'Sun', sign: 'Leo', deg: 50, color: CosmicColors.gold },
  { sym: '☾', name: 'Moon', sign: 'Pisces', deg: 340, color: CosmicColors.neon },
  { sym: 'AC', name: 'Rising', sign: 'Scorpio', deg: 220, color: CosmicColors.violet },
  { sym: '☿', name: 'Mercury', sign: 'Virgo', deg: 160, color: '#9CC9FF' },
  { sym: '♀', name: 'Venus', sign: 'Cancer', deg: 100, color: '#FFB1D8' },
  { sym: '♂', name: 'Mars', sign: 'Aries', deg: 15, color: '#FF8B6B' },
];

const HOUSES = [
  { n: '1st', title: 'Identity', sign: 'Scorpio', desc: 'Magnetic, deep, mysterious presence' },
  { n: '4th', title: 'Home & Roots', sign: 'Aquarius', desc: 'Unconventional sanctuary' },
  { n: '7th', title: 'Partnerships', sign: 'Taurus', desc: 'Steady, sensual bonds' },
  { n: '10th', title: 'Career', sign: 'Leo', desc: 'Born to lead with warmth' },
];

const R_OUT = 140;
const R_IN = 105;
const R_PLANET = 82;
const CENTER = 155;
const SVG_SIZE = 310;

export default function ChartScreen() {
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <CosmicText type="label" color={CosmicColors.gold}>Your Sky</CosmicText>
            <CosmicText type="h1" style={{ marginTop: 4 }}>Birth Chart</CosmicText>
            <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 4 }}>
              May 16, 1999 · 03:42 · Lisbon
            </CosmicText>
          </View>

          {/* Chart Wheel */}
          <View style={styles.wheelContainer}>
            <View style={styles.wheelGlow} />
            <Svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
              <Defs>
                <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0%" stopColor={CosmicColors.violet} />
                  <Stop offset="50%" stopColor={CosmicColors.neon} />
                  <Stop offset="100%" stopColor={CosmicColors.gold} />
                </LinearGradient>
              </Defs>

              {/* Rings */}
              <Circle cx={CENTER} cy={CENTER} r={R_OUT} fill="none" stroke="url(#ringGrad)" strokeWidth={1.5} opacity={0.6} />
              <Circle cx={CENTER} cy={CENTER} r={R_IN} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
              <Circle cx={CENTER} cy={CENTER} r={48} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

              {/* House spokes & sign glyphs */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 - 90) * (Math.PI / 180);
                const x1 = CENTER + Math.cos(a) * R_IN;
                const y1 = CENTER + Math.sin(a) * R_IN;
                const x2 = CENTER + Math.cos(a) * R_OUT;
                const y2 = CENTER + Math.sin(a) * R_OUT;
                return (
                  <Line key={`spoke-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.15)" strokeWidth={0.8} />
                );
              })}
              {SIGNS.map((s, i) => {
                const a = ((i * 30 + 15) - 90) * (Math.PI / 180);
                const r = (R_OUT + R_IN) / 2;
                const x = CENTER + Math.cos(a) * r;
                const y = CENTER + Math.sin(a) * r;
                return (
                  <SvgText key={`sign-${i}`} x={x} y={y} fill="rgba(200,180,240,0.7)" fontSize={13} textAnchor="middle" alignmentBaseline="central">
                    {s}
                  </SvgText>
                );
              })}

              {/* Center monogram */}
              <SvgText x={CENTER} y={CENTER + 6} fontSize={32} textAnchor="middle" fill="url(#ringGrad)" fontStyle="italic">
                N
              </SvgText>

              {/* Planets */}
              {PLANETS.map((p, i) => {
                const a = (p.deg - 90) * (Math.PI / 180);
                const x = CENTER + Math.cos(a) * R_PLANET;
                const y = CENTER + Math.sin(a) * R_PLANET;
                const active = i === selected;
                return (
                  <G key={p.name} onPress={() => setSelected(i)}>
                    {active && <Circle cx={x} cy={y} r={17} fill={p.color} opacity={0.25} />}
                    <Circle cx={x} cy={y} r={active ? 12 : 9} fill="#1a0f2e" stroke={p.color} strokeWidth={active ? 2 : 1} />
                    <SvgText x={x} y={y + 4} fontSize={10} textAnchor="middle" fill={p.color} fontWeight="600">
                      {p.sym}
                    </SvgText>
                  </G>
                );
              })}
            </Svg>
          </View>

          {/* Selected planet detail */}
          <View style={styles.section}>
            <GlassCard strong style={styles.planetCard}>
              <View style={styles.planetCardRow}>
                <View style={styles.planetSymbol}>
                  <CosmicText style={{ fontSize: 24 }}>{PLANETS[selected].sym}</CosmicText>
                </View>
                <View>
                  <CosmicText type="label" color={CosmicColors.gold}>
                    {PLANETS[selected].name} in
                  </CosmicText>
                  <CosmicText type="h2">{PLANETS[selected].sign}</CosmicText>
                </View>
              </View>
              <CosmicText type="body" color="rgba(245,240,255,0.85)" style={{ marginTop: 16 }}>
                Your {PLANETS[selected].name} carries the gravity of {PLANETS[selected].sign} — a signature that shapes how you give, receive, and shine.
              </CosmicText>
            </GlassCard>
          </View>

          {/* Houses */}
          <View style={styles.section}>
            <CosmicText type="h3" style={{ marginBottom: 12 }}>Houses</CosmicText>
            {HOUSES.map((h) => (
              <GlassCard key={h.n} style={styles.houseCard}>
                <CosmicText type="h2" color={CosmicColors.violet} style={{ width: 48 }}>{h.n}</CosmicText>
                <View style={{ flex: 1 }}>
                  <CosmicText type="body">
                    {h.title} · <CosmicText type="body" color={CosmicColors.gold}>{h.sign}</CosmicText>
                  </CosmicText>
                  <CosmicText type="small" color={CosmicColors.mutedForeground} style={{ marginTop: 2 }}>{h.desc}</CosmicText>
                </View>
              </GlassCard>
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
  },
  section: {
    paddingHorizontal: CosmicSpacing.xl,
    marginTop: CosmicSpacing.xxl,
  },

  // Wheel
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  wheelGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(168,85,247,0.12)',
  },

  // Planet card
  planetCard: {
    padding: CosmicSpacing.xl,
  },
  planetCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  planetSymbol: {
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

  // Houses
  houseCard: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
});
