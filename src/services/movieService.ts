import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await axios.get<{ results: Movie[]; total_pages: number }>(
    API_URL,
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
};
