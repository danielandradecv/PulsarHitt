// components/Banner.js
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Link } from 'expo-router'; // Asegúrate de que tienes expo-router configurado para usar <Link />

const Banner = ({ imageSource, title, link }) => {
  return (
    <View className="w-10/12 h-40 rounded-3xl md:w-96 bg-black mb-4 md:mb-0">
      <ImageBackground
        source={imageSource}
        className="overflow-hidden"
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ borderRadius: 20 }}
        fadeDuration={700}
        resizeMode="cover"
      >
        <Link href={link} className="  text-white font-bold text-2xl h-full py-16 w-full text-center">{title}</Link>
      </ImageBackground>
    </View>
  );
};




export default Banner;
