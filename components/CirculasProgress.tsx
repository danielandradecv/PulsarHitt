import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgress2Props {
  size: number;
  strokeWidth: number;
  strokeWidth2: number;
  progress: number; // Porcentaje (0-100)
  maxValue: number;
  phase: 'work' | 'rest' | 'prepare' | 'restSet' | 'done';
  currentRound: number;
  totalRounds: number;
  
  remainingTime: number; // Tiempo restante en segundos
}

const CircularProgress2: React.FC<CircularProgress2Props> = ({
  size,
  strokeWidth,
  strokeWidth2,
  progress,
  maxValue,
  phase,
  currentRound,
  totalRounds,
  
  remainingTime,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / maxValue) * circumference;

  const getPhaseColor = () => {
    switch (phase) {
      case 'work':
        return '#4caf50'; // Verde
      case 'rest':
        return '#f44336'; // Rojo
      case 'prepare':
        return '#2196f3'; // Azul
      case 'restSet':
        return '#ff9800'; // Naranja
      default:
        return '#ccc'; // Gris
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
  
    if (mins > 0) {
      // Formato MM:SS
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      // Si el número es menor a 10, mostrar solo un dígito
      return secs < 10 ? `${secs}` : `${secs.toString().padStart(2, '0')}`;
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Fondo del círculo */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ddd"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progreso */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getPhaseColor()}
          strokeWidth={strokeWidth2}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.overlay}>
        <Text style={styles.phaseText}>{phase.toUpperCase()}</Text>
        <Text style={styles.timeText}>{formatTime(remainingTime)}</Text>
        <Text style={styles.roundText}>
          Ronds {currentRound}/{totalRounds}
        </Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  phaseText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  roundText: {
    fontSize: 18,
    color: '#ffffff',
  },
 
});

export default CircularProgress2;
