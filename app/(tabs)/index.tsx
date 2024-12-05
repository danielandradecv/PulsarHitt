import {  View, StyleSheet, } from 'react-native';
import React, { useState, useEffect } from 'react';
import CardComponent from '../../components/CardComponent';
import Flame from '../../components/Flame';


export default function Index() {
    
  return (

    <View style={{flex:1, justifyContent: 'space-between',}}>

      <View style={styles.container} >
        
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
        <Flame></Flame>
    </View>
      
      
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',
    height: '100%',

    
  },
});
