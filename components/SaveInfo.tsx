// SaveInfo.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TotalTime from './Total';
import ViewControls from './ViewControls';

const SaveInfo: React.FC = () => {
     const [workTime, setWorkTime] = useState(18); 
      const [restTime, setRestTime] = useState(14); 
      const [rounds, setRounds] = useState(4); 
      const [sets, setSets] = useState(1); // 
      const [restSet, setRestSet] = useState(24);

        // darle formato de s en segundos y m en minutos
  const formatTime = (time: number) => {
    if (time >= 60) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`;
    }
    return `${time}s`;
  };
  
  const formatTime2 = (time: number) => {
    if (time >= 60) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes} ${seconds < 10 ? '0' + seconds : seconds}`;
    }
    return `${time}`;
  };
  const totalTrainingTime = sets === 0 
    ? (workTime + restTime) * rounds // Si sets es 0, solo se considera (workTime + restTime) * rounds
    : ((workTime + restTime) * rounds) * sets + restSet * (sets - 1);


  const formatTimeTotal = (time: number) => {
        if (time >= 60) {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          return <><Text style={{fontFamily:'type2', width:300, height:300 }}>{minutes}</Text><Text style={{fontFamily:'type2', fontSize:40}}>m </Text ><Text style={{fontFamily:'type2' }}>{seconds < 10 ? '0' + seconds : seconds}</Text><Text style={{fontFamily:'type2', fontSize:40}}>s</Text></>;
        }
        return <><Text style={{fontFamily:'type2', width:300, height:300 }}>{time}</Text><Text style={{fontFamily:'type2', fontSize:40}}>s</Text ></> ;
      };



  return (
    <View style={styles.modalContent}>
        <Text style={{fontFamily:'type2',fontSize:50}}>Tabata timer</Text>
                    <Text style={[ { fontSize: 90,  fontFamily: 'type', textTransform: 'lowercase' }]}>
                      {formatTimeTotal(totalTrainingTime)}
                    </Text>
      

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
    backgroundColor: '#ffffff',
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

export default SaveInfo;
