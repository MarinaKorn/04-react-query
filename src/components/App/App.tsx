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
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (formData: FormData) => {
    const searchQuery = (formData.get("query") as string).trim();
    if (!searchQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);
      setQuery(searchQuery);
      setPage(1);

      const data = await fetchMovies(searchQuery, 1);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch {
      setIsError(true);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setPage(newPage);

    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query, newPage);
      setMovies(data.results);
    } catch {
      setIsError(true);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <SearchBar action={handleSearch} />
        </div>
      </header>

      <main className={css.app}>
        <Toaster position="top-right" />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
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
      </main>
    </>
  );
}
