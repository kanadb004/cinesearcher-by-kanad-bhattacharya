import { useState, useEffect, useRef, useCallback } from "react";

import { Header, PageLoader } from "components/commons";
import MovieDetails from "components/MovieDetails";
import ViewHistory from "components/ViewHistory";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import { Filter, Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useLocation, useHistory } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import FilterDropdown, { FILTER_INITIAL_VALUES } from "./FilterDropdown";
import MovieListItem from "./MovieListItem";

const HISTORY_STORAGE_KEY = "cinesearcher-history";
const ACTIVE_ID_STORAGE_KEY = "cinesearcher-active-id";
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_INDEX = 1;

const getTypeParam = ({ movie, series }) => {
  if (movie && !series) return "movie";

  if (!movie && series) return "series";

  return undefined;
};

const MovieList = () => {
  const location = useLocation();
  const routerHistory = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = Number(searchParams.get("page")) || DEFAULT_PAGE_INDEX;

  const [searchKey, setSearchKey] = useState(searchTerm);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState(FILTER_INITIAL_VALUES);
  const [activeHistoryId, setActiveHistoryId] = useState(
    () => getFromLocalStorage(ACTIVE_ID_STORAGE_KEY) || null
  );

  const [viewHistory, setViewHistory] = useState(
    () => getFromLocalStorage(HISTORY_STORAGE_KEY) || []
  );

  const searchInputRef = useRef(null);
  const itemRefs = useRef({});
  const debounceTimer = useRef(null);

  const fetchTerm = searchTerm || "spider-man";

  const { data = {}, isLoading } = useFetchMovies({
    searchTerm: fetchTerm,
    page: currentPage,
    year: filterValues.year || undefined,
    type: getTypeParam(filterValues),
  });

  const movies = data?.Search || [];
  const hasError = data?.Response === "False";
  const totalResults = Number(data?.totalResults) || 0;

  const handleFilterChange = useCallback(newFilterValues => {
    setFilterValues(newFilterValues);
  }, []);

  useEffect(() => {
    setSearchKey(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePageNavigation = newPage => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    routerHistory.replace(`/movies?${params.toString()}`);
  };

  const handleViewDetails = movie => {
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
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <Header />
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col items-center py-10">
          <div className="w-full max-w-5xl space-y-10 px-6">
            <div className="flex justify-center">
              <div className="relative flex w-full max-w-2xl items-center gap-3">
                <Input
                  autoFocus={false}
                  className="flex-1 rounded-md border-[#ddd] bg-white shadow-sm"
                  placeholder="Search any movie or series... (press / to focus)"
                  prefix={<Search className="text-gray-400" />}
                  ref={searchInputRef}
                  size="large"
                  type="search"
                  value={searchKey}
                  onChange={({ target: { value } }) => {
                    setSearchKey(value);
                    clearTimeout(debounceTimer.current);
                    debounceTimer.current = setTimeout(() => {
                      routerHistory.replace(
                        value
                          ? `/movies?page=${DEFAULT_PAGE_INDEX}&searchTerm=${encodeURIComponent(
                              value
                            )}`
                          : "/movies"
                      );
                    }, 350);
                  }}
                />
                <button
                  className="flex-shrink-0 cursor-pointer text-gray-500 hover:text-gray-700"
                  type="button"
                  onClick={() => setIsFilterOpen(prev => !prev)}
                >
                  <Filter size={20} />
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 top-12 z-50">
                    <FilterDropdown
                      initialValues={filterValues}
                      onClose={() => setIsFilterOpen(false)}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                )}
              </div>
            </div>
            {
              // eslint-disable-next-line no-nested-ternary
              isLoading ? (
                <PageLoader />
              ) : hasError || isEmpty(movies) ? (
                <div className="flex h-full w-full items-center justify-center pt-20">
                  <NoData
                    // description={data?.Error}
                    title="No movie or series found"
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
              )
            }
          </div>
          {!hasError && totalResults > DEFAULT_PAGE_SIZE && (
            <div className="mb-5 mt-8 self-end pr-6">
              <Pagination
                count={totalResults}
                navigate={handlePageNavigation}
                pageNo={currentPage}
                pageSize={DEFAULT_PAGE_SIZE}
              />
            </div>
          )}
        </div>
        <div className="sticky top-0 h-screen overflow-y-auto border-l border-gray-200 bg-white p-6">
          <ViewHistory
            activeId={activeHistoryId}
            history={viewHistory}
            itemRefs={itemRefs}
          />
        </div>
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
