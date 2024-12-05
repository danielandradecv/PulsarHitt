import { Text, View, StyleSheet } from 'react-native';
import Prueba from '../../components/prueba';
export default function Tab2() {
  return (
    <View style={styles.container}>
     
        <Prueba></Prueba>

      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
