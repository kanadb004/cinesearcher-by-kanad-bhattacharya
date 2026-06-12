import { Header } from "components/commons";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

import FavouriteItem from "./FavouriteItem";

const Favourites = () => {
  const { t } = useTranslation();
  const favourites = useFavouritesStore.pickFrom();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-5xl p-8">
        <div className="max-h-[80vh] space-y-3 overflow-y-auto">
          {isEmpty(favourites) ? (
            <div className="flex h-64 items-center justify-center">
              <NoData title={t("favourites.empty")} />
            </div>
          ) : (
            favourites.map(({ imdbID, title, imdbRating }) => (
              <FavouriteItem
                imdbID={imdbID}
                imdbRating={imdbRating}
                key={imdbID}
                title={title}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
