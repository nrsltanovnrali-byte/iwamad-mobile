
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Nursultanov Nurali</Text>

      <Text style={styles.likes}>Likes: {likes}</Text>

      <Pressable
        style={styles.button}
        onPress={() => setLikes(likes + 1)}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    marginTop: 15,
  },
  likes: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 30,
    paddingVertical: 12,
    minHeight: 44,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
