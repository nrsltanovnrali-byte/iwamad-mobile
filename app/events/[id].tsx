import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Could not load events</Text>
        <Text>{error?.message}</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const events = data ?? [];
  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>Date: {event.date}</Text>
      <Text style={styles.info}>Place: {event.place}</Text>
      <Text style={styles.info}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 12,
  },
});