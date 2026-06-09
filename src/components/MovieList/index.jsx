import { useState } from "react";

import { PageLoader } from "components/commons";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import MovieListItem from "./MovieListItem";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  const fetchTerm = debouncedSearchTerm || "spider-man";

  const { data = {}, isLoading } = useFetchMovies({
    searchTerm: fetchTerm,
  });

  const movies = data?.Search || [];
  const hasError = data?.Response === "False";

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f5f5f5] py-10">
      <div className="w-full max-w-7xl space-y-10 px-6">
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
              <MovieListItem key={movie.imdbID} {...movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
