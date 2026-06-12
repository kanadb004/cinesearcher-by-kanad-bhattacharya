import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

const FavouriteItem = ({ imdbID }) => {
  const { t } = useTranslation();
  const { data: movie = {}, isLoading } = useShowMovie({ id: imdbID });

  if (isLoading) {
    return (
      <div className="flex h-14 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-l-4 border-gray-300 bg-white px-6 py-4 shadow-sm">
      <span className="font-semibold text-gray-900">{movie.title}</span>
      <span className="text-gray-500">
        <span className="font-semibold text-gray-500">
          {t("label.rating")}:{" "}
        </span>
        {movie.imdbRating ? `${movie.imdbRating}/10` : "N/A"}
      </span>
    </div>
  );
};

export default FavouriteItem;
