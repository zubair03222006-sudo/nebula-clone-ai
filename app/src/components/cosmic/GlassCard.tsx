import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { CosmicColors, CosmicRadii } from '@/constants/cosmic-theme';

export interface GlassCardProps extends ViewProps {
  strong?: boolean;
  rounded?: 'md' | 'lg' | 'xl' | 'full';
}

export function GlassCard({ style, strong = false, rounded = 'xl', ...rest }: GlassCardProps) {
  const radii = {
    md: CosmicRadii.md,
    lg: CosmicRadii.lg,
    xl: CosmicRadii.xl,
    full: CosmicRadii.full,
  };

  return (
    <View
      style={[
        styles.base,
        strong ? styles.strong : styles.light,
        { borderRadius: radii[rounded] },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  light: {
    backgroundColor: CosmicColors.glass,
    borderColor: CosmicColors.border,
  },
  strong: {
    backgroundColor: CosmicColors.glassStrong,
    borderColor: CosmicColors.borderStrong,
  },
});
