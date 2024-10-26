import React from 'react';
import { Pressable } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTextStyles } from '@/hooks/useTextStyles';
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from 'react-native-bottom-tabs/react-navigation';

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator,
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const textStyles = useTextStyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabelStyle: textStyles.subtitle,
        headerShown: false,
      }}
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
