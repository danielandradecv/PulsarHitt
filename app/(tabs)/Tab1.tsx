import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import { Audio } from 'expo-av';




const AboutScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(3); // Inicia el conteo en 3

  const countdownRef = useRef<NodeJS.Timeout | null>(null); // Referencia para el temporizador de cuenta regresiva

  // Establecer el modo de audio para permitir sonidos mientras está en segundo plano
  useEffect(() => {
    const setAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
      } catch (error) {
        console.error('Error al configurar el audio:', error);
      }
    };

    setAudioMode();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [sound]);

  

  // Función para iniciar el conteo
  const counterRef = useRef(counter);
  const startCountdown = () => {
    setCounter(3); // Resetea el contador a 3
    counterRef.current = 3; // Actualiza la referencia del contador
  
    countdownRef.current = setInterval(() => {
      if (counterRef.current > 0) {
        playSound('beep'); // Sonido para 3, 2, 1
        counterRef.current -= 1; // Decrementa la referencia del contador
        setCounter(counterRef.current); // Actualiza el estado del contador
      } else {
        clearInterval(countdownRef.current as NodeJS.Timeout); // Detener el intervalo
        playSound('final'); // Sonido final al terminar la cuenta regresiva
        setCounter(0); // Finaliza la cuenta regresiva
      }
    }, 100); // Actualizar cada 1 segundo
  };
  
  // Función que se ejecuta cuando el modal es mostrado
  const handleOnShow = () => {
    startCountdown(); // Iniciar el contador cuando el modal se abre
  };


// Configurar el modo de audio al iniciar el componente
useEffect(() => {
  const setAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false, // No grabar audio en iOSrr // Usar el valor correcto del enum
        playsInSilentModeIOS: true, // Reproducir sonidos incluso si el dispositivo está en silencio
        staysActiveInBackground: true, // Mantener el sonido activo cuando la app está en segundo plano
      });
    } catch (error) {
      console.error('Error al configurar el audio:', error);
    }
  };

  setAudioMode();

  return () => {
    if (sound) {
      sound.unloadAsync(); // Liberar el sonido cuando el componente se desmonte
    }
  };
}, [sound]);

// Función para reproducir el sonido
const playSound = async (soundFile: string) => {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require(`../../assets/sounds/pop.mp3`) // Asegúrate de que los archivos MP3 estén en la ruta correcta
    );
    setSound(newSound); // Establecer el sonido cargado en el estado
    await newSound.playAsync(); // Reproducir el sonido
  } catch (error) {
    console.error('Error al reproducir el sonido:', error);
  }
};
 // Cargar sonidos


 // Función para reproducir el sonido al abrir el modal





  // Establecemos valores por defecto para los tiempos
  const [workTime, setWorkTime] = useState(18); // tiempo de trabajo en segundos
  const [restTime, setRestTime] = useState(14); // tiempo de descanso en segundos
  const [rounds, setRounds] = useState(4); // cantidad de rondas
  const [sets, setSets] = useState(1); // cantidad de sets
  const [restSet, setRestSet] = useState(24); // descanso entre sets en segundos



  const resetValues = () => {
    setWorkTime(0);
    setRestTime(0);
    setRounds(0);
    setSets(1);
    setRestSet(0);
  };
  

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

  const formatTimeTotal = (time: number) => {
    if (time >= 60) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return <><Text style={{fontFamily:'type2', width:300, height:300 }}>{minutes}</Text><Text style={{fontFamily:'type2', fontSize:40}}>m </Text ><Text style={{fontFamily:'type2' }}>{seconds < 10 ? '0' + seconds : seconds}</Text><Text style={{fontFamily:'type2', fontSize:40}}>s</Text></>;
    }
    return <><Text style={{fontFamily:'type2', width:300, height:300 }}>{time}</Text><Text style={{fontFamily:'type2', fontSize:40}}>s</Text ></> ;
  };

  // Lógica corregida para calcular el tiempo total
  const totalTrainingTime = sets === 0 
    ? (workTime + restTime) * rounds // Si sets es 0, solo se considera (workTime + restTime) * rounds
    : ((workTime + restTime) * rounds) * sets + restSet * (sets - 1); // Si sets es mayor que 0, el cálculo considera sets y descansos entre sets

  // Cargar la fuente en useEffect
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'type1': require('../../assets/fonts/brand.ttf'),
          'type2': require('../../assets/fonts/GYMER.ttf'),
          'type3': require('../../assets/fonts/JUST.ttf'), // Asegúrate de que esta ruta sea correcta
          'type4': require('../../assets/fonts/SpaceMono.ttf'), // Asegúrate de que esta ruta sea correcta
          'type5': require('../../assets/fonts/Wondra.ttf'), // Asegúrate de que esta ruta sea correcta
           // Asegúrate de que esta ruta sea correcta
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error al cargar la fuente:', error);
      }
    };

    loadFonts();
  }, []); // El array vacío asegura que se ejecute solo una vez cuando el componente se monte

  // Mientras la fuente está cargando, puedes mostrar un mensaje de carga si lo deseas
  if (!fontsLoaded) {
    return <Text>Cargando fuente...</Text>;
  }


  return (

    
    <ScrollView style={styles.container}>
      
      {/* -------------------------------------------Aqui va el Tiempo final--------------------------------------------------------------------------------------*/}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>

      <View style={styles.summaryContainer}>
        <View>
        
        <Text style={styles.totalTime}>{formatTimeTotal(totalTrainingTime)}</Text>

        </View>
        <Text style={styles.trainingSummary}>
          {formatTime(workTime)} Work - {formatTime(restTime)} Rest - {rounds} Rounds
        </Text>
        <Text style={styles.setsInfo}>
          {sets} Sets - {formatTime(restSet)} Rest Between Sets
        </Text>
      </View>


    {/* -------------------------------------------Aqui va el reset y save--------------------------------------------------------------------------------------*/}


    <View style={{  marginTop: 10, marginRight: 280, marginBottom: 10, flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
  {/* Botón para disminuir */}
  <TouchableOpacity
    onPressIn={ resetValues} // Cambiado a false para disminuir
    
    style={styles.buttonSaveRest}>
    <Ionicons name="save" size={24} color="#000000" />
  </TouchableOpacity>

  {/* Botón para aumentar */}
  <TouchableOpacity
    onPressIn={ resetValues}
    style={styles.buttonSaveRest}>
    <Ionicons name="refresh" size={24} color="#000000" />
  </TouchableOpacity>
</View>

      {/*} ---------------------------------------------------------------------------Contadores----------------------------------------------------------------------------------------------*/}

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

      {/* ------------------------------------------------------------------------Contenedor para Sets y Rest Sets -------------------------------------------------------------------------*/}
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
  
    {/* ------------------------------------------------------------------------Boton Start-------------------------------------------------------------------------*/}

    <View style={[styles.editContainer, { backgroundColor: 'black' }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={handleOnShow} 
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} 
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 18,
              alignItems: 'center',
              shadowColor: '#000',
              width: '90%',
              height: '80%',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View style={{ alignItems: 'flex-end', width: '100%' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2196F3',
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  padding: 10,
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'right' }}>x</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 100, fontWeight: 'bold', color: 'black' }}>{counter}</Text>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPressIn={() => setModalVisible(true)}
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
        <Text style={{ color: 'white', fontSize: 30 }}>Start</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    marginTop: 50,
    alignItems: 'center',
    
  },
  totalTime: {
    fontSize: 90,
    color: '#ffffff',
    fontFamily: 'type',
    textTransform: 'lowercase',
    

  },
  trainingSummary: {
    color: '#ffffff',
    fontSize: 24,
    marginTop: 10,
    fontFamily: 'type1',
    

  },
  setsInfo: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 5,
    fontFamily: 'type1',
  },
  editContainer: {
    marginTop: 10,
    marginBottom: 20,
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
    width: 110,
    margin: 8,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 5,
    // Sombra para Web (CSS)
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    
  },
  
  label: {
    fontSize: 18,
    color: 'black',
    fontFamily:'type2',
    marginTop: 3,

  },
  time: {
    fontSize: 27,
    marginTop: 3,
    color: 'black',
    fontFamily:'type3',
    
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
  buttonSaveRest: {
    backgroundColor: '#ffffff',
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

  text: {
    color: '#000', // Cambié el color a negro para que sea más visible en la pantalla
    fontSize: 24,  // Tamaño de fuente para que sea legible
  },

  
});

export default AboutScreen;
function setSound(sound: Audio.Sound) {
  throw new Error('Function not implemented.');
}

