import moviesApi from "apis/movies";
import { useQuery } from "react-query";

export const useShowMovie = params =>
  useQuery({
    queryKey: ["movies", params.id],
    queryFn: () => moviesApi.show(params),
    enabled: !!params.id,
  });

export const useFetchMovies = params =>
  useQuery({
    queryKey: ["movies", params],
    queryFn: () => moviesApi.fetch(params),
    keepPreviousData: true,
  });
