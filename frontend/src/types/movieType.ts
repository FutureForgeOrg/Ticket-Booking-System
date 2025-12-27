export interface Movie {
  _id: string;
  title: string;
  releaseDate: Date;
  status: string;
  runtime: number;

  genres: string[];
  director: string;
  actors: string;     // !! to convert this to arr of str later
  plot: string;

  posterUrl: string;
  bannerUrl: string;
  trailerUrl: string;

  likesCount: number;

  createdAt: Date;
  updatedAt: Date;
}
