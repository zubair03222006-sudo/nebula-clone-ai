import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { CosmicColors } from '@/constants/cosmic-theme';
import { CosmicText } from '@/components/cosmic/CosmicText';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: CosmicColors.violet,
        tabBarInactiveTintColor: CosmicColors.mutedForeground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🏠" label="Home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: 'Chart',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="✨" label="Chart" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="💬" label="Chat" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="compatibility"
        options={{
          title: 'Match',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="💖" label="Match" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="👤" label="Profile" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ icon, label, color, focused }: { icon: string; label: string; color: string; focused: boolean }) {
  return (
    <View style={styles.tabIconContainer}>
      {focused && <View style={styles.tabIconGlow} />}
      <CosmicText style={{ fontSize: 20, marginBottom: 2 }}>{icon}</CosmicText>
      <CosmicText type="micro" style={{ fontSize: 10 }} color={color}>{label}</CosmicText>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: CosmicColors.glassStrong,
    borderRadius: 30,
    height: 60,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: CosmicColors.borderStrong,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    paddingHorizontal: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
  },
  tabIconGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CosmicColors.primary,
    opacity: 0.2,
  },
});
