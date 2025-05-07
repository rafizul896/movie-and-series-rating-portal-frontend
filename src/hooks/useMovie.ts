"use client";

import { getAllMovies } from "@/services/movie";
import { useEffect, useState } from "react";

const useAllMovies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getAllMovies();
        setAllMovies(data?.data);
        setMetaData(data?.meta);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { allMovies, loading, metaData };
};

export default useAllMovies;
