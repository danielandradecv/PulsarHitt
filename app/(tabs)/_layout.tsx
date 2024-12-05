import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native'; // Importa Lottie




export default function TabLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simula una carga para hacer el preload
    setTimeout(() => {
      setIsReady(true);  // Después de la simulación de carga, el estado cambia a 'true'
    }, 2200); // Puedes ajustar el tiempo según lo necesites
  }, []);

  if (!isReady) {
    return (
      <View style={{ padding:'25%', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <LottieView
                    source={require('../../assets/images/Apl.json')}
                    autoPlay
                    loop
                    style={{height: 150, width: 150}}
                    
                />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 1,
          borderTopColor: '#FFB200',
          height: 90,
          paddingTop: 5,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen 
      name="Tab1" 
      options={{ 
        title: 'Tabata Timer',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'timer' : 'timer-outline'} color={color} size={24} />
          
        ),
         }} />
      <Tabs.Screen 
      name="Tab2" 
      options={{ title: 'Tab2', 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'flame' : 'flame-outline'} color={color} size={24} />
          
        ),
      }} />
      <Tabs.Screen 
      name="Tab3" 
      options={{ title: 'Tab3',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'flash' : 'flash-outline'} color={color} size={24} />
          
        ),
       }} />
    </Tabs>
  );
}


