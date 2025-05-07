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

export type TMeta = {
  page?: string;
  limit?: string;
  total?: string;
};
