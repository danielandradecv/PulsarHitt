import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import TotalTime from '@/components/Total';
import TimeControl from '@/components/TimeControl';
import CardInactive from '@/components/CardInactive';
import SaveContainer from '@/components/SaveContainer';
import Resumen from '@/components/Resumen';
import SaveInfo from '@/components/SaveInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';



const TabataTimer: React.FC  = () => {

  useEffect(() => {
    AsyncStorage.getItem('workouts').then((data) => {
      if (data) {
        console.log(JSON.parse(data)); // Muestra los datos almacenados si existen
      } else {
        console.log('No hay entrenamientos guardados'); // Manejo de null
      }
    });
  }, []);

  // Valores por defecto para los tiempos, el tiempo es mi tabta favorito ejej
  const [prepare, setPrepare] = useState(3); 
  const [workTime, setWorkTime] = useState(18); 
  const [restTime, setRestTime] = useState(14); 
  const [rounds, setRounds] = useState(4); 
  const [sets, setSets] = useState(1); // 
  const [restSet, setRestSet] = useState(24); 

 // Boton de reset Values
  const resetValues = () => {
  setPrepare(0);
  setWorkTime(0);
  setRestTime(0);
  setRounds(1);
  setSets(1);
  setRestSet(0);
  };
  
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
  

  // Referencias para manejar el intervalo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función que maneja el incremento/decremento rápido
  const handlePress = (type: string, isIncrement: boolean) => {
    const increment = isIncrement ? 1 : -1;
    
    // Función que incrementa o decrementa el valor según el tipo
    const updateValue = () => {
      if (type === 'prepare') {
        if (prepare > 0 || increment > 0) setPrepare(prev => Math.max(prev + increment, 0)); // Evitar valores negativos
      }
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

  // Menu de save 


  const [triggerSignal, setTriggerSignal] = useState(false);
  const [modalVisibleSave, setModalVisibleSave] = useState(false);




  const toggleModalSave = () => {
    setModalVisibleSave(!modalVisibleSave);
  };

  // Función que se activa al presionar el botón
  const handleButtonPress = () => {
    setTriggerSignal(true);
  };


// logica del save

interface Workout {
  title: string;
  prepare: number;
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restSet: number;
}

const [workouts, setWorkouts] = useState<Workout[]>([]);
  

  const fetchWorkouts = async () => {
    try {
      const storedWorkouts = await AsyncStorage.getItem('workouts');
      setWorkouts(storedWorkouts ? JSON.parse(storedWorkouts) : []);
    } catch (error) {
      console.error('Failed to load workouts:', error);
    }
  };

  const handleSaveComplete = () => {
    fetchWorkouts(); // Recargar los entrenamientos después de guardar uno nuevo
    setModalVisibleSave(false);
  };

  const handleDelete = async (index: number): Promise<void> => {
    try {
      const updatedWorkouts = workouts.filter((_, i) => i !== index);
      await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
      setWorkouts(updatedWorkouts);
      alert('deleted!');
    } catch (error) {
      console.error('Failed to delete workout:', error);
      Alert.alert('Error', 'Failed to delete the workout. Please try again.');
    }
  };
  


  useEffect(() => {
    fetchWorkouts();
  }, []);
  








  // Tipografia
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'type1': require('../../assets/fonts/brand.ttf'),
          'type2': require('../../assets/fonts/GYMER.ttf'),
          'type3': require('../../assets/fonts/JUST.ttf'), 
          'type4': require('../../assets/fonts/SpaceMono.ttf'), 
          'type5': require('../../assets/fonts/Wondra.ttf'), 
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error al cargar la fuente:', error);
      }
    };
  
    loadFonts();
  }, []);
  if (!fontsLoaded) {
    return <Text>Cargando fuente...</Text>;
  }


  return (

    <TouchableWithoutFeedback onPress={handleButtonPress}style={styles.overlayArea}> 
    <ScrollView style={styles.container}>
      
      {/* -------------------------------------------Aqui va el Tiempo final--------------------------------------------------------------------------------------*/}
      
      <TotalTime
        prepare={prepare}
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet} 
        fontSize={50}
        fontSizeNumber={85}
        textColor="white"/>

<Resumen
        prepare={prepare}
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet} 
        formatTime={formatTime}
        textColor="#ffffff"
        fontSize={20}/>

    {/* -------------------------------------------Aqui va el reset y save--------------------------------------------------------------------------------------*/}


    <View style={{  marginTop: 10, marginRight: 280, marginBottom: 1, flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
  {/* Botón para disminuir */}
  <TouchableOpacity
    onPress={toggleModalSave}
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
      <TimeControl
        label="Prepare"
        time={prepare}
        onPress={(isIncrement: boolean) => handlePress('prepare', isIncrement)}
        onRelease={handleRelease}
        formatTime={formatTime}
      />
      </View>

      <View style={styles.editContainer}>
      <TimeControl
        label="Work"
        time={workTime}
        onPress={(isIncrement: boolean) => handlePress('work', isIncrement)}
        onRelease={handleRelease}
        formatTime={formatTime}
      />
      <TimeControl
        label="Rest"
        time={restTime}
        onPress={(isIncrement: boolean) => handlePress('rest', isIncrement)}
        onRelease={handleRelease}
        formatTime={formatTime}
      />
      <TimeControl
        label="Rounds"
        time={rounds}
        onPress={(isIncrement: boolean) => handlePress('rounds', isIncrement)}
        onRelease={handleRelease}
        formatTime={formatTime2}
      />
      </View>


      {/* ------------------------------------------------------------------------Contenedor para Sets y Rest Sets -------------------------------------------------------------------------*/}

      <View style={styles.editContainer}>
      <TimeControl
        label="Sets"
        time={sets}
        onPress={(isIncrement: boolean) => handlePress('sets', isIncrement)}
        onRelease={handleRelease}
        formatTime={formatTime2}
      />
      <TimeControl
        label="Rest Sets"
        time={restSet}
        onPress={(isIncrement: boolean) => handlePress('restSet', isIncrement)}
        onRelease={handleRelease}
        formatTime={formatTime}
      />
      </View>

    {/* ------------------------------------------------------------------------Boton Start-------------------------------------------------------------------------*/}

    <View style={[styles.editContainer, styles.overlayArea, { backgroundColor: 'black' }]}>
      
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

    
      
          
        
    
    <View style={styles.editContainerSave}>

        
        
      {workouts.map((workout, index) => (
          <SaveContainer
            key={index}
            label={workout.title} // Título del entrenamiento
            prepare={workout.prepare} 
            restTime={workout.restTime}
            workTime={workout.workTime}
            rounds={workout.rounds}
            sets={workout.sets}
            restSet={workout.restSet}
            toggleModal={() => console.log('Ver entrenamiento:', workout)} 
            onSignalHandled={() => setTriggerSignal(false) } 
            triggerSignal={triggerSignal}
            formatTime={formatTime}
            formatTime2={formatTime2}
            onDelete={() => handleDelete(index)}
          />
        ))} 
      

      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>
      <CardInactive label='New' toggleModalSave={toggleModalSave}></CardInactive>


    </View>




      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSave}
        onRequestClose={toggleModalSave}
      >
    <TouchableWithoutFeedback onPress={toggleModalSave}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={{backgroundColor:'#00538a', }}>
            <View style={{ marginTop:10, marginRight:10, display: 'flex', alignItems: 'center', flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity style={{display:'flex', alignItems:'center', width:40}} onPress={toggleModalSave}><Ionicons name="close" size={40} color="#000000" /></TouchableOpacity>
            </View>
            
          <SaveInfo prepare={prepare} 
                  workTime={workTime}
                  restTime={restTime}
                  rounds={rounds}
                  sets={sets}
                  restSet={restSet}
                  fontSize={50}
                  textColor="#ffffff"
                  formatTime={formatTime}
                  formatTime2={formatTime2}
                  handleRelease={handleRelease}
                  onPressPrepare={(isIncrement: boolean) => handlePress('prepare', isIncrement)}
                  onPressWorkTime={(isIncrement: boolean) => handlePress('work', isIncrement)}  
                  onPressRest={(isIncrement: boolean) => handlePress('rest', isIncrement)}
                  onPressRounds={(isIncrement: boolean) => handlePress('rounds', isIncrement)}
                  onPressSet={(isIncrement: boolean) => handlePress('sets', isIncrement)}
                  onPressRestSet={(isIncrement: boolean) => handlePress('restSet', isIncrement)}
                  onSaveComplete={handleSaveComplete}

                  
        />
          </View>
        </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>



    
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  overlayArea: {
    width: '100%', // Asegúrate de que ocupe toda el área
    height: '100%', // También a nivel de altura
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:100,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  
  editContainer: {
    marginTop: 0,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    height: '100%',
  },
  editContainerSave: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    
  },
  
});

export default TabataTimer;

