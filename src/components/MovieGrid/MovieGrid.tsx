import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={css.card}
          onClick={() => onSelect(movie)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={css.image}
          />
          <div className={css.details}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.rating}>⭐ {movie.vote_average}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
