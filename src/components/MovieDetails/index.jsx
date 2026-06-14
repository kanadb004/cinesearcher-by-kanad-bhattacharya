/* eslint-disable import/extensions */
import fallbackPoster from "assets/images/fallback-poster.svg";
import starFilled from "assets/images/star-filled.png";
import star from "assets/images/star.png";
/* eslint-enable import/extensions */
import { FallbackImage, PageLoader } from "components/commons";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

import "./index.css";

const MovieDetails = ({ imdbID, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { data: movie = {}, isLoading } = useShowMovie({ id: imdbID });

  const { favourites, toggleFavourite } = useFavouritesStore.pick();
  const isFavourite = favourites.some(fav => fav.imdbID === imdbID);

  const isPosterValid = !!movie.poster;

  const detailsList = [
    { label: t("label.director"), value: movie.director },
    { label: t("label.actors"), value: movie.actors },
    { label: t("label.boxOffice"), value: movie.boxOffice },
    { label: t("label.year"), value: movie.year },
    { label: t("label.runtime"), value: movie.runtime },
    { label: t("label.language"), value: movie.language },
    { label: t("label.rated"), value: movie.rated },
  ];

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
            {movie.title}
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
              onClick={() =>
                toggleFavourite({
                  imdbID,
                  title: movie.title,
                  imdbRating: movie.imdbRating,
                })
              }
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 pb-2.5 pt-2.5">
          {movie.genres?.map(genre => (
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
                  alt={movie.title}
                  className="w-full max-w-[250px] rounded-lg object-cover"
                  src={movie.poster}
                  onError={e => {
                    e.target.src = fallbackPoster;
                  }}
                />
              ) : (
                <FallbackImage
                  alt={movie.title}
                  className="w-full max-w-[250px] rounded-lg"
                />
              )}
            </div>
            <div className="w-full space-y-3 md:w-2/3">
              <Typography className="italic leading-relaxed text-gray-500">
                {movie.plot}
              </Typography>
              {detailsList.map(
                ({ label, value }) =>
                  value && (
                    <Typography key={label}>
                      <strong>{label}:</strong> {value}
                    </Typography>
                  )
              )}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MovieDetails;
