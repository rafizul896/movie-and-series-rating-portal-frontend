"use client";

import { useEffect, useState } from "react";
import { getAllMovies } from "@/services/movie";

const useAllMovies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getAllMovies();
        setAllMovies(data.data);
        setMetaData(data.meta);
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
