import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
import '../../global.css';
import Banner from '../../components/banner';

export default function Index() {
  return (
    <View className='flex-1 bg-green-600'>
      <Text className="text-black text-center text-2xl">PulsarHitt</Text>


      <View className="flex-1 md:flex-row md:flex-wrap bg-white items-center justify-center md:space-x-4 md:space-y-4 space-y-4">
      <Banner
        imageSource={require('../../assets/images/tabata-timer-banne-tabata.jpg')}
        title="Tabata Timer"
        link="/Tab1"
      />

<Banner
        imageSource={require('../../assets/images/tabata-timer-banne-tabata.jpg')}
        title="Tabata Timer"
        link="/Tab1"
      />

  
        {/* Primer Banner */}
        <View className="w-10/12 h-40 rounded-3xl md:w-96 bg-black mb-4 md:mb-0">
          <ImageBackground
            source={require('../../assets/images/tabata-timer-banne-tabata.jpg')}
            className="overflow-hidden"
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 20 }}
            fadeDuration={700}
            resizeMode="cover"
          >
            <Link href="/Tab1" className="  text-white font-bold text-2xl h-full py-16 w-full text-center">Tabata Timer</Link>
          </ImageBackground>
        </View>

        {/* Segundo Banner */}
        <View className="w-10/12 h-40 rounded-3xl md:w-96 bg-black mb-4 md:mb-0">
          <ImageBackground
            source={require('../../assets/images/tabata-timer-banne-tabata.jpg')}
            className="overflow-hidden"
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 20 }}
            fadeDuration={700}
            resizeMode="cover"
          >
            <Link href="/Tab1" className="  text-white font-bold text-2xl h-full py-16 w-full text-center">Tabata Timer</Link>
          </ImageBackground>
        </View>

        {/* Tercer Banner */}
        <View className="w-10/12 h-40 rounded-3xl md:w-96 bg-black mb-4 md:mb-0">
          <ImageBackground
            source={require('../../assets/images/tabata-timer-banne-tabata.jpg')}
            className="overflow-hidden"
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 20 }}
            fadeDuration={700}
            resizeMode="cover"
          >
            <Link href="/Tab1" className="  text-white font-bold text-2xl h-full py-16 w-full text-center">Tabata Timer</Link>
          </ImageBackground>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    
  },
});
