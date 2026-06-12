import { useTranslation } from "react-i18next";

const FavouriteItem = ({ title, imdbRating }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between rounded-lg border border-l-4 border-gray-300 bg-white px-6 py-4 shadow-sm">
      <span className="font-semibold text-gray-900">{title}</span>
      <span className="text-gray-500">
        <span className="font-semibold text-gray-500">
          {t("label.rating")}:{" "}
        </span>
        {imdbRating ? `${imdbRating}/10` : "N/A"}
      </span>
    </div>
  );
};

export default FavouriteItem;
