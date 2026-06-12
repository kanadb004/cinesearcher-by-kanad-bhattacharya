import { useState, useRef, useCallback } from "react";

import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const HISTORY_STORAGE_KEY = "cinesearcher-history";
const ACTIVE_ID_STORAGE_KEY = "cinesearcher-active-id";

const useViewHistory = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(
    () => getFromLocalStorage(ACTIVE_ID_STORAGE_KEY) || null
  );

  const [viewHistory, setViewHistory] = useState(
    () => getFromLocalStorage(HISTORY_STORAGE_KEY) || []
  );
  const itemRefs = useRef({});

  const handleDeleteHistoryItem = useCallback(
    imdbID => {
      const updated = viewHistory.filter(item => item.imdbID !== imdbID);
      setViewHistory(updated);
      setToLocalStorage(HISTORY_STORAGE_KEY, updated);
      if (activeHistoryId === imdbID) {
        setActiveHistoryId(null);
        setToLocalStorage(ACTIVE_ID_STORAGE_KEY, null);
      }
    },
    [viewHistory, activeHistoryId]
  );

  const handleClearHistory = useCallback(() => {
    setViewHistory([]);
    setToLocalStorage(HISTORY_STORAGE_KEY, []);
    setActiveHistoryId(null);
    setToLocalStorage(ACTIVE_ID_STORAGE_KEY, null);
  }, []);

  const handleViewDetails = useCallback(
    movie => {
      setSelectedMovieId(movie.imdbID);
      setActiveHistoryId(movie.imdbID);
      setToLocalStorage(ACTIVE_ID_STORAGE_KEY, movie.imdbID);

      const alreadyExists = viewHistory.find(
        item => item.imdbID === movie.imdbID
      );

      if (alreadyExists) {
        itemRefs.current[movie.imdbID]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });

        return;
      }

      const updatedHistory = [
        { imdbID: movie.imdbID, Title: movie.Title },
        ...viewHistory,
      ];
      setViewHistory(updatedHistory);
      setToLocalStorage(HISTORY_STORAGE_KEY, updatedHistory);
    },
    [viewHistory]
  );

  return {
    selectedMovieId,
    setSelectedMovieId,
    activeHistoryId,
    viewHistory,
    itemRefs,
    handleDeleteHistoryItem,
    handleClearHistory,
    handleViewDetails,
  };
};

export default useViewHistory;
