// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { useScale } from '@/hooks/useScale';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  const { scale } = useScale();
  return (
    <Ionicons
      size={25 * scale}
      style={[{ marginTop: -10 * scale, marginLeft: -20 * scale }, style]}
      {...rest}
    />
  );
}
