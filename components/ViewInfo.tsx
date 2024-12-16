// SaveInfo.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ViewControls from './ViewControls';
import Resumen from './Resumen';
import TotalTime from './Total';

interface ViewInfoProps {
  workTime: number; // Tiempo de trabajo en segundos
  restTime: number; // Tiempo de descanso en segundos
  rounds: number; // Número de rondas
  sets: number; // Número de sets
  restSet: number; // Descanso entre sets en segundos
  formatTime: (time: number) => string; 
  formatTime2: (time: number) => string; 
  textColor?: string;
  fontSize?: number;
}

const ViewInfoProps: React.FC<ViewInfoProps> = ({ workTime, restTime, rounds, sets, restSet, formatTime, formatTime2  }) => {

  

  return (
    <View style={styles.modalContent}>
        <Text style={{fontFamily:'type2',fontSize:40}}>Tabata timer</Text>
        <TotalTime
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet} 
        fontSize={40}
        fontSizeNumber={65}
        textColor="#000000"/>            
      

<View style={{flexDirection:'row', display:'flex'}}>
<ViewControls
        label="Work"
        time={workTime}
        formatTime={formatTime}
      />
<ViewControls
    label="Rest"
    time={restTime}
    formatTime={formatTime2}
    />
      <ViewControls
        label="Rounds"
        time={rounds}
        
        formatTime={formatTime2}
      />

</View>

<View style={{flexDirection:'row', display:'flex'}}>
<ViewControls
        label="Sets"
        time={sets}
        
        formatTime={formatTime2}
      />
      <ViewControls
        label="Rest Sets"
        time={restSet}
      
        formatTime={formatTime}
      />

</View>

<Resumen workTime={workTime}
restTime={restTime}
rounds={rounds}
sets={sets}
restSet={restSet} 
formatTime={formatTime}
textColor="#000000"
fontSize={20}/>
    <TouchableOpacity
         
            
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffbb00',
              width: 320,
              height: 70,
              borderRadius: 40,
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 30, fontFamily:'type1' }}>Start</Text>
          </TouchableOpacity>  
          
    </View>
    
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

});

export default ViewInfoProps;
