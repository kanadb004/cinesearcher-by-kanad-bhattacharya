import { HISTORY_STORAGE_KEY } from "constants/storageKeys";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useViewHistoryStore = create(
  persist(
    (set, get) => ({
      selectedMovieId: null,
      activeHistoryId: null,
      viewHistory: [],

      setSelectedMovieId: id => set({ selectedMovieId: id }),

      addToViewHistory: movie => {
        const { viewHistory } = get();
        const alreadyInHistory = viewHistory.some(
          item => item.imdbID === movie.id
        );

        set({ selectedMovieId: movie.id, activeHistoryId: movie.id });

        if (!alreadyInHistory) {
          set({
            viewHistory: [
              { imdbID: movie.id, title: movie.title },
              ...viewHistory,
            ],
          });
        }

        return alreadyInHistory;
      },

      deleteHistoryItem: imdbID => {
        const { viewHistory, activeHistoryId } = get();
        const updatedHistory = viewHistory.filter(
          item => item.imdbID !== imdbID
        );
        const wasActive = activeHistoryId === imdbID;

        set({
          viewHistory: updatedHistory,
          ...(wasActive
            ? { activeHistoryId: null, selectedMovieId: null }
            : {}),
        });
      },

      clearHistory: () =>
        set({
          viewHistory: [],
          activeHistoryId: null,
          selectedMovieId: null,
        }),
    }),
    {
      name: HISTORY_STORAGE_KEY,
      partialize: state => ({
        viewHistory: state.viewHistory,
        activeHistoryId: state.activeHistoryId,
      }),
    }
  )
);

export default useViewHistoryStore;
