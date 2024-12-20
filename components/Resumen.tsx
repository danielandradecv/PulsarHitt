import React from 'react';
import { View, Text, } from 'react-native';

// Definir los tipos de las props
interface TotalTimeProps {
  prepare: number;
  workTime: number; 
  restTime: number; 
  rounds: number; 
  sets: number; 
  restSet: number; 
  formatTime: (time: number) => string; 
  textColor?: string;
  fontSize?: number;
}

const TotalTime: React.FC<TotalTimeProps> = ({ prepare, workTime, restTime, rounds, sets, restSet, formatTime, textColor, fontSize }) => {

  return (
    <View style={{ marginBottom: 2, marginTop: 2, alignItems: 'center' }}>
      <Text style={[{ color: textColor },{ fontSize: fontSize },{marginTop: 5, fontFamily: 'type1' }]}>
        {formatTime(prepare)} Prepare 
      </Text>
      <Text style={[{ color: textColor },{ fontSize: fontSize },{marginTop: 5, fontFamily: 'type1' }]}>
        {formatTime(workTime)} Work - {formatTime(restTime)} Rest - {rounds} Rounds
      </Text>
      <Text style={[{ color: textColor },{ fontSize: fontSize },{marginTop: 5, fontFamily: 'type1' }]}>
        {sets} Sets - {formatTime(restSet)} Rest Sets
      </Text>
    </View>
  );
};

export default TotalTime;
