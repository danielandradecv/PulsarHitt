import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
import '../../global.css';
import Banner from '../../components/banner';

export default function Index() {
  return (
    <View className='flex-1 bg-green-600'>
      <Text className="text-black text-center text-2xl">PulsarHitt</Text>


      <View className="flex-1 md:flex-row md:flex-wrap bg-white items-center justify-center md:space-x-4 ">
      <Banner
        imageSource={require('../../assets/images/tabata-timer-banne-tabata.jpg')}
        title="Tabata Timer"
        link="/Tab1"
      />

<Banner
        imageSource={require('../../assets/images/tabata-timer-banner.jpg')}
        title="Tabata Timer"
        link="/Tab2"
      />

<Banner
        imageSource={require('../../assets/images/tabata-timer-banne-rest.jpg')}
        title="Tabata Timer"
        link="/Tab3"
      />

  
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    
  },
});
