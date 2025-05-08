export interface IWishlistMovie {
  id: number;
  movieId: string;
  title: string;
  image: string;
  buyPrice: number;
  rentPrice: number;
  discountPercentage: number;
  purchaseType: "BUY" | "RENT";
  type: "movie" | "series";
}
