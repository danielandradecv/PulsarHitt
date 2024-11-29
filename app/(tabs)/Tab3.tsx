import { Text, View, StyleSheet } from 'react-native';

export default function Tab3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
