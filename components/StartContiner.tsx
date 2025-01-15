import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress2 from '../components/CirculasProgress';
import ProgressBar from './ProgressBar';


interface StartContainerProps {
  title: string;
  prepare: number;
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restSet: number;
}

type Phase = 'prepare' | 'work' | 'rest' | 'restSet' | 'done';

const StartContainer: React.FC<StartContainerProps> = ({
  title,
  prepare,
  workTime,
  restTime,
  rounds,
  sets,
  restSet,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(prepare);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isRunnerVisible, setIsRunnerVisible] = useState(true);

  const getPhaseDuration = (phase: Phase) => {
    switch (phase) {
      case 'prepare':
        return prepare;
      case 'work':
        return workTime;
      case 'rest':
        return restTime;
      case 'restSet':
        return restSet;
      default:
        return 0;
    }
  };

  const phases = useMemo(() => {
    const phaseList: Phase[] = [];
    phaseList.push('prepare'); // Fase inicial de preparación
  
    for (let set = 0; set < sets; set++) {
      for (let round = 0; round < rounds; round++) {
        phaseList.push('work');
        // Agregar descanso solo si no es la última ronda del set
        if (round < rounds - 1) {
          phaseList.push('rest');
        }
      }
      // Agregar descanso entre sets si no es el último set
      if (set < sets - 1) {
        phaseList.push('restSet');
      }
    }
  
    phaseList.push('done'); // Fase final
    return phaseList;
  }, [rounds, sets]);
  

  const totalDuration = useMemo(() => {
    const workAndRestTime = sets * rounds * workTime + sets * (rounds - 1) * restTime;
    const restSetDuration = (sets - 1) * restSet;
    return prepare + workAndRestTime + restSetDuration;
  }, [prepare, workTime, restTime, rounds, sets, restSet]);
  


  const totalElapsed = useMemo(() => {
    return phases.slice(0, phaseIndex).reduce((sum, phase) => sum + getPhaseDuration(phase), 0) + (getPhaseDuration(phases[phaseIndex]) - progress);
  }, [phaseIndex, progress, phases]);

  const timerRef = useRef<number | null>(null);

  const updatePhase = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= phases.length) return;
    const newPhase = phases[newIndex];
    setPhaseIndex(newIndex);
    setProgress(getPhaseDuration(newPhase)); // Establece la duración correcta
    setRemainingTime(null); // Reinicia el tiempo restante
  };
  
  

  const nextPhase = () => updatePhase(phaseIndex + 1);
  const prevPhase = () => updatePhase(phaseIndex - 1);

  useEffect(() => {
    if (totalElapsed >= totalDuration) {
      setIsRunnerVisible(false); // Oculta la animación cuando el progreso es 100%
    } else {
      setIsRunnerVisible(true); // Muestra la animación cuando el progreso es menor al 100%
    }
  }, [totalElapsed, totalDuration]);
  

  useEffect(() => {
    if (phases[phaseIndex] === 'done' || isPaused) return;

    const duration = remainingTime !== null 
      ? remainingTime * 1000 
      : getPhaseDuration(phases[phaseIndex]) * 1000;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max((endTime - now) / 1000, 0);
      setProgress(remaining);

      if (remaining <= 0) {
        nextPhase();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(timerRef.current || 0);
  }, [phaseIndex, isPaused, remainingTime]);

  const handlePauseResume = () => {
    setIsPaused((prev) => {
      if (!prev) {
        setRemainingTime(progress);
      }
      return !prev;
    });
  };

  const { currentSet, currentRound } = useMemo(() => {
    let currentSet = 1;
    let currentRound = 0;
  
    for (let i = 0; i <= phaseIndex; i++) {
      const phase = phases[i];
      if (phase === 'restSet') {
        currentSet++;
        currentRound = 0; // Reiniciar la ronda en un nuevo set
      } else if (phase === 'work') {
        currentRound++;
      }
    }
  
    return { currentSet, currentRound };
  }, [phaseIndex, phases]);
  
  

  const pieData = useMemo(() => {
  return Array(rounds).fill(null).map((_, index) => {
    const currentPhase = phases[phaseIndex];

    if (currentPhase === 'prepare' || currentPhase === 'restSet') {
      // Todos los donuts grises durante prepare/restSet
      return { color: '#ccc' };
    }

    if (currentPhase === 'work' || currentPhase === 'rest') {
      // Iluminar los donuts completados o el actual si es work
      return {
        color: index < currentRound ? 'rgb(255, 196, 0)' : '#ccc',
      };
    }

    // Default (done or other states)
    return { color: '#ccc' };
  });
}, [phases, phaseIndex, currentRound, rounds]);


  const renderDonut = useMemo(() => {
    const radius = 100;
    const cx = 125;
    const cy = 125;
    const gap = 20;
    const anglePerSegment = 365 / rounds - gap;

    const polarToCartesian = (angle: number) => {
      const rad = (Math.PI / 180) * angle;
      return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
      };
    };

    return (
      <Svg height="250" width="250">
        {pieData.map((segment, index) => {
          const startAngle = -84 + index * (360 / rounds);
          const endAngle = startAngle + anglePerSegment;

          const start = polarToCartesian(startAngle);
          const end = polarToCartesian(endAngle);
          const largeArcFlag = endAngle - startAngle > 180 ? '1' : '0';

          return (
            <Path
              key={index}
              d={`M ${start.x} ${start.y} A 100 100 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
              stroke={segment.color}
              strokeWidth={20}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </Svg>
    );
  }, [pieData]);

  const getActiveStrokeColor = (phase: Phase, progress: number, maxValue: number) => {
    // Definimos los colores y los umbrales para cada fase
    const phaseColorStages: Record<Phase, { threshold: number; color: string }[]> = {
      prepare: [
        { threshold: 0.1, color: '#0cffae' }, // Celeste hasta 75%\
        { threshold: 0.30, color: '#05caa9' }, // Celeste hasta 75%
        { threshold: 1.0, color: '#00BFFF' }, // Azul después
      ],
      work: [
        { threshold: 0.1, color: '#f7bd00' }, // Verde hasta 50%
        { threshold: 0.20, color: '#9ff107' }, // Verde hasta 50%
        { threshold: 0.40, color: '#88ff00' }, // Verde Lima hasta 75%
        { threshold: 1.0, color: '#00ff00' }, // Verde Oscuro después
      ],
      rest: [
        { threshold: 0.1, color: '#ffa600' }, // Naranja hasta 50%
        { threshold: 0.20, color: '#f14907' }, // Naranja hasta 50%
        { threshold: 0.40, color: '#f86300' }, // Rojo hasta 75%
        { threshold: 1.0, color: '#ff0000' }, // Rojo Oscuro después
      ],
      restSet: [
        { threshold: 0.1, color: '#0cffae' }, // Celeste hasta 75%\
        { threshold: 0.30, color: '#05caa9' }, // Celeste hasta 75%
        { threshold: 1.0, color: '#00BFFF' }, // Azul después
      ],
      done: [
        { threshold: 1.0, color: '#CCCCCC' }, // Gris Completo
      ],
    };
  
    const stages = phaseColorStages[phase];
    const percentage = progress / maxValue;
  
    // Encontrar los dos colores más cercanos
    for (let i = 0; i < stages.length - 1; i++) {
      const start = stages[i];
      const end = stages[i + 1];
      if (percentage <= end.threshold) {
        // Interpolar entre los colores
        const factor = (percentage - start.threshold) / (end.threshold - start.threshold);
        return interpolateColor(start.color, end.color, factor);
      }
    }
  
    // Si no se encuentra un tramo, devolvemos el último color
    return stages[stages.length - 1].color;
  };
  
  // Función para interpolar entre dos colores
  const interpolateColor = (start: string, end: string, factor: number) => {
    const hexToRgb = (hex: string) =>
      hex
        .replace(/^#/, '')
        .match(/.{2}/g)!
        .map((x) => parseInt(x, 16));
  
    const rgbToHex = (r: number, g: number, b: number) => {
      return (
        '#' +
        [r, g, b]
          .map((x) =>
            Math.max(0, Math.min(255, x)) // Asegurarse de que el valor esté en el rango 0-255
              .toString(16)
              .padStart(2, '0') // Asegurar siempre 2 caracteres por canal
          )
          .join('')
      );
    };
  
    const startRgb = hexToRgb(start);
    const endRgb = hexToRgb(end);
  
    const interpolatedRgb = startRgb.map((start, index) =>
      Math.round(start + (endRgb[index] - start) * factor)
    );
  
    return rgbToHex(interpolatedRgb[0], interpolatedRgb[1], interpolatedRgb[2]);
  };
  

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`; // Asegura que los segundos tengan dos dígitos
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.donutContainer}>
        {renderDonut}

        <View style={styles.circularProgressContainer}>
        
  <CircularProgress2
    size={160}
    strokeWidth={10}
    strokeWidth2={10}
    progress={progress}
    maxValue={getPhaseDuration(phases[phaseIndex])}
    phase={phases[phaseIndex]}
    currentRound={currentRound}
    totalRounds={rounds}
    remainingTime={Math.floor(progress)}
  />

        </View>
      </View>
      <Text style={styles.sets}>{`Set ${currentSet}/${sets}`}</Text>

<View>
 

<View style={styles.controlButtons}>
  <TouchableOpacity onPress={prevPhase}>
    <Ionicons name="arrow-back" size={40} color="white" />
  </TouchableOpacity>
  <TouchableOpacity onPress={handlePauseResume}>
    <Ionicons name={isPaused ? 'play' : 'pause'} size={40} color="white" />
  </TouchableOpacity>
  <TouchableOpacity onPress={nextPhase}>
    <Ionicons name="arrow-forward" size={40} color="white" />
  </TouchableOpacity>
</View>
</View>

<ProgressBar
  totalDuration={totalDuration}
  totalElapsed={totalElapsed}
  isPaused={isPaused}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17396d3e',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  donutContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  sets: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00BFFF',
  },

  runner: {
    position: 'absolute',
    top: -8, // Posiciona la animación por encima de la barra
    transform: [{ translateX: -35 }], // Centra el corredor sobre la barra
    zIndex: 1, // Asegura que la animación esté por encima de la
  },
  lottieAnimation: {
    width: 80,
    height: 80, // Tamaño de la animación
  },
  progressBarContainer: {
    width: '80%',
    height: 50, // Altura suficiente para la barra y la animación
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Necesario para posicionar elementos hijos con "absolute"
  },

  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'absolute', // Permite que la barra esté detrás del corredor
    bottom: 0, // Mantiene la barra en la parte inferior del contenedor
  },
  remainingTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10, // Espaciado entre la barra y el contador
    textAlign: 'center',
  },
});

export default StartContainer;
