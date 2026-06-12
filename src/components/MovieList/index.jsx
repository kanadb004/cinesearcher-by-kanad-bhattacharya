import { BASE_URL } from "constants/apis";

import { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { FILTER_INITIAL_VALUES } from "components/FilterDropdown/constants";
import MovieDetails from "components/MovieDetails";
import ViewHistory from "components/ViewHistory";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useImagePreloader from "hooks/useImagePreloader";
import useViewHistory from "hooks/useViewHistory";
import { NoData, Pagination } from "neetoui";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_SIZE } from "./constants";
import MovieListItem from "./MovieListItem";
import SearchBar from "./SearchBar";

const getTypeParam = ({ movie, series }) => {
  if (movie && !series) return "movie";

  if (!movie && series) return "series";

  return undefined;
};

const MovieList = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const routerHistory = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = (searchParams.get("searchTerm") || "").trimEnd();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [filterValues, setFilterValues] = useState(FILTER_INITIAL_VALUES);

  const { data = {}, isLoading } = useFetchMovies({
    searchTerm,
    page: currentPage,
    year: filterValues.year || undefined,
    type: getTypeParam(filterValues),
  });

  const movies = data?.Search;
  const hasError = data?.Response === "False";
  const totalResults = Number(data?.totalResults) || 0;

  const areImagesLoaded = useImagePreloader(movies, isLoading);

  const {
    selectedMovieId,
    setSelectedMovieId,
    activeHistoryId,
    viewHistory,
    itemRefs,
    handleDeleteHistoryItem,
    handleClearHistory,
    handleViewDetails,
  } = useViewHistory();

  const handlePageNavigation = newPage => {
    const url = buildUrl(`${BASE_URL}movies`, {
      searchTerm: searchTerm || undefined,
      page: newPage,
    });
    routerHistory.replace(url);
  };

  const showLoader = isLoading || !areImagesLoaded;

  const renderMovieContent = () => {
    if (!searchTerm) {
      return (
        <div className="flex h-full w-full items-center justify-center pt-20">
          <NoData />
        </div>
      );
    }

    if (showLoader) return <PageLoader />;

    if (hasError || !movies?.length) {
      return (
        <div className="flex h-full w-full items-center justify-center pt-20">
          <NoData title={t("search.noResults")} />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map(movie => (
          <MovieListItem
            key={movie.imdbID}
            {...movie}
            onViewDetails={() => handleViewDetails(movie)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <Header />
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col items-center py-10">
          <div className="w-full max-w-5xl space-y-10 px-6">
            <SearchBar
              filterValues={filterValues}
              searchTerm={searchTerm}
              onFilterChange={setFilterValues}
            />
            {renderMovieContent()}
          </div>
          {!showLoader && !hasError && totalResults > DEFAULT_PAGE_SIZE && (
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
            onClearAll={handleClearHistory}
            onDeleteItem={handleDeleteHistoryItem}
          />
        </div>
      </div>
      <MovieDetails
        imdbID={selectedMovieId}
        isOpen={!!selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default MovieList;
