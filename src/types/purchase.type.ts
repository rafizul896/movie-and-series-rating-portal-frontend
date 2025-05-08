export interface PurchaseData {
  id: string;
  purchase_type: string;
  userId: string;
  movieId: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  transactionId: string;
  purchasedAt: string;
  accessExpiryTime: string;
  createdAt: string;
}

export interface IOrderHistory {
  transactionId: string;
  id: string;
  purchase_type: "BUY" | "RENT";
  amount: number;
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  accessExpiryTime: string;
  movie: {
    title: string;
  };
  users: {
    name: string;
  };
}
