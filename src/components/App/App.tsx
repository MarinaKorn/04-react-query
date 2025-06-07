import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");

  const handleSearch = async (formData: FormData) => {
    const searchQuery = formData.get("query")?.toString().trim() || "";
    if (!searchQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    await loadMovies(searchQuery, 1);
  };

  const loadMovies = async (searchQuery: string, page: number) => {
    try {
      setLoading(true);
      setError(false);
      const { results, total_pages } = await fetchMovies(searchQuery, page);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results);
      setTotalPages(total_pages);
    } catch (error) {
      setError(true);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);
    loadMovies(query, newPage);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar action={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
