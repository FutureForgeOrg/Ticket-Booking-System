export interface EventCategory {
  _id: string;
  name: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  comedianName?: string;
  posterUrl: string;
  bannerUrl: string;
  duration: number;
  ageRestriction: string;
  isFeatured: boolean;
  venue: string;
  city: string;
  date: string;
  categories: EventCategory[];
  bookingsCount: number;
  createdAt: string;
  updatedAt: string;
}
