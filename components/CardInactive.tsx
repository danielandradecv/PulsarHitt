import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TimeControlProps {
  label: string;
  
}

const TimeControl: React.FC<TimeControlProps> = ({ label,  }) => {
  return (
    
    <View style={styles.timeBox}>
      <Text style={styles.label}>{label}</Text>
        
        <TouchableOpacity style={{backgroundColor:'rgba(0, 0, 0, 0.4)', width:100, height:60, borderRadius:50, justifyContent:'center', alignItems:'center', // Sombra para iOS
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 5,
    // Sombra para Web (CSS)
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', }}>
            <Text style={{color:'white', fontSize:40, marginTop:-8, }}>+</Text>
        </TouchableOpacity>

      <View style={styles.buttonRow}>
        
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  
  timeBox: {
    backgroundColor: '#777777',
    width: 110,
    height: 100,
    margin: 8,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

  },
  
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 40,
    width: 90,
    fontFamily: 'type2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  
  buttonText: {
    color: '#fdfdfd',
    fontSize: 20,
    fontFamily: 'type1',

  },
});

export default TimeControl;
