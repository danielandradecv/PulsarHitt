import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definir los tipos de las props
interface TotalTimeProps {
  workTime: number; // Tiempo de trabajo en segundos
  restTime: number; // Tiempo de descanso en segundos
  rounds: number; // Número de rondas
  sets: number; // Número de sets
  restSet: number; // Descanso entre sets en segundos
  formatTime: (time: number) => string; 
  textColor?: string;
}

const TotalTime: React.FC<TotalTimeProps> = ({ workTime, restTime, rounds, sets, restSet, formatTime, textColor }) => {


  // Función para formatear el tiempo total
  const formatTimeTotal = (time: number) => {
      if (time >= 60) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return <><Text style={{fontFamily:'type2', width:300, height:300 }}>{minutes}</Text><Text style={{fontFamily:'type2', fontSize:40}}>m </Text ><Text style={{fontFamily:'type2' }}>{seconds < 10 ? '0' + seconds : seconds}</Text><Text style={{fontFamily:'type2', fontSize:40}}>s</Text></>;
      }
      return <><Text style={{fontFamily:'type2', width:300, height:300 }}>{time}</Text><Text style={{fontFamily:'type2', fontSize:40}}>s</Text ></> ;
    };
  

  // Calcular el tiempo total de entrenamiento
  const totalTrainingTime = sets === 0 
    ? (workTime + restTime) * rounds // Si sets es 0, solo se considera (workTime + restTime) * rounds
    : ((workTime + restTime) * rounds) * sets + restSet * (sets - 1);

  return (
    <View style={{ marginBottom: 20, marginTop: 50, alignItems: 'center' }}>
      <View>
        <Text style={[{ color: textColor }, { fontSize: 90,  fontFamily: 'type', textTransform: 'lowercase' }]}>
          {formatTimeTotal(totalTrainingTime)}
        </Text>
      </View>
      <Text style={[{ color: textColor },{  fontSize: 24, marginTop: 10, fontFamily: 'type1' }]}>
        {formatTime(workTime)} Work - {formatTime(restTime)} Rest - {rounds} Rounds
      </Text>
      <Text style={[{ color: textColor },{ fontSize: 24, marginTop: 5, fontFamily: 'type1' }]}>
        {sets} Sets - {formatTime(restSet)} Rest Sets
      </Text>
    </View>
  );
};

export default TotalTime;
