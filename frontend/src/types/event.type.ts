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
    categories: {
        _id: string;
        name: string;
        price: number;
        totalSeats: number;
        availableSeats: number;
    }[];
    bookingsCount: number;
    createdAt: string;
    updatedAt: string;
}