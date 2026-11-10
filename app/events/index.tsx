import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  function toggleSave(id: number) {
    setSavedIds(ids =>
      ids.includes(id)
        ? ids.filter(savedId => savedId !== id)
        : [...ids, id]
    );
  }

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
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.info}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)}
          />
        )}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListEmptyComponent={
          <Text>No events match.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    fontSize: 16,
    marginBottom: 16,
  },
  info: {
    fontSize: 14,
    marginBottom: 16,
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