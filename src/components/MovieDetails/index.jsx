import { FallbackImage, PageLoader } from "components/commons";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal, Typography } from "neetoui";

import "./index.css";

const MovieDetails = ({ imdbID, onClose }) => {
  const { data: movie = {}, isLoading } = useShowMovie({ id: imdbID });

  const isPosterValid = movie.Poster && movie.Poster !== "N/A";

  return (
    <Modal
      isOpen
      className="movie-details-modal max-h-[70vh] overflow-y-auto"
      size="large"
      onClose={onClose}
    >
      <Modal.Header>
        <Typography style="h2" weight="bold">
          {movie.Title}
        </Typography>
        <div className="flex flex-wrap gap-2 pb-2.5 pt-2.5">
          {movie.Genre &&
            movie.Genre.split(", ").map(genre => (
              <span
                key={genre}
                style={{
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  fontSize: "13px",
                }}
              >
                {genre}
              </span>
            ))}
        </div>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <PageLoader />
        ) : (
          <div className="flex flex-col gap-6 md:flex-row">
            {isPosterValid ? (
              <img
                alt={movie.Title}
                className="w-full max-w-[200px] self-center rounded-lg md:self-start"
                src={movie.Poster}
              />
            ) : (
              <FallbackImage
                alt={movie.Title}
                className="w-full max-w-[200px] self-center rounded-lg md:self-start"
              />
            )}
            <div className="min-w-0 flex-1 space-y-3 overflow-hidden">
              <Typography className="leading-relaxed text-gray-500">
                {movie.Plot}
              </Typography>
              <Typography>
                <strong>Director:</strong> {movie.Director}
              </Typography>
              <Typography>
                <strong>Actors:</strong> {movie.Actors}
              </Typography>
              <Typography>
                <strong>Box Office:</strong> {movie.BoxOffice}
              </Typography>
              <Typography>
                <strong>Year:</strong> {movie.Year}
              </Typography>
              <Typography>
                <strong>Runtime:</strong> {movie.Runtime}
              </Typography>
              <Typography>
                <strong>Language:</strong> {movie.Language}
              </Typography>
              <Typography>
                <strong>Rated:</strong> {movie.Rated}
              </Typography>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MovieDetails;
