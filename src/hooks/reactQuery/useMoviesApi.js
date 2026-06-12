import moviesApi from "apis/movies";
import { Toastr } from "neetoui";
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
    enabled: !!params.searchTerm,
    keepPreviousData: false,
    onSuccess: data => {
      if (data?.error) {
        Toastr.error(data.error);
      }
    },
  });
