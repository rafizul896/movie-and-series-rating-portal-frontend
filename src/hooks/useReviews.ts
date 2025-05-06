import { getAllReviews } from "@/services/reviewService";
import { TMeta, TReview } from "@/types/review.type";
import { useCallback, useEffect, useState } from "react";

interface ReviewQueryParams {
  filterReview?: string;
  page?: number;
  limit?: number;
}

interface AllReviewsResponse {
  data: TReview[];
  meta: TMeta;
}

const useGetAllReviews = (params: ReviewQueryParams = {}) => {
  const [allReviews, setAllReviews] = useState<AllReviewsResponse>({
    data: [],
    meta: {},
  });
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllReviews(params);
      setAllReviews({
        data: response?.data?.data || [],
        meta: response?.meta || {},
      });
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { allReviews, loading, refetch: fetchReviews };
};

export default useGetAllReviews;
