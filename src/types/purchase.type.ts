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