export type ShowPrice = {
  regular: number;
  premium: number;
  vip: number;
};

export type ListingShow = {
  _id: string;
  showTime: string; // ISO
  endTime: string;  // ISO
  price: ShowPrice;
  availableSeats: number;
  totalSeats: number;
};

export type ScreenGroup = {
  screenName: string;
  shows: ListingShow[];
};

export type CinemaLocation = {
  name: string;
  city: string;
  state: string;
};

export type CinemaInfo = {
  _id: string;
  name: string;
  location: CinemaLocation;
};

export type CinemaListingItem = {
  _id: string; // cinema id (same as cinema._id)
  cinema: CinemaInfo;
  screens: ScreenGroup[];
};

export type ShowsFilters = {
  startDate: string;
  endDate: string;
};

export type movieDetails = {
    _id: string;
    title: string;
    releaseDate: string;
    runtime: number;
    genres: string[];
    posterUrl: string;
    bannerUrl: string;
};

export type GetShowsListingResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: ShowsFilters;
  movie : movieDetails;
  data: CinemaListingItem[];
};
