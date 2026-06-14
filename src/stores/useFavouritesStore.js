import { FAVOURITES_STORAGE_KEY } from "constants/storageKeys";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritesStore = create(
  persist(
    (set, get) => ({
      favourites: [],

      toggleFavourite: movie => {
        const { favourites } = get();
        const isFavourited = favourites.some(
          fav => fav.imdbID === movie.imdbID
        );

        set({
          favourites: isFavourited
            ? favourites.filter(fav => fav.imdbID !== movie.imdbID)
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
