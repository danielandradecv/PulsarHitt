import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definir los tipos de las props
interface TotalTimeProps {
  prepare: number;
  workTime: number; 
  restTime: number; 
  rounds: number; 
  sets: number; 
  restSet: number; 
  textColor?: string;
  fontSize?: number;
  fontSizeNumber?: number;
}

const TotalTime: React.FC<TotalTimeProps> = ({prepare, workTime, restTime, rounds, sets, restSet, textColor, fontSize, fontSizeNumber }) => {


  // Función para formatear el tiempo total
  const formatTimeTotal = (time: number) => {
      if (time >= 60) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return <><Text style={{fontFamily:'type2', }}>{minutes}</Text><Text style={[{fontFamily:'type2'},{ fontSize: fontSize }]}>m </Text ><Text style={{fontFamily:'type2' }}>{seconds < 10 ? '0' + seconds : seconds}</Text><Text style={[{fontFamily:'type2'},{ fontSize: fontSize }]}>s</Text></>;
      }
      return <><Text style={{fontFamily:'type2', }}>{time}</Text><Text style={[{fontFamily:'type2'},{ fontSize: fontSize }]}>s</Text ></> ;
    };
  

  // Calcular el tiempo total de entrenamiento
  const totalTrainingTime = sets === 0 
    ? (prepare + workTime + restTime) * rounds // Si sets es 0, solo se considera (workTime + restTime) * rounds
    : ((prepare + workTime + restTime) * rounds) * sets + restSet * (sets - 1);

  return (
    <View style={{ marginBottom: 2, marginTop: 20, alignItems: 'center' }}>
      <View>
        <Text style={[{ color: textColor }, { fontSize: fontSizeNumber }, {  fontFamily: 'type', textTransform: 'lowercase' }]}>
          {formatTimeTotal(totalTrainingTime)}
        </Text>
      </View>
    </View>
  );
};

export default TotalTime;
