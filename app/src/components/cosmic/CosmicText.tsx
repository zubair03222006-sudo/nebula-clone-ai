import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { CosmicColors, CosmicFonts } from '@/constants/cosmic-theme';

export interface CosmicTextProps extends TextProps {
  type?: 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'micro' | 'label';
  color?: string;
}

export function CosmicText({ style, type = 'body', color = CosmicColors.foreground, ...rest }: CosmicTextProps) {
  return (
    <Text
      style={[
        styles.base,
        styles[type],
        { color },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: CosmicFonts.sans,
  },
  hero: {
    fontFamily: CosmicFonts.display,
    fontSize: 42,
    lineHeight: 44,
    letterSpacing: -1,
  },
  h1: {
    fontFamily: CosmicFonts.display,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: CosmicFonts.display,
    fontSize: 24,
    lineHeight: 28,
  },
  h3: {
    fontFamily: CosmicFonts.display,
    fontSize: 20,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  micro: {
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
  },
});
