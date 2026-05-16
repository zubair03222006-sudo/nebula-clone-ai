import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { CosmicColors } from '@/constants/cosmic-theme';

interface CosmicTextProps extends TextProps {
  type?: 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label' | 'micro';
  color?: string;
}

export function CosmicText({ type = 'body', color = CosmicColors.foreground, style, children, ...rest }: CosmicTextProps) {
  return (
    <Text style={[styles[type], { color }, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  hero: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 46,
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  micro: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
