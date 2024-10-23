import { Platform, useWindowDimensions } from 'react-native';

export function useScale(): {
  width: number;
  height: number;
  scale: number;
} {
  const { width, height } = useWindowDimensions();
  return {
    width,
    height,
    scale: Platform.isTV ? width / 1000 : 1,
  };
}
