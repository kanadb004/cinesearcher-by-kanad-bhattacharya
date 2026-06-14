import { FAVOURITES_STORAGE_KEY } from "constants/storageKeys";

import { existsBy, removeBy } from "neetocist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritesStore = create(
  persist(
    (set, get) => ({
      favourites: [],

      toggleFavourite: movie => {
        const { favourites } = get();
        const isFavourited = existsBy({ imdbID: movie.imdbID }, favourites);

        set({
          favourites: isFavourited
            ? removeBy({ imdbID: movie.imdbID }, favourites)
            : [
                {
                  imdbID: movie.imdbID,
                  title: movie.title,
                  imdbRating: movie.imdbRating,
                },
                ...favourites,
              ],
        });
      },
    }),
    { name: FAVOURITES_STORAGE_KEY }
  )
);

export default useFavouritesStore;
