import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

export default function Tab2() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Cargar la fuente en useEffect
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'brand': require('../../assets/fonts/brand.ttf'), // Asegúrate de que esta ruta sea correcta
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error al cargar la fuente:', error);
      }
    };

    loadFonts();
  }, []); // El array vacío asegura que se ejecute solo una vez cuando el componente se monte

  // Mientras la fuente está cargando, puedes mostrar un mensaje de carga si lo deseas
  if (!fontsLoaded) {
    return <Text>Cargando fuente...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: 'brand' }]}>Hola KozMo</Text>
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
    color: '#000', // Cambié el color a negro para que sea más visible en la pantalla
    fontSize: 24,  // Tamaño de fuente para que sea legible
  },
});
