import { useVideoPlayer, VideoView, VideoPlayerStatus } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Pressable } from 'react-native';
import { useScale } from '@/hooks/useScale';
import { useInterval } from '@/hooks/useInterval';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoTest() {
  const styles = useVideoStyles();
  const ref: any = useRef<VideoView>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoStatus, setVideoStatus] = useState<VideoPlayerStatus>('idle');
  const [fractionComplete, setFractionComplete] = useState(0);

  const fractionCompleteFromPosition = (
    position: number | undefined,
    duration: number | undefined,
  ) => {
    return duration !== undefined ? (position ?? 0) / duration : 0;
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.addListener('statusChange', (payload) => {
      setVideoStatus(payload.status);
      console.log(`video status = ${payload.status}`);
    });
  });

  useEffect(() => {
    if (player.playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [player.playing]);

  useEffect(() => {
    if (videoStatus === 'readyToPlay') {
      // Autoplay on start
      //      player.play();
    }
  }, [videoStatus]);

  useInterval(() => {
    setFractionComplete(
      fractionCompleteFromPosition(player.currentTime, player.duration),
    );
  }, 1000);

  return (
    <View style={styles.container}>
      {videoStatus === 'readyToPlay' || Platform.OS === 'android' ? (
        <VideoView
          ref={ref}
          style={styles.videoStyle}
          player={player}
          nativeControls
          contentFit="fill"
          showsTimecodes
          allowsFullscreen
          allowsPictureInPicture
          contentPosition={{ dx: 0, dy: 0 }}
        />
      ) : (
        <View style={styles.videoStyle} />
      )}
      <ProgressBar fractionComplete={fractionComplete} />
      <View style={styles.buttons}>
        <Button
          title="Rewind"
          onPress={() => {
            player.currentTime = 0;
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <Button
          title="Back 5 sec"
          onPress={() => {
            player.seekBy(-5);
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (player.playing) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
        <Button
          title="Forward 5 sec"
          onPress={() => {
            player.seekBy(5);
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <Button
          title="Full screen"
          onPress={() => {
            ref.current.enterFullscreen();
          }}
        />
      </View>
    </View>
  );
}

const ProgressBar = (props: any) => {
  const styles = useVideoStyles();
  const progressBarStyles = {
    container: styles.progressContainer,
    left: [styles.progressLeft, { flex: props?.fractionComplete || 0.0 }],
    right: [
      styles.progressRight,
      { flex: 1.0 - props?.fractionComplete || 1.0 },
    ],
  };
  return (
    <View style={progressBarStyles.container}>
      <View style={progressBarStyles.left} />
      <View style={progressBarStyles.right} />
    </View>
  );
};

const Button = (props: { title: string; onPress: () => void }) => {
  const styles = useVideoStyles();
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={({ pressed, focused }) => [
        styles.button,
        pressed || focused ? { backgroundColor: 'blue' } : {},
      ]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};

const backgroundColor = '#ecf0f1';

const useVideoStyles = () => {
  const { width, height, scale } = useScale();

  const dim = Math.min(width, height);

  const vidWidth = dim === height ? width * 0.3 : height * 0.3;
  const vidHeight = (vidWidth * 480) / 960;

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
    },
    videoStyle: {
      width: vidWidth,
      height: vidHeight,
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.75,
      marginHorizontal: 50 * scale,
    },
    button: {
      backgroundColor: 'darkblue',
      margin: 20 * scale,
      borderRadius: 5 * scale,
      padding: 10 * scale,
    },
    buttonText: {
      color: 'white',
      fontSize: 20 * scale,
    },
    progressContainer: {
      backgroundColor,
      flexDirection: 'row',
      width: vidWidth,
      height: 5 * scale,
      margin: 0,
    },
    progressLeft: {
      backgroundColor: 'blue',
      borderTopRightRadius: 5 * scale,
      borderBottomRightRadius: 5 * scale,
      flexDirection: 'row',
      height: '100%',
    },
    progressRight: {
      backgroundColor,
      flexDirection: 'row',
      height: '100%',
    },
  });
};
