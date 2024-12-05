// CounterWithCascade.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CounterWithCascade = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        {String(count).split('').map((digit, index) => (
          <Text key={index} style={{ fontSize: 48, opacity: 1 - index * 0.1 }}>
            {digit}
          </Text>
        ))}
      </Text>
      <Button title="Incrementar" onPress={() => setCount(count + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default CounterWithCascade;
