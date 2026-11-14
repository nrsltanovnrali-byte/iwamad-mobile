
export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'Web Development Workshop',
    date: '2026-10-26',
    place: 'Room 302',
    seats: 20
  },
  {
    id: 2,
    title: 'English Speaking Club',
    date: '2026-10-27',
    place: 'Room 205',
    seats: 15
  },
  {
    id: 3,
    title: 'Cybersecurity Quiz',
    date: '2026-10-28',
    place: 'Computer Lab',
    seats: 2
  },
  {
    id: 4,
    title: 'Student Project Meetup',
    date: '2026-10-29',
    place: 'Conference Hall',
    seats: 30
  }
]
