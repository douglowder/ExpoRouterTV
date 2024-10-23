import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import VideoTest from '@/components/VideoTest';

export default function VideoDemoScreen() {
  const styles = useTVDemoScreenStyles();
  const { scale } = useScale();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310 * scale}
          name="tv-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Video demo</ThemedText>
      </ThemedView>
      <VideoTest />
    </ParallaxScrollView>
  );
}

const useTVDemoScreenStyles = function () {
  const { scale } = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -45 * scale,
      left: 0,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};
