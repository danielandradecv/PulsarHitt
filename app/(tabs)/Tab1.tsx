import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AboutScreen = () => {
  // Establecemos valores por defecto para los tiempos
  const [workTime, setWorkTime] = useState(25); // tiempo de trabajo en segundos
  const [restTime, setRestTime] = useState(15); // tiempo de descanso en segundos
  const [rounds, setRounds] = useState(4); // cantidad de rondas
  const [sets, setSets] = useState(2); // cantidad de sets
  const [restSet, setRestSet] = useState(25); // descanso entre sets en segundos

  // Referencias para manejar el intervalo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función que maneja el incremento/decremento rápido
  const handlePress = (type: string, isIncrement: boolean) => {
    const increment = isIncrement ? 1 : -1;
    
    // Función que incrementa o decrementa el valor según el tipo
    const updateValue = () => {
      if (type === 'work') {
        if (workTime > 0 || increment > 0) setWorkTime(prev => Math.max(prev + increment, 0)); // Evitar valores negativos
      }
      if (type === 'rest') {
        if (restTime > 0 || increment > 0) setRestTime(prev => Math.max(prev + increment, 0)); // Evitar valores negativos
      }
      if (type === 'rounds' && (rounds > 0 || increment > 0)) setRounds(prev => Math.max(prev + increment, 1)); // Evitar valores negativos
      if (type === 'sets' && (sets > 0 || increment > 0)) setSets(prev => Math.max(prev + increment, 1)); // Evitar valores negativos
      if (type === 'restSet') {
        if (restSet > 0 || increment > 0) setRestSet(prev => Math.max(prev + increment, 0)); // Evitar valores negativos
      }
    };

    // Inicia el incremento rápido
    intervalRef.current = setInterval(updateValue, 70); // cada 40 ms

    // Incrementar una vez al presionar el botón
    updateValue();
  };

  // Función que detiene el incremento rápido
  const handleRelease = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Detener el intervalo cuando se suelta el botón
      intervalRef.current = null;
    }
  };

  // Función para formatear el tiempo
  const formatTime = (time: number) => {
    if (time >= 60) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`;
    }
    return `${time}s`;
  };

  // Lógica corregida para calcular el tiempo total
  const totalTrainingTime = sets === 0 
    ? (workTime + restTime) * rounds // Si sets es 0, solo se considera (workTime + restTime) * rounds
    : ((workTime + restTime) * rounds) * sets + restSet * (sets - 1); // Si sets es mayor que 0, el cálculo considera sets y descansos entre sets

  return (
    <ScrollView style={styles.container}>
      {/* Contenedor Resumen */}
      <View style={styles.summaryContainer}>
        <Text style={styles.totalTime}>{formatTime(totalTrainingTime)}</Text>
        <Text style={styles.trainingSummary}>
          {formatTime(workTime)} Work - {formatTime(restTime)} Rest - {rounds} Rounds
        </Text>
        <Text style={styles.setsInfo}>
          {sets} Sets - {formatTime(restSet)} Rest Between Sets
        </Text>
      </View>

      {/* Contenedor Edición */}
      <View style={styles.editContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.label}>Work</Text>
          <Text style={styles.time}>{formatTime(workTime)}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPressIn={() => handlePress('work', false)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPressIn={() => handlePress('work', true)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeBox}>
          <Text style={styles.label}>Rest</Text>
          <Text style={styles.time}>{formatTime(restTime)}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPressIn={() => handlePress('rest', false)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPressIn={() => handlePress('rest', true)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeBox}>
          <Text style={styles.label}>Rounds</Text>
          <Text style={styles.time}>{rounds}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPressIn={() => handlePress('rounds', false)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPressIn={() => handlePress('rounds', true)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Contenedor para Sets y Rest Sets */}
      <View style={styles.editContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.label}>Sets</Text>
          <Text style={styles.time}>{sets}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPressIn={() => handlePress('sets', false)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPressIn={() => handlePress('sets', true)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeBox}>
          <Text style={styles.label}>Rest Sets</Text>
          <Text style={styles.time}>{formatTime(restSet)}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPressIn={() => handlePress('restSet', false)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPressIn={() => handlePress('restSet', true)} 
              onPressOut={handleRelease}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  summaryContainer: {
    marginBottom: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  totalTime: {
    fontSize: 80,
    color: '#fff',
  },
  trainingSummary: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  setsInfo: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  editContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  timeBox: {
    backgroundColor: '#ffff',
    width: 120,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  label: {
    fontSize: 20,
    color: 'black',
  },
  time: {
    fontSize: 27,
    marginTop: 5,
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 40,
    width: 40,
    margin: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default AboutScreen;
