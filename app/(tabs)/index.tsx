import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
import '../../global.css';

export default function Index() {
  return (
    <View className="flex-1 bg-gray-800 items-center justify-center">
      <Text className="text-white mb-8 text-2xl">PulsarHitt</Text>
      
      {/* Enlace al Tab1 con imagen de fondo */}
      <ImageBackground 
        source={require('../../assets/images/tabata-timer-banner.jpg')} 
        
        className="w-10/12 h-64 p-4 mb-4 rounded-lg overflow-hidden flex"
        imageStyle={{ borderRadius: 1 }}
        resizeMode="cover" // Asegura que la imagen cubra el contenedor
      >
        <Link style={styles.container} href="/Tab1" className="text-center text-white font-bold">
          Tabata 1
        </Link>
      </ImageBackground>
      
      {/* Enlace al Tab2 con imagen de fondo */}
      <ImageBackground 
        source={{ uri: 'https://www.example.com/imagen2.jpg' }} // Reemplaza con la URL de tu imagen
        className="w-10/12 p-4 mb-4 rounded-lg overflow-hidden"
        imageStyle={{ borderRadius: 10 }}
      >
        <Link href="/Tab2" className="flex-1 justify-center items-center bg-black bg-opacity-50 rounded-lg text-center text-white font-bold">
          Tabata 2
        </Link>
      </ImageBackground>
      
      {/* Enlace al Tab3 con imagen de fondo */}
      <ImageBackground 
        source={{ uri: 'https://www.example.com/imagen3.jpg' }} // Reemplaza con la URL de tu imagen
        className="w-10/12 p-4 mb-4 rounded-lg overflow-hidden"
        imageStyle={{ borderRadius: 10 }}
      >
        <Link href="/Tab3" className="flex-1 justify-center items-center bg-black bg-opacity-50 rounded-lg text-center text-white font-bold">
          Tabata 3
        </Link>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
  },

});