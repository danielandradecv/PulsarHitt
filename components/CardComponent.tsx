import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importa el useRouter de expo-router


type CardProps = {
  image: any; // Imagen local
  title: string; // Título de la tarjeta
  link: "/Tab2" | "/Tab1" | "/Tab3"; // Página a la que redirige al hacer click
};

const CardComponent: React.FC<CardProps> = ({ image, title, link }) => {

  const router = useRouter();

  const handleNavigate = () => {
    // Navegar a la pestaña deseada (link es una propiedad que puedes usar para pasar el destino)
    router.push(link);
  };

  return (
    // Usamos TouchableOpacity para hacer clic en toda la tarjeta (imagen y texto)
    <TouchableOpacity className='bg-red-700' onPress={handleNavigate} style={styles.cardContainer}>
      <ImageBackground source={image} style={styles.imageBackground} resizeMode="cover">
        <View style={styles.overlay}>
          <Text  style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 180,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width:'100%',
    height:'100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semitransparente para dar efecto de superposición
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardComponent;
