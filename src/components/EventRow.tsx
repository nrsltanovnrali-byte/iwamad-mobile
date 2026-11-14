import { Pressable, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({
  event,
  saved,
  onPress,
  onToggleSaved,
}: Props) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      style={styles.wrapper}
    >
      <Swipeable
        renderRightActions={(_progress, _dragX, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.date} · {event.place}</Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  card: {
    padding: 16,
    minHeight: 44,
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
  action: {
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 8,
  },
  actionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});