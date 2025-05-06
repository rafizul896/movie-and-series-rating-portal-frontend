"use server";

export const getPurchaseAnalytics = async () => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/purchase/purchase-analytics`,
      {
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
