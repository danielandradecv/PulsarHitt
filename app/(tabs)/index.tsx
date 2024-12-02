import {  View, StyleSheet } from 'react-native';
import '../../global.css';
import CardComponent from '../../components/CardComponent';

export default function Index() {
  return (
    <View className='flex-1 bg-green-600'>


      <View className="flex-1 md:flex-row md:flex-wrap bg-white items-center justify-center md:space-x-4 ">
      <CardComponent
        image={require('../../assets/images/tabata-timer-banne-tabata.jpg')} // Asegúrate de tener esta imagen en el directorio
        title="Tabata Timer"
        link="/Tab1" 
      />
      <CardComponent
        image={require('../../assets/images/tabata-timer-banner.jpg')} // Asegúrate de tener esta imagen en el directorio
        title="Tabata Super Hitt"
        link="/Tab2" 
      />
      <CardComponent
        image={require('../../assets/images/tabata-timer-banne-rest.jpg')} // Asegúrate de tener esta imagen en el directorio
        title="Tiempo de descanso"
        link="/Tab3" 
      />

      


  
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    
  },
});
