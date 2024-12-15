import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface TimeControlProps {
  label: string;
  triggerSignal: boolean;
  onSignalHandled: () => void;
}

const TimeControl: React.FC<TimeControlProps> = ({ label,  triggerSignal, onSignalHandled }) => {

    
  useEffect(() => {
    if (triggerSignal) {
      // Acción que se ejecuta cuando se recibe la señal
      
      closeMenu();
      // Llamar a la función del padre para restablecer el estado
      onSignalHandled();
    }
  }, [triggerSignal]);
  const [menuVisible,  setMenuVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); 

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setShowConfirm(false); // Cerrar confirmación si el menú se cierra
  };

  const handleDelete = () => {
    setShowConfirm(true); // Mostrar el contenedor de confirmación cuando se oprima "Eliminar"
  };

  const confirmDelete = () => {
    console.log('Elemento eliminado');
    closeMenu(); // Cerrar el menú después de confirmar
  };
  
  const rejectDelete = () => {
    console.log('Eliminación cancelada');
    closeMenu(); // Cerrar el menú después de rechazar
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
        <TouchableOpacity style={[styles.button, { backgroundColor: '#003161' }]}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

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
                    <Text style={{ color: 'white' }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Editar')}>
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
    flexDirection: 'row',
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
    backgroundColor: '#f35f5f',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
});

export default TimeControl;
