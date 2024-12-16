import React from 'react';
import { View, Text, } from 'react-native';

// Definir los tipos de las props
interface TotalTimeProps {
  workTime: number; // Tiempo de trabajo en segundos
  restTime: number; // Tiempo de descanso en segundos
  rounds: number; // Número de rondas
  sets: number; // Número de sets
  restSet: number; // Descanso entre sets en segundos
  formatTime: (time: number) => string; 
  textColor?: string;
  fontSize?: number;
}

const TotalTime: React.FC<TotalTimeProps> = ({ workTime, restTime, rounds, sets, restSet, formatTime, textColor, fontSize }) => {

  return (
    <View style={{ marginBottom: 2, marginTop: 2, alignItems: 'center' }}>
      <View>
      </View>
      <Text style={[{ color: textColor },{ fontSize: fontSize },{marginTop: 10, fontFamily: 'type1' }]}>
        {formatTime(workTime)} Work - {formatTime(restTime)} Rest - {rounds} Rounds
      </Text>
      <Text style={[{ color: textColor },{ fontSize: fontSize },{marginTop: 5, fontFamily: 'type1' }]}>
        {sets} Sets - {formatTime(restSet)} Rest Sets
      </Text>
    </View>
  );
};

export default TotalTime;
