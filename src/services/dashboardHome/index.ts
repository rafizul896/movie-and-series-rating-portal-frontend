"use server";

export const getPurchaseAnalytics = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/purchase-analytics`,
      {
        method: "GET",
        next: {
          tags: ["purchase-analytics"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getMovieWiseSales = async (query: {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/movie-wise-sales`
    );

    // Add query params dynamically
    if (query.searchTerm)
      url.searchParams.append("searchTerm", query.searchTerm);
    if (query.startDate) url.searchParams.append("startDate", query.startDate);
    if (query.endDate) url.searchParams.append("endDate", query.endDate);
    url.searchParams.append("page", String(query.page || 1));
    url.searchParams.append("pageSize", String(query.pageSize || 10));

    const res = await fetch(url.toString(), {
      method: "GET",
      next: { tags: ["GetMovieWiseSales"] },
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return { error: err.message };
  }
};
