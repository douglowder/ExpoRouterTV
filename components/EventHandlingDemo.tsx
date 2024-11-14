import {
  StyleSheet,
  Text,
  View,
  TVFocusGuideView,
  useTVEventHandler,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  GestureResponderEvent,
  FocusEvent,
  BlurEvent,
  PressableProps,
  TVParallaxProperties,
  FlatList,
} from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';

export function EventHandlingDemo() {
  const [remoteEventLog, setRemoteEventLog] = useState<string[]>([]);
  const [pressableEventLog, setPressableEventLog] = useState<string[]>([]);

  const logWithAppendedEntry = (log: string[], entry: string) => {
    const limit = 50;
    const newEventLog = log.slice(log.length === limit ? 1 : 0, limit);
    newEventLog.push(entry);
    return newEventLog;
  };

  const updatePressableLog = (entry: string) => {
    setPressableEventLog((log) => logWithAppendedEntry(log, entry));
  };

  useTVEventHandler((event) => {
    const { eventType, eventKeyAction } = event;
    if (eventType !== 'focus' && eventType !== 'blur') {
      setRemoteEventLog((log) =>
        logWithAppendedEntry(
          log,
          `type=${eventType}, action=${
            eventKeyAction !== undefined ? eventKeyAction : ''
          }`,
        ),
      );
    }
  });

  const styles = useDemoStyles();

  return (
    <TVFocusGuideView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.logContainer}>
          <View>
            <ThemedText type="defaultSemiBold">
              Remote control events
            </ThemedText>
            <FlatList
              contentContainerStyle={styles.logText}
              data={remoteEventLog}
              renderItem={({ item }) => (
                <ThemedText style={styles.logText}>{item}</ThemedText>
              )}
            />
          </View>
          <View>
            <ThemedText type="defaultSemiBold">
              Native focus/blur/press events
            </ThemedText>
            <FlatList
              contentContainerStyle={styles.logText}
              data={pressableEventLog}
              renderItem={({ item }) => (
                <ThemedText style={styles.logText}>{item}</ThemedText>
              )}
            />
          </View>
        </ThemedView>
        <ThemedView
          style={styles.buttonsContainer}
          onFocus={(event: ButtonEvent) => {
            updatePressableLog(`Bubbled focus event from ${event.title}`);
          }}
          onBlur={(event: ButtonEvent) => {
            updatePressableLog(`Bubbled blur event from ${event.title}`);
          }}
        >
          <ThemedText>View receives bubbled focus/blur events</ThemedText>
          <PressableButton title="Pressable 1" log={updatePressableLog} />
          <PressableButton title="Pressable 2" log={updatePressableLog} />
          <TouchableOpacityButton
            title="TouchableOpacity"
            log={updatePressableLog}
          />
          <TouchableHighlightButton
            title="TouchableHighlight"
            log={updatePressableLog}
          />
        </ThemedView>
      </ThemedView>
    </TVFocusGuideView>
  );
}

type ButtonEvent = (FocusEvent | BlurEvent) & { title?: string };

type ButtonProps = {
  title: string;
  log: (entry: string) => void;
  tvParallaxProperties?: TVParallaxProperties;
};

const handleFocusOrBlur = (
  event: ButtonEvent,
  props: ButtonProps,
  type: string,
) => {
  event.title = props.title; // Attach info to the event before it bubbles up
  props.log(`${props.title} ${type}`); // Log the event
};

const PressableButton = (props: PressableProps & ButtonProps) => {
  const styles = useDemoStyles();

  return (
    <Pressable
      onFocus={(event) => handleFocusOrBlur(event, props, 'focus')}
      onBlur={(event) => handleFocusOrBlur(event, props, 'blur')}
      onPress={() => props.log(`${props.title} press`)}
      onPressIn={() => props.log(`${props.title} pressIn`)}
      onPressOut={() => props.log(`${props.title} pressOut`)}
      onLongPress={() => props.log(`${props.title} longPress`)}
      style={({ pressed, focused }) =>
        pressed || focused ? styles.pressableFocused : styles.pressable
      }
      {...props}
    >
      {({ focused }) => {
        return (
          <ThemedText style={styles.pressableText}>
            {focused ? `${props.title} focused` : props.title}
          </ThemedText>
        );
      }}
    </Pressable>
  );
};

const TouchableOpacityButton = (props: ButtonProps) => {
  const styles = useDemoStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.pressable}
      onFocus={(event) => handleFocusOrBlur(event, props, 'focus')}
      onBlur={(event) => handleFocusOrBlur(event, props, 'blur')}
      onPress={() => props.log(`${props.title} press`)}
      onPressIn={() => props.log(`${props.title} pressIn`)}
      onPressOut={() => props.log(`${props.title} pressOut`)}
      onLongPress={() => props.log(`${props.title} longPress`)}
    >
      <Text style={styles.pressableText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const TouchableHighlightButton = (props: ButtonProps) => {
  const styles = useDemoStyles();
  const underlayColor = useThemeColor({}, 'tint');

  return (
    <TouchableHighlight
      style={styles.pressable}
      underlayColor={underlayColor}
      onFocus={(event) => handleFocusOrBlur(event, props, 'focus')}
      onBlur={(event) => handleFocusOrBlur(event, props, 'blur')}
      onPress={() => props.log(`${props.title} press`)}
      onPressIn={() => props.log(`${props.title} pressIn`)}
      onPressOut={() => props.log(`${props.title} pressOut`)}
      onLongPress={() => props.log(`${props.title} longPress`)}
    >
      <Text style={styles.pressableText}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const useDemoStyles = function () {
  const { scale } = useScale();
  const highlightColor = useThemeColor({}, 'link');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const buttonContainerBackgroundColor = useThemeColor(
    {},
    'containerBackground',
  );
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: buttonContainerBackgroundColor,
      padding: 20 * scale,
    },
    logContainer: {
      flex: 3,
      flexDirection: 'row',
      padding: 5 * scale,
      margin: 5 * scale,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    logText: {
      maxHeight: 150 * scale,
      minWidth: 200 * scale,
      fontSize: 10 * scale,
      lineHeight: 12 * scale,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    pressable: {
      borderColor: highlightColor,
      backgroundColor: textColor,
      borderWidth: 1,
      borderRadius: 5 * scale,
      margin: 5 * scale,
    },
    pressableFocused: {
      borderColor: highlightColor,
      backgroundColor: tintColor,
      borderWidth: 1,
      borderRadius: 5 * scale,
      margin: 5 * scale,
    },
    pressableText: {
      color: backgroundColor,
      fontSize: 15 * scale,
    },
  });
};
