import { Text, StyleSheet } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type Props = {
  date: string;
};

export default function HolidayNote({ date }: Props) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.note}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.note}>Holidays unavailable</Text>;
  }

  const holiday = data?.find((h) => h.date === date);

  if (holiday) {
    return <Text style={styles.holiday}>Public holiday: {holiday.name}</Text>;
  }

  return <Text style={styles.note}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  note: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  holiday: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 12,
  },
});