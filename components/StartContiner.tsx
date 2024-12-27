import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Svg, { Path } from 'react-native-svg';
import Total from './Total';

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
  const totalRounds = rounds;
  const [phase, setPhase] = useState<Phase>('prepare');
  const [progress, setProgress] = useState(prepare);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [pieData, setPieData] = useState(
    Array(totalRounds)
      .fill(null)
      .map((_, index) => ({
        completed: index === 0,
        color: index === 0 ? '#00ff00' : '#ccc',
      }))
  );

  const startTimeRef = useRef<number | null>(null);

  const getPhaseDuration = (currentPhase: Phase) => {
    switch (currentPhase) {
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

  const nextPhase = () => {
    if (phase === 'prepare') {
      setPhase('work');
      setProgress(workTime);
    } else if (phase === 'work') {
      setPhase('rest');
      setProgress(restTime);
    } else if (phase === 'rest') {
      if (currentRound < totalRounds) {
        setCurrentRound((prev) => prev + 1);
        setPhase('work');
        setProgress(workTime);
        updatePieData(currentRound);
      } else if (currentSet < sets) {
        setCurrentSet((prev) => prev + 1);
        setCurrentRound(1);
        setPhase('restSet');
        setProgress(restSet);
        setPieData(
          Array(totalRounds)
            .fill(null)
            .map(() => ({
              completed: false,
              color: '#ccc',
            }))
        );
      } else {
        setPhase('done'); // Indicar que se completaron todos los sets
      }
    } else if (phase === 'restSet') {
      setPhase('work');
      setProgress(workTime);

      // Reinicia el estado del donut para el nuevo set
      setPieData(
        Array(totalRounds)
          .fill(null)
          .map((_, index) => ({
            completed: index === 0, // Solo el primer segmento está activo
            color: index === 0 ? '#00ff00' : '#ccc',
          }))
      );
    }
    startTimeRef.current = Date.now(); // Reiniciar el tiempo de inicio de la nueva fase
  };

  const updatePieData = (roundIndex: number) => {
    setPieData((prevData) =>
      prevData.map((segment, index) =>
        index === roundIndex ? { ...segment, completed: true, color: '#00ff00' } : segment
      )
    );
  };

  useEffect(() => {
    const duration = getPhaseDuration(phase) * 1000; // Convertir a milisegundos
    startTimeRef.current = Date.now();

    const tick = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max((duration - elapsed) / 1000, 0);

      setProgress(remaining);

      if (remaining <= 0) {
        nextPhase();
      } else {
        requestAnimationFrame(tick);
      }
    };

    const animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [phase]);

  const renderDonut = () => {
    return (
      <Svg height="250" width="250">
        {pieData.map((segment, index) => {
          const gap = 20;
          const anglePerSegment = 360 / totalRounds - gap;
          const startAngle = -90 + index * (360 / totalRounds);
          const endAngle = startAngle + anglePerSegment;

          const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
            const rad = (Math.PI / 180) * angle;
            return {
              x: cx + r * Math.cos(rad),
              y: cy + r * Math.sin(rad),
            };
          };

          const start = polarToCartesian(125, 125, 100, startAngle);
          const end = polarToCartesian(125, 125, 100, endAngle);
          const largeArcFlag = endAngle - startAngle > 180 ? '1' : '0';

          return (
            <Path
              key={index}
              d={`M ${start.x} ${start.y} A 100 100 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
              stroke={phase === 'restSet' ? '#ccc' : segment.color} // Desactiva colores activos en restSet
              strokeWidth={20}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Total prepare={prepare}
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet} 
        fontSize={30}
        fontSizeNumber={45}
        textColor="white"/>
      <View style={styles.donutContainer}>{renderDonut()}</View>
      <View style={styles.circularContainer}>
        <CircularProgress
          key={phase} // Forzar re-renderizado del componente en cada fase
          value={progress}
          maxValue={getPhaseDuration(phase)} // Actualiza dinámicamente el valor máximo
          radius={80}
          activeStrokeWidth={15}
          inActiveStrokeWidth={10}
          activeStrokeColor={'#fdd700'}
          inActiveStrokeColor={'#2f525f'}
          circleBackgroundColor={'#333'}
          title={` ${phase.toUpperCase()}`}
          subtitle={`Ronda ${currentRound}/${rounds}`}
          titleColor="#fff"
          subtitleColor="#fff"
        />
      </View>
      <Text style={styles.sets}>{`Set ${currentSet}/${sets}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  donutContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularContainer: {
    paddingTop: 60,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sets: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
});

export default StartContainer;
