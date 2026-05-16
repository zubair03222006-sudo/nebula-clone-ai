import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { CosmicColors, CosmicRadii } from '@/constants/cosmic-theme';

interface GlassCardProps extends ViewProps {
  strong?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function GlassCard({ strong = false, rounded = 'xl', style, children, ...rest }: GlassCardProps) {
  const radius = CosmicRadii[rounded];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: strong ? CosmicColors.glassStrong : CosmicColors.glass,
          borderColor: strong ? CosmicColors.borderStrong : CosmicColors.border,
          borderRadius: radius,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    overflow: 'hidden',
  },
});
