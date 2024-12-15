
import CardInactive from '@/components/CardInactive';
import SaveContainer from '@/components/SaveContainer';
import React, { useState } from 'react'; // Asegúrate de importar useState
import { Text, View, StyleSheet } from 'react-native';

export default function Tab3() {
  const [workTime] = useState(2); // tiempo de trabajo en segundos
  const [restTime] = useState(2); // tiempo de descanso en segundos
  const [rounds] = useState(4); // cantidad de rondas
  const [sets] = useState(2); // cantidad de sets
  const [restSet] = useState(0); // descanso entre sets en segundos

  return (
    <View style={styles.container}>
      <Text style={styles.text}>3</Text>
      
      <CardInactive label="Free"></CardInactive>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
