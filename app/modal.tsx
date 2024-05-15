import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Platform, Pressable } from 'react-native';
import { version as rnVersion } from 'react-native/package.json';
import { version as routerVersion } from 'expo-router/package.json';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
const hermesVersion =
  (global as any).HermesInternal?.getRuntimeProperties?.()[
    'OSS Release Version'
  ] ?? '';
const jsEngine =
  Platform.OS === 'web' ? 'Browser' : hermesVersion ? `Hermes` : 'JSC';

export default function Modal() {
  const styles = useHomeScreenStyles();
  const scale = useScale();

  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#A1CEDC' }}
      headerImage={
        <Ionicons
          size={120 * scale}
          name="logo-react"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">About this demo</ThemedText>
        <ThemedText>{`expo-router: ${routerVersion}`}</ThemedText>
        <ThemedText>{`react-native-tvos: ${rnVersion}`}</ThemedText>
        <ThemedText>{`JS engine: ${jsEngine}`}</ThemedText>
      </ThemedView>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      <Link href="../" asChild>
        <Pressable>
          {({ focused }) => (
            <ThemedText style={{ opacity: focused ? 0.6 : 1.0 }}>
              Dismiss
            </ThemedText>
          )}
        </Pressable>
      </Link>
    </ParallaxScrollView>
  );
}

const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
    },
    headerImage: {
      color: '#1D3D47',
      bottom: 0,
      left: 10 * scale,
      position: 'absolute',
    },
  });
};
