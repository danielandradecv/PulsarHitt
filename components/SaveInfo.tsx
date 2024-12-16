import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Resumen from './Resumen';
import TotalTime from './Total';
import TimeControl from './TimeControl';

interface SaveInfoProps {
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restSet: number;
  formatTime: (time: number) => string;
  formatTime2: (time: number) => string;

  textColor?: string;
  fontSize?: number;
  handleRelease: () => void;
  onPressRest: (isIncrement: boolean) => void;
  onPressWorkTime: (isIncrement: boolean) => void;
  onPressRounds: (isIncrement: boolean) => void;
  onPressSet: (isIncrement: boolean) => void;
  onPressRestSet: (isIncrement: boolean) => void;
}

const SaveInfo: React.FC<SaveInfoProps> = ({
  workTime,
  restTime,
  rounds,
  sets,
  restSet,
  formatTime,
  formatTime2,
  handleRelease,
  onPressWorkTime,
  onPressRest,
  onPressRounds,
  onPressSet,
  onPressRestSet,
}) => {
  const [text, setText] = useState('');

  const handleChange = (input: React.SetStateAction<string>) => {
    setText(input);
  };

  return (
    <View style={styles.modalContent}>
      {/* Título "Title" con un diseño separado del input */}
      <Text style={styles.titleText}>Title:</Text>

      <View style={styles.titleContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your title here"
          placeholderTextColor="#000"  // Placeholder en negro
          value={text}
          onChangeText={handleChange}
        />
      </View>

      <TotalTime
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet}
        fontSize={40}
        fontSizeNumber={65}
        textColor="#ffffff"
      />

      <Resumen
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet}
        formatTime={formatTime}
        textColor="#ffffff"
        fontSize={20}
      />

      <View style={{ flexDirection: 'row', display: 'flex' }}>
        <TimeControl
          label="Work"
          time={workTime}
          onPress={onPressWorkTime}
          onRelease={handleRelease}
          formatTime={formatTime}
        />
        <TimeControl
          label="Rest"
          time={restTime}
          onPress={onPressRest}
          onRelease={handleRelease}
          formatTime={formatTime}
        />
        <TimeControl
          label="Rounds"
          time={rounds}
          onPress={onPressRounds}
          onRelease={handleRelease}
          formatTime={formatTime2}
        />
      </View>

      <View style={{ flexDirection: 'row', display: 'flex' }}>
        <TimeControl
          label="Sets"
          time={sets}
          onPress={onPressSet}
          onRelease={handleRelease}
          formatTime={formatTime2}
        />
        <TimeControl
          label="Rest Sets"
          time={restSet}
          onPress={onPressRestSet}
          onRelease={handleRelease}
          formatTime={formatTime}
        />
      </View>

      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00974c',
          width: 320,
          height: 70,
          borderRadius: 40,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 30, fontFamily: 'type1' }}>Save</Text>
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
  titleText: {
    fontSize: 30, // Título grande
    marginBottom: 10,
    fontFamily: 'type2',
    color: '#ffffff',
  },
  titleContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 20, // Separar un poco del resto de los componentes
  },
  input: {
    width: 280,
    textAlign:'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    color: 'black', // Texto en negro
  },
});

export default SaveInfo;
