import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, Calendar, Clock, MapPin, Sparkles, Star, ArrowRight, ArrowLeft } from 'lucide-react-native';

import { CosmicText } from '@/components/cosmic/CosmicText';
import { GlassCard } from '@/components/cosmic/GlassCard';
import { CosmicColors, CosmicSpacing, CosmicRadii } from '@/constants/cosmic-theme';

const nebulaHero = require('@/assets/images/nebula-hero.jpg');
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [sign, setSign] = useState('Leo');

  const steps = 7;
  const next = () => setStep((s) => Math.min(s + 1, steps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: CosmicSpacing.xl, paddingVertical: CosmicSpacing.lg }}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          {Array.from({ length: steps }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressBar,
                { backgroundColor: i <= step ? CosmicColors.primary : 'rgba(255,255,255,0.1)' },
              ]}
            />
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {step === 0 && (
            <View style={styles.stepContainer}>
              <View style={styles.heroBg}>
                <Image source={nebulaHero} style={styles.heroImg} />
                <View style={styles.heroOverlay} />
              </View>
              <View style={{ marginTop: 60 }}>
                <GlassCard style={styles.badge} rounded="full">
                  <CosmicText type="micro" color={CosmicColors.gold}>Welcome to Nebula</CosmicText>
                </GlassCard>
                <CosmicText type="hero" style={{ marginTop: 24, lineHeight: 48 }}>
                  The cosmos has been{'\n'}
                  <CosmicText type="hero" color={CosmicColors.violet} style={{ fontStyle: 'italic' }}>waiting for you.</CosmicText>
                </CosmicText>
                <CosmicText type="body" color={CosmicColors.mutedForeground} style={{ marginTop: 20 }}>
                  Personalized birth charts, daily insight, and an AI astrologer that knows your sky by heart.
                </CosmicText>
              </View>
            </View>
          )}

          {step === 1 && (
            <StepWrap icon={User} title="What should we call you?" subtitle="Your celestial name.">
              <TextInput
                autoFocus
                value={name}
                onChangeText={setName}
                placeholder="Aurora"
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={styles.inputUnderline}
              />
            </StepWrap>
          )}

          {step === 2 && (
            <StepWrap icon={Calendar} title="When were you born?" subtitle="Your birth date anchors the stars.">
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="MM / DD / YYYY"
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={styles.inputBox}
              />
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap icon={Clock} title="At what time?" subtitle="The exact moment shapes your rising sign.">
              <TextInput
                value={time}
                onChangeText={setTime}
                placeholder="03:42 AM"
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={styles.inputBox}
              />
              <CosmicText type="micro" color={CosmicColors.mutedForeground} style={{ marginTop: 16 }}>
                Don't know? Tap "Approximate" — we'll guide you.
              </CosmicText>
            </StepWrap>
          )}

          {step === 4 && (
            <StepWrap icon={MapPin} title="Where were you born?" subtitle="City and country are enough.">
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Lisbon, Portugal"
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={styles.inputBox}
              />
            </StepWrap>
          )}

          {step === 5 && (
            <StepWrap icon={Sparkles} title="Confirm your sun sign" subtitle="We've calculated this from your birth.">
              <View style={styles.grid}>
                {SIGNS.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setSign(s)}
                    style={[
                      styles.signBtn,
                      sign === s ? styles.signBtnActive : styles.signBtnInactive,
                    ]}
                  >
                    <CosmicText
                      type="small"
                      color={sign === s ? CosmicColors.background : CosmicColors.foreground}
                      style={{ fontWeight: sign === s ? '700' : '500' }}
                    >
                      {s}
                    </CosmicText>
                  </Pressable>
                ))}
              </View>
            </StepWrap>
          )}

          {step === 6 && (
            <View style={styles.finalStep}>
              <View style={styles.starOrb}>
                <Star color={CosmicColors.background} size={40} fill={CosmicColors.background} />
              </View>
              <GlassCard style={[styles.badge, { marginTop: 32 }]} rounded="full">
                <CosmicText type="micro" color={CosmicColors.gold}>Your cosmic profile is ready</CosmicText>
              </GlassCard>
              <CosmicText type="h1" style={{ marginTop: 20, textAlign: 'center' }}>
                Welcome,{'\n'}
                <CosmicText type="h1" color={CosmicColors.violet} style={{ fontStyle: 'italic' }}>
                  {name || 'Stargazer'}
                </CosmicText>
              </CosmicText>
              <CosmicText type="body" color={CosmicColors.mutedForeground} style={{ marginTop: 16, textAlign: 'center' }}>
                You're a <CosmicText type="body" color={CosmicColors.gold}>{sign} Sun</CosmicText>, with a Pisces Moon and Scorpio Rising — a rare and luminous combination.
              </CosmicText>

              <GlassCard strong style={styles.giftCard}>
                <CosmicText type="micro" color={CosmicColors.gold}>Today's gift</CosmicText>
                <CosmicText type="h3" style={{ marginTop: 8 }}>
                  An unexpected message from someone you've been thinking about.
                </CosmicText>
              </GlassCard>
            </View>
          )}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navRow}>
          {step > 0 && (
            <Pressable onPress={back} style={styles.backBtn}>
              <ArrowLeft color={CosmicColors.foreground} size={20} />
            </Pressable>
          )}
          {step < steps - 1 ? (
            <Pressable onPress={next} style={styles.continueBtn}>
              <CosmicText type="body" color={CosmicColors.background} style={{ fontWeight: '600' }}>Continue</CosmicText>
              <ArrowRight color={CosmicColors.background} size={20} style={{ marginLeft: 8 }} />
            </Pressable>
          ) : (
            <Pressable onPress={() => router.replace('/(tabs)' as any)} style={styles.enterBtn}>
              <CosmicText type="body" color={CosmicColors.background} style={{ fontWeight: '700' }}>Enter Nebula</CosmicText>
              <Sparkles color={CosmicColors.background} size={20} style={{ marginLeft: 8 }} />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

function StepWrap({ icon: Icon, title, subtitle, children }: any) {
  return (
    <View style={styles.stepContainer}>
      <GlassCard strong style={styles.iconBox}>
        <Icon color={CosmicColors.violet} size={24} />
      </GlassCard>
      <CosmicText type="h1" style={{ marginTop: 24 }}>{title}</CosmicText>
      <CosmicText type="body" color={CosmicColors.mutedForeground} style={{ marginTop: 8 }}>{subtitle}</CosmicText>
      <View style={{ marginTop: 32 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CosmicColors.background,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 32,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  stepContainer: {
    paddingVertical: 20,
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    opacity: 0.4,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: CosmicColors.background,
    opacity: 0.5,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputUnderline: {
    fontSize: 32,
    fontWeight: '700',
    color: CosmicColors.foreground,
    borderBottomWidth: 2,
    borderBottomColor: CosmicColors.violet,
    paddingVertical: 12,
  },
  inputBox: {
    fontSize: 20,
    fontWeight: '600',
    color: CosmicColors.foreground,
    backgroundColor: CosmicColors.glass,
    borderWidth: 1,
    borderColor: CosmicColors.borderStrong,
    borderRadius: CosmicRadii.lg,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  signBtn: {
    width: '30%',
    paddingVertical: 16,
    borderRadius: CosmicRadii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signBtnActive: {
    backgroundColor: CosmicColors.primary,
  },
  signBtnInactive: {
    backgroundColor: CosmicColors.glass,
    borderWidth: 1,
    borderColor: CosmicColors.border,
  },
  finalStep: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  starOrb: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: CosmicColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 8,
  },
  giftCard: {
    width: '100%',
    marginTop: 40,
    padding: 24,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  backBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: CosmicColors.glassStrong,
    borderWidth: 1,
    borderColor: CosmicColors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: CosmicColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 6,
  },
  enterBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: CosmicColors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 6,
  },
});
