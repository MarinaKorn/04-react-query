import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '',
    placeholderData: (prev) => prev,
  });

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
          />
        </div>
      </header>

      <main className={css.app}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
          />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </main>
    </div>
  );
}