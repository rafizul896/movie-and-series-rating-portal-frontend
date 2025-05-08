export type TReviewMovie = {
  id: string;
  streamingLink: string;
  thumbnail: string;
  title: string;
};

export type TReview = {
  approved: boolean;
  comments?: any;
  content: string;
  createdAt: string;
  id: string;
  movie: TReviewMovie;
};

type TComment = {
  content: string;
  id: string;
  userId: string;
};
type TCommetUser = {
  id: string;
  name: string;
  email: string;
};
type TReviewCount = {
  likes: number;
  comments: number;
};
type TLike = {
  id: string;
  userId: string;
};
export type TReviewByMovieId = {
  approved: boolean;
  comments: TComment[];
  likes?: TLike[];
  liked?: boolean;
  content: string;
  createdAt: string;
  hasSpoiler: boolean;
  id: string;
  movieId: string;
  rating: 9;
  tags: string[];
  updatedAt: string;
  user: TCommetUser;
  userId: string;
  _count: TReviewCount;
};

export type TMeta = {
  page?: string;
  limit?: string;
  total?: string;
};
