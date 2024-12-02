import React from 'react';
import LottieView from 'lottie-react-native'; // Importa Lottie

type LoaderProps = {
  animationSource: any; // Ruta o nombre de la animación Lottie
};

const Loader: React.FC<LoaderProps> = ({ animationSource }) => {
  return (
    <LottieView
      source={animationSource} // Aquí pones la animación de Lottie
      autoPlay
      loop
      style={{ width: 200, height: 200, alignSelf: 'center' }} // Ajusta el tamaño y posición
    />
  );
};

export default Loader;
