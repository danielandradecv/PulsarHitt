import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
            backgroundColor: '#25292e',
          },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          
          tabBarStyle: {
          backgroundColor: '#1C325B',
          borderTopWidth: 1,  
          borderTopColor: '#FFB200',
          height:90, 
          paddingTop:5,
          paddingBottom:10, 
          },
      }}
      >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="Tab1" options={{ title: 'Tab1' }} />
      <Tabs.Screen name="Tab2" options={{ title: 'tab2' }} />
      <Tabs.Screen name="Tab3" options={{ title: 'tab3' }} />


    </Tabs>
  );
}
