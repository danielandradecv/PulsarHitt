import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ViewControlsProps {
  label: string;
  time: number;
  formatTime: (time: number) => string;
}

const ViewControlsProps: React.FC<ViewControlsProps> = ({ label, time, formatTime }) => {
  return (
    
    <View style={styles.timeBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{formatTime(time)}</Text>
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  
  timeBox: {
    backgroundColor: '#000000',
    width: 100,
    margin: 5,
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
    color: '#ffffff',
    fontFamily:'type2',
    marginTop: 3,

  },
  time: {
    fontSize: 27,
    marginTop: 3,
    color: '#ffffff',
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
});

export default ViewControlsProps;
