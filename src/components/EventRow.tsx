
import { Pressable, Text, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({
  event,
  saved,
  onPress,
  onLongPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date} · {event.place}</Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    minHeight: 44,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  saved: {
    color: '#2563eb',
    marginTop: 8,
    fontWeight: 'bold',
  },
});
