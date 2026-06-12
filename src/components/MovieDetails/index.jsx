import { FAVOURITES_STORAGE_KEY } from "constants/favourites";

import { useState, useEffect } from "react";

/* eslint-disable import/extensions */
import fallbackPoster from "assets/images/fallback-poster.svg";
import starFilled from "assets/images/star-filled.png";
import star from "assets/images/star.png";
/* eslint-enable import/extensions */
import { FallbackImage, PageLoader } from "components/commons";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import "./index.css";

const MovieDetails = ({ imdbID, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { data: movie = {}, isLoading } = useShowMovie({ id: imdbID });

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!imdbID) return;

    const favs = getFromLocalStorage(FAVOURITES_STORAGE_KEY) || [];
    setIsFavourite(favs.includes(imdbID));
  }, [imdbID]);

  const isPosterValid = movie.Poster && movie.Poster !== "N/A";

  const handleToggleFavourite = () => {
    const favs = getFromLocalStorage(FAVOURITES_STORAGE_KEY) || [];
    const updated = isFavourite
      ? favs.filter(id => id !== imdbID)
      : [imdbID, ...favs];
    setToLocalStorage(FAVOURITES_STORAGE_KEY, updated);
    setIsFavourite(!isFavourite);
  };

  return (
    <Modal
      className="movie-details-modal max-h-[70vh] overflow-y-auto"
      isOpen={isOpen}
      size="large"
      onClose={onClose}
    >
      <Modal.Header>
        <div className="flex items-center gap-3">
          <Typography style="h2" weight="bold">
            {movie.Title}
          </Typography>
          {!isLoading && (
            <Button
              className="focus:outline-none rounded p-1 transition-colors hover:bg-gray-100"
              style="text"
              icon={() => (
                <img
                  className="h-5 w-5 object-contain"
                  src={isFavourite ? starFilled : star}
                  alt={
                    isFavourite
                      ? t("movieDetails.favouritedStarAlt")
                      : t("movieDetails.unfavouritedStarAlt")
                  }
                />
              )}
              tooltipProps={{
                content: isFavourite
                  ? t("movieDetails.removeFromFavourites")
                  : t("movieDetails.addToFavourites"),
                position: "right",
              }}
              onClick={handleToggleFavourite}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 pb-2.5 pt-2.5">
          {movie.Genre &&
            movie.Genre.split(", ").map(genre => (
              <span
                key={genre}
                style={{
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  fontSize: "13px",
                  padding: "2px 8px",
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
            <div className="flex w-full justify-center md:w-1/3 md:justify-start">
              {isPosterValid ? (
                <img
                  alt={movie.Title}
                  className="w-full max-w-[250px] rounded-lg object-cover"
                  src={movie.Poster}
                  onError={e => {
                    e.target.src = fallbackPoster;
                  }}
                />
              ) : (
                <FallbackImage
                  alt={movie.Title}
                  className="w-full max-w-[250px] rounded-lg"
                />
              )}
            </div>
            <div className="w-full space-y-3 md:w-2/3">
              <Typography className="italic leading-relaxed text-gray-500">
                {movie.Plot}
              </Typography>
              <Typography>
                <strong>{t("label.director")}:</strong> {movie.Director}
              </Typography>
              <Typography>
                <strong>{t("label.actors")}:</strong> {movie.Actors}
              </Typography>
              <Typography>
                <strong>{t("label.boxOffice")}:</strong> {movie.BoxOffice}
              </Typography>
              <Typography>
                <strong>{t("label.year")}:</strong> {movie.Year}
              </Typography>
              <Typography>
                <strong>{t("label.runtime")}:</strong> {movie.Runtime}
              </Typography>
              <Typography>
                <strong>{t("label.language")}:</strong> {movie.Language}
              </Typography>
              <Typography>
                <strong>{t("label.rated")}:</strong> {movie.Rated}
              </Typography>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MovieDetails;
