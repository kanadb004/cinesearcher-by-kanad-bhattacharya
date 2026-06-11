import { useState } from "react";

import { Header } from "components/commons";
import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage } from "utils/storage";

import FavouriteItem from "./FavouriteItem";

const FAVOURITES_STORAGE_KEY = "cinesearcher-favourites";

const Favourites = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line react/hook-use-state
  const [favourites] = useState(
    () => getFromLocalStorage(FAVOURITES_STORAGE_KEY) || []
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-5xl p-8">
        <div className="max-h-[80vh] space-y-3 overflow-y-auto">
          {favourites.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <NoData title={t("favourites.empty")} />
            </div>
          ) : (
            favourites.map(imdbID => (
              <FavouriteItem imdbID={imdbID} key={imdbID} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
