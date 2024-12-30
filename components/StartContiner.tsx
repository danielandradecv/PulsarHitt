import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Svg, { Path } from 'react-native-svg';
import Total from './Total';
import { Ionicons } from '@expo/vector-icons';

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
  const [phaseIndex, setPhaseIndex] = useState(0); // Índice de la fase actual
  const [progress, setProgress] = useState(prepare);

  const timerRef = useRef<number | null>(null);

  // Construir la lista completa de fases
  const phases = useMemo(() => {
    const phaseList: Phase[] = [];
    phaseList.push('prepare'); // Fase inicial
    for (let set = 1; set <= sets; set++) {
      for (let round = 1; round <= rounds; round++) {
        phaseList.push('work', 'rest'); // Trabajo y descanso en cada ronda
      }
      if (set < sets) {
        phaseList.push('restSet'); // Descanso entre sets (excepto el último set)
      }
    }
    phaseList.push('done'); // Fase final
    return phaseList;
  }, [rounds, sets]);

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
        return 0; // Done o casos no definidos
    }
  };

  const updatePhase = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= phases.length) return; // Limitar dentro del rango
    const newPhase = phases[newIndex];
    setPhaseIndex(newIndex);
    setProgress(getPhaseDuration(newPhase));
  };

  const nextPhase = () => updatePhase(phaseIndex + 1);
  const prevPhase = () => updatePhase(phaseIndex - 1);

  useEffect(() => {
    if (isPaused || phases[phaseIndex] === 'done') return;

    const duration = getPhaseDuration(phases[phaseIndex]) * 1000;
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
  }, [phaseIndex, isPaused]);

  const getCurrentSetAndRound = () => {
    let phaseCounter = 1; // Contar fases dentro de cada set
    let currentSet = 1;
    let currentRound = 1;

    for (let i = 1; i <= phaseIndex; i++) {
      const phase = phases[i];
      if (phase === 'restSet') {
        currentSet++;
        currentRound = 1;
      } else if (phase === 'work') {
        currentRound++;
      }
    }

    return { currentSet, currentRound };
  };

  const { currentSet, currentRound } = getCurrentSetAndRound();

  const pieData = useMemo(() => {
    return Array(rounds)
      .fill(null)
      .map((_, index) => ({
        color:
          phases[phaseIndex] === 'prepare' || phases[phaseIndex] === 'restSet'
            ? '#ccc'
            : index < currentRound - 1
            ? 'rgb(255, 196, 0)'
            : '#ccc',
      }));
  }, [phases, phaseIndex, currentRound, rounds]);

  const renderDonut = useMemo(() => {
    const radius = 100;
    const cx = 125;
    const cy = 125;
    const gap = 20;
    const anglePerSegment = 360 / rounds - gap;

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
          const startAngle = -90 + index * (360 / rounds);
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

  const getActiveStrokeColor = (phase: Phase) => {
    const colors: Record<Phase, string> = {
      prepare: '#00BFFF', // Azul para preparación
      work: '#00FF00',    // Verde para trabajo
      rest: '#FF0000',    // Rojo para descanso
      restSet: '#00BFFF', // Azul para descanso entre sets, igual que prepare
      done: '#CCCCCC',    // Gris para final
    };
    return colors[phase];
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Total
        prepare={prepare}
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet}
        fontSize={30}
        fontSizeNumber={45}
        textColor="white"
      />
      <View style={styles.donutContainer}>
        {renderDonut}
        <View style={styles.circularProgressContainer}>
        <CircularProgress
  key={phases[phaseIndex]}
  value={progress}
  maxValue={getPhaseDuration(phases[phaseIndex])}
  radius={80}
  activeStrokeWidth={15}
  inActiveStrokeWidth={10}
  activeStrokeColor={getActiveStrokeColor(phases[phaseIndex])} // Color dinámico basado en la fase
  inActiveStrokeColor="#2f525f"
  circleBackgroundColor="transparent"
  title={phases[phaseIndex].toUpperCase()}
  subtitle={`Set ${currentSet} - Ronda ${currentRound}`}
  titleColor="#fff"
  subtitleColor="#fff"
  progressValueColor="#fff"
  duration={0}
/>


        </View>
      </View>
      <Text style={styles.sets}>{`Set ${currentSet}/${sets}`}</Text>
      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={prevPhase}>
          <Ionicons name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPaused((prev) => !prev)}>
          <Ionicons name={isPaused ? 'play' : 'pause'} size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextPhase}>
          <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
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
    marginBottom: 20, // Espaciado hacia abajo
    textAlign: 'center',
  },
  donutContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Separación entre el donut y el siguiente elemento
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
    marginVertical: 20, // Espaciado superior e inferior
    textAlign: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espacio uniforme entre botones
    alignItems: 'center',
    width: '60%', // Tamaño ajustado del contenedor
    alignSelf: 'center', // Centra el contenedor en el eje horizontal
    marginTop: 20,
  },
});



export default StartContainer;
