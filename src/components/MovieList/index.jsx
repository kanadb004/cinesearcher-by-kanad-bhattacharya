import { useState, useRef } from "react";

import { PageLoader } from "components/commons";
import MovieDetails from "components/MovieDetails";
import ViewHistory from "components/ViewHistory";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import MovieListItem from "./MovieListItem";

const HISTORY_STORAGE_KEY = "cinesearcher-history";
const ACTIVE_ID_STORAGE_KEY = "cinesearcher-active-id";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(
    () => getFromLocalStorage(ACTIVE_ID_STORAGE_KEY) || null
  );

  const [history, setHistory] = useState(
    () => getFromLocalStorage(HISTORY_STORAGE_KEY) || []
  );

  const itemRefs = useRef({});

  const debouncedSearchTerm = useDebounce(searchTerm);
  const fetchTerm = debouncedSearchTerm || "spider-man";

  const { data = {}, isLoading } = useFetchMovies({ searchTerm: fetchTerm });

  const movies = data?.Search || [];
  const hasError = data?.Response === "False";

  const handleViewDetails = movie => {
    setSelectedMovieId(movie.imdbID);
    setActiveHistoryId(movie.imdbID);
    setToLocalStorage(ACTIVE_ID_STORAGE_KEY, movie.imdbID);

    const alreadyExists = history.find(item => item.imdbID === movie.imdbID);

    if (alreadyExists) {
      itemRefs.current[movie.imdbID]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

      return;
    }

    const updatedHistory = [
      { imdbID: movie.imdbID, Title: movie.Title },
      ...history,
    ];
    setHistory(updatedHistory);
    setToLocalStorage(HISTORY_STORAGE_KEY, updatedHistory);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <div className="flex flex-1 flex-col items-center py-10">
        <div className="w-full max-w-5xl space-y-10 px-6">
          <div className="flex justify-center">
            <Input
              autoFocus={false}
              className="w-full max-w-2xl rounded-md border-[#ddd] bg-white shadow-sm"
              placeholder="Search any movie or series..."
              prefix={<Search className="text-gray-400" />}
              size="large"
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {isLoading ? (
            <PageLoader />
          ) : hasError || isEmpty(movies) ? (
            <div className="flex h-full w-full items-center justify-center pt-20">
              <NoData
                description={data?.Error || "Try changing search term."}
                title="No movies found"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movies.map(movie => (
                <MovieListItem
                  key={movie.imdbID}
                  {...movie}
                  onViewDetails={() => handleViewDetails(movie)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="sticky top-0 h-screen overflow-y-auto border-l border-gray-200 bg-white p-6">
        <ViewHistory
          activeId={activeHistoryId}
          history={history}
          itemRefs={itemRefs}
        />
      </div>
      {selectedMovieId && (
        <MovieDetails
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
