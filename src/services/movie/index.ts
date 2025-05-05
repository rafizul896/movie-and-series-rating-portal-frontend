export const getAllMovies = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/movie`, {
      method: "GET",
      next: {
        tags: ["movies"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
