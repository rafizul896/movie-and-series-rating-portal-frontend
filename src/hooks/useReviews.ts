/* eslint-disable react-hooks/exhaustive-deps */
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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllReviews(params);
      setAllReviews({
        data: response?.data?.data || [],
        meta: response?.meta || {},
      });

      const meta = response?.data?.meta;
      setTotalPages(Math.ceil(meta?.total / meta?.limit));

    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { allReviews, loading, refetch: fetchReviews , currentPage, totalPages, setCurrentPage};
};

export default useGetAllReviews;
