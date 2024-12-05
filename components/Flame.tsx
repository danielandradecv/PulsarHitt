import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

// Definición de los breakpoints
const breakpoints = {
  sm: 640, // Pantallas pequeñas
  md: 700, // Pantallas medianas
  lg: 1440, // Pantallas grandes
};

const LlamaAnimation = () => {
    
    let screenSize = 'sm'; // Tamaño de pantalla por defecto
    if (width >= breakpoints.lg) {
      screenSize = 'lg'; // Pantalla grande
    } else if (width >= breakpoints.md) {
      screenSize = 'md'; // Pantalla mediana
    }

    const cardStyle = screenSize === 'lg' ? styles.Container1 :
        screenSize === 'md' ? styles.Container1Medium :
        styles.Container1Small;

  // Condicionar el tamaño del texto según el tamaño de pantalla
  const Loot = screenSize === 'lg' ? styles.titleLarge :
        screenSize === 'md' ? styles.titleMedium :
        styles.titleSmall;
  return (
    <View style={[styles.container, cardStyle]}>
      <LottieView
        source={require('../assets/images/flame.json')} // Ruta de tu animación Lottie
        autoPlay
        loop
        style={[styles.animation, Loot]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  animation: {
    
    height: 1150,
    width: 500,
  },
  Container1:{
    
    width:'100%',
    height:'142%',
  }
,
  Container1Medium:{
    width:'100%',
    height:'142%',
    
    

  },

  Container1Small:{ 
    width:'100%',
    height:'142%',
    
    
  } ,

  titleLarge:{
    backgroundColor:'green',
    
    
  },
  titleSmall:{
  },
  titleMedium:{
    backgroundColor:'green',
   
  },


});

export default LlamaAnimation;
