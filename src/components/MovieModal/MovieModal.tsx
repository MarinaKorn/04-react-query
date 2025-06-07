import { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : null;

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.close} onClick={onClose}>
          ×
        </button>
        <h2 className={css.title}>{movie.title}</h2>
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className={css.image}
          />
        )}
        <p className={css.overview}>{movie.overview}</p>
        <p className={css.info}>
          <strong>Release date:</strong> {movie.release_date}
        </p>
        <p className={css.info}>
          <strong>Rating:</strong> {movie.vote_average}
        </p>
      </div>
    </div>,
    document.body
  );
}
