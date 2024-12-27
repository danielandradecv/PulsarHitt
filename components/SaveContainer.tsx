import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewInfo from './ViewInfo';
import SaveInfo from './SaveInfo';
import StartContainer from './StartContiner';

interface SaveContainerProps {
  label: string;
  prepare: number;
  workTime: number; // Tiempo de trabajo en segundos
  restTime: number; // Tiempo de descanso en segundos
  rounds: number; // Número de rondas
  sets: number; // Número de sets
  restSet: number;
  triggerSignal: boolean;
  onSignalHandled: () => void;
  toggleModal: () => void;
  formatTime: (time: number) => string; 
  formatTime2: (time: number) => string; 
  onDelete: () => void;
  fetchWorkouts: () => void;
  
  

}

const SaveContainer: React.FC<SaveContainerProps> = ({ label, prepare: initialPrepare, workTime: initialWorktime, restTime: initialTime, rounds: initialRounds, sets: initialSets, restSet: initialRestSet,  triggerSignal, onSignalHandled, toggleModal, formatTime2, formatTime, onDelete,  fetchWorkouts }) => {

  useEffect(() => {
    if (triggerSignal) {
      // Acción que se ejecuta cuando se recibe la señal
      
      closeMenu();
      // Llamar a la función del padre para restablecer el estado
      onSignalHandled();
    }
  }, [triggerSignal]);
  const [prepare, setPrepare] = useState(initialPrepare);
  const [workTime, setWorkTime] = useState(initialWorktime);
  const [restTime, setRestTime] = useState(initialTime);
  const [rounds, setRounds] = useState(initialRounds);
  const [sets, setSets] = useState(initialSets);
  const [restSet, setRestSet] = useState(initialRestSet);


  const [menuVisible,  setMenuVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleStart, setModalVisibleStart] = useState(false);
  
    const toggleModalStart = () => {
      setModalVisibleStart(!modalVisibleStart);
    };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const toggleModalInfo = () => {
    setModalVisible(!modalVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setShowConfirm(false); // Cerrar confirmación si el menú se cierra
  };

  const handleDelete = () => {
    setShowConfirm(true); // Mostrar el contenedor de confirmación cuando se oprima "Eliminar"
  };

  const confirmDelete = () => {
    onDelete(); // Invocar la función de eliminar del padre
    closeMenu(); // Cerrar el menú
  };
  
  const rejectDelete = () => closeMenu();


  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const toggleModalEdit = () => {
    setModalVisibleEdit(!modalVisibleEdit);
  };

  const toggleModalEdit2 = () => {
    setModalVisible(!modalVisible);
    setModalVisibleEdit(!modalVisibleEdit);
    setMenuVisible(false);
  };

  


const intervalRef = useRef<NodeJS.Timeout | null>(null);


 
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

    intervalRef.current = setInterval(updateValue, 70);


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



  const handleSaveComplete = () => {
    fetchWorkouts(); // Recargar los entrenamientos después de guardar uno nuevo
    setModalVisibleEdit(false);

  };

  return (
    <View style={styles.timeBox}>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: '100%' }}>
        <TouchableOpacity
          style={{ width: 20, height: 20, borderRadius: 50, alignItems: 'center' }}
          onPress={toggleMenu}
          >
          <Text style={{ color: 'white' }}>
            <Ionicons name="construct-sharp" size={20} color="#000000" />
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>{label}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={toggleModalInfo} style={[styles.button, { backgroundColor: '#003161' }]}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={toggleModalStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>consol</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleStart}
        onRequestClose={toggleModalStart}
      >
    <TouchableWithoutFeedback onPress={toggleModalStart}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={{backgroundColor:'#ffffff', height: '100%', width: '100%',}} >
            <View style={{width: '100%',  marginTop:48, marginRight:10, display: 'flex', alignItems: 'center', flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity style={{ display:'flex', alignItems:'center', width:40}} onPress={toggleModalStart}><Ionicons name="close" size={40} color="#000000" />
          </TouchableOpacity>
            </View>
            
            <StartContainer 
          title="Tabata timer" 
          prepare={prepare} 
          workTime={workTime}
          restTime={restTime}
          rounds={rounds}
          sets={sets}
          restSet={restSet}></StartContainer>
          </View>
        </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
    <TouchableWithoutFeedback onPress={toggleModalInfo}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={{backgroundColor:'white', }}>
            <View style={{ marginTop:10, marginRight:10, display: 'flex', alignItems: 'center', flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity  onPress={toggleModalEdit2} style={{display:'flex', alignItems:'center', width:40}}>
            <Ionicons name="pencil" size={30} color="#000000" /></TouchableOpacity>


          <TouchableOpacity style={{display:'flex', alignItems:'center', width:40}} onPress={toggleModalInfo}>
            <Ionicons name="close" size={40} color="#000000" /></TouchableOpacity>

            
            </View>

            
            
          <ViewInfo 
        label={label}  
        prepare={prepare}
        workTime={workTime}
        restTime={restTime}
        rounds={rounds}
        sets={sets}
        restSet={restSet} 
        fontSize={50}
        textColor="#000000"
        formatTime={formatTime}
        formatTime2={formatTime2}
        />
          </View>
        </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleEdit}
        onRequestClose={toggleModalEdit}
      >
    <TouchableWithoutFeedback onPress={toggleModalEdit}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={{backgroundColor:'#73008a', }}>
            <View style={{ marginTop:10, marginRight:10, display: 'flex', alignItems: 'center', flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity style={{display:'flex', alignItems:'center', width:40}} onPress={toggleModalEdit}><Ionicons name="close" size={40} color="#000000" /></TouchableOpacity>
            </View>
            
          <SaveInfo
                  action="edit"
                  title={label} 
                  label="Edit your training"    
                  prepare={prepare} 
                  workTime={workTime}
                  restTime={restTime}
                  rounds={rounds}
                  sets={sets}
                  restSet={restSet}
                  fontSize={20}
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

      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            {/* El overlay cubre toda la pantalla */}
            <View style={styles.menuContainer}>
              {/* Evitar que el toque en el menú cierre el overlay */}
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.menu}>
                  {/* Botón Cerrar */}
                  <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                    <Ionicons name="close" size={20} color="#ffffff" />
                    <Text style={{ color: '#ffffff' }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem} onPress={toggleModalEdit}>
                    <Ionicons name="create-outline" size={20} color="black" />
                    <Text style={styles.menuText}>Editar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={20} color="black" />
                    <Text style={styles.menuText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            {showConfirm && (
              <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationText}>Delete</Text>
                <View style={styles.confirmationButtons}>
                  <TouchableOpacity onPress={confirmDelete} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={rejectDelete} style={styles.rejectButton}>
                    <Text style={styles.rejectButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            </View>
          </View>
          
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timeBox: {
    backgroundColor: '#ffff',
    width: 110,
    margin: 8,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'type1',
    marginTop: 3,
    textAlign: 'center',
    
  },
  buttonRow: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#018d5e',
    borderRadius: 5,
    height: 40,
    width: 90,
    margin: 3,
    fontFamily: 'type2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'type1',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo translúcido
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Asegura que el menú se muestre por encima de otros componentes
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 120,
    alignItems: 'flex-start',
    zIndex: 2, // Garantiza que el menú esté sobre el overlay
  },
  closeButton: {
    padding: 5,
    width: '100%',
    backgroundColor: '#ff1f1f',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#000000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  confirmationContainer: {
  zIndex: 100, //
    width: 110,
    height: 120,
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    position:'absolute',
    
    
  },
  confirmationText: {
    fontSize: 15,
    textAlign: 'center',
    

  },
  confirmationButtons: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 4,
    borderRadius: 5,
    margin: 5,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 5,
    margin: 5,

  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rejectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    
  },
});

export default SaveContainer;
