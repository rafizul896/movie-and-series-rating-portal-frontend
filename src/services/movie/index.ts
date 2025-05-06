export const getAllMovies = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/movie`, {
      next: {
        tags: ["listings"],
      },
      method: "GET",
      // headers: {
      //   Authorization: (await cookies()).get("token")!.value,
      // },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleMovie = async (movieId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/movie/${movieId}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};
