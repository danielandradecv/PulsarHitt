import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ProgressBarProps {
  totalDuration: number; // Duración total del entrenamiento en segundos
  totalElapsed: number; // Tiempo transcurrido en segundos
  isPaused: boolean; // Estado de pausa
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalDuration,
  totalElapsed,
  isPaused,
}) => {
  const progress = Math.min(totalElapsed / totalDuration, 1); // Progreso (0-1)
  const animationProgress = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animationProgress, {
      toValue: progress,
      duration: 0, // Duración de la animación
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      // Formato para horas:minutos:segundos
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    // Formato para minutos:segundos
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const animatedWidth = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: animatedWidth },
          ]}
        />
      </View>
      <Text style={styles.timeText}>
        {formatTime(totalDuration - totalElapsed)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  progressBarContainer: {
    height: 8,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProgressBar;
