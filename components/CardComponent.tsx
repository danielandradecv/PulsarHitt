import React from 'react';
import { View, Text, Dimensions, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import { useFonts } from 'expo-font';

// la dimencion de la pantalla
const { width } = Dimensions.get('window');

// Definición de los breakpoints
const breakpoints = {
  sm: 640, // Pantallas pequeñas
  md: 700, // Pantallas medianas
  lg: 1440, // Pantallas grandes
};

type CardProps = {
  image: any; // Imagen local
  title: string; // Título de la tarjeta
  link: "/Tab2" | "/Tab1" | "/Tab3"; // Página a la que redirige al hacer click
};

const CardComponent: React.FC<CardProps> = ({ image, title, link }) => {
  // Mover los hooks fuera de cualquier condicional
  const [fontsLoaded] = useFonts({
    'MyCustomFont': require('../assets/fonts/brand.ttf'),
  });

  // El hook de router debe estar fuera de cualquier condicional también
  const router = useRouter();

  // Si las fuentes aún no se cargan, mostrar un texto
  if (!fontsLoaded) {
    return <Text>Cargando fuente...</Text>;
  }

  const handleNavigate = () => {
    // Navegar a la pestaña deseada
    router.push(link);
  };

  // Lógica para determinar el tamaño de pantalla y asignar estilos según breakpoints
  let screenSize = 'sm'; // Tamaño de pantalla por defecto
  if (width >= breakpoints.lg) {
    screenSize = 'lg'; // Pantalla grande
  } else if (width >= breakpoints.md) {
    screenSize = 'md'; // Pantalla mediana
  }

  // Condicionar el tamaño de la tarjeta según el tamaño de pantalla
  const cardStyle = screenSize === 'lg' ? styles.cardContainerLarge :
                    screenSize === 'md' ? styles.cardContainerMedium :
                    styles.cardContainerSmall;

  // Condicionar el tamaño del texto según el tamaño de pantalla
  const textStyle = screenSize === 'lg' ? styles.titleLarge :
                    screenSize === 'md' ? styles.titleMedium :
                    styles.titleSmall;

  return (
    <TouchableOpacity style={[styles.cardContainer, cardStyle]} onPress={handleNavigate}>
      <ImageBackground source={image} style={styles.imageBackground} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={[styles.title, textStyle]}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  cardContainerSmall: {
    width: '90%',
    height: 150,
  },
  cardContainerMedium: {
    width: 450,
    height: 150,
  },
  cardContainerLarge: {
    width: 450,
    height: 150,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semitransparente para dar efecto de superposición
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MyCustomFont', // Usando la fuente personalizada aquí
  },
  titleSmall: {
    fontSize: 25,
  },
  titleMedium: {
    fontSize: 25,
  },
  titleLarge: {
    fontSize: 25,
  },
});

export default CardComponent;
