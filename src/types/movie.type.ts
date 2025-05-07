export type TSingleMovieReview = {
  approved: boolean;
  content: string;
  createdAt: string;
  hasSpoiler: boolean;
  id: string;
  rating: number;
  tags: string[];
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  _count: { likes: number; comments: number };
};

export type TMovie = {
  avgRating: number;
  buyPrice: number;
  cast: string[];
  createdAt: string;
  director: string;
  discountPrice: number;
  genres: string[];
  id: string;
  isDeleted: false;
  isTrending: false;
  likesCount: number;
  platforms: string[];
  releaseYear: number;
  rentPrice: number;
  reviews?: TSingleMovieReview[];
  reviewCount: number;
  streamingLink: string;
  synopsis: string;
  thumbnail: string;
  title: string;
  totalRating: number;
  type: string;
  updatedAt: string;
};
