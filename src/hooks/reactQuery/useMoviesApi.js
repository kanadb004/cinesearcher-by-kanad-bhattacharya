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
    keepPreviousData: false,
    onSuccess: data => {
      if (data?.Response === "False") {
        Toastr.error(data.Error);
      }
    },
  });
