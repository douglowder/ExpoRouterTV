import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from 'react-native-bottom-tabs/react-navigation';
import { Platform } from 'react-native';

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator,
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  return (
    <Tabs
      tabBarActiveTintColor={colors.tabIconSelected}
      tabBarInactiveTintColor={colors.tabIconDefault}
      barTintColor={Platform.OS === 'ios' ? colors.background : undefined}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="tv_focus"
        options={{
          title: 'TV event demo',
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video demo',
        }}
      />
    </Tabs>
  );
}
