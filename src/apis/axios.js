import { OMDB_API_URL } from "constants/apis";

import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const setOmdbValue = value => (value && value !== "N/A" ? value : "");

const toCamelCase = key => key.charAt(0).toLowerCase() + key.slice(1);

const transformMovieDetailKeys = data => {
  const camelCasedMovie = {};

  Object.entries(data).forEach(([key, value]) => {
    camelCasedMovie[toCamelCase(key)] = setOmdbValue(value);
  });

  return {
    ...camelCasedMovie,
    genres: camelCasedMovie.genre ? camelCasedMovie.genre.split(", ") : [],
  };
};

const transformResponseData = response => {
  const { data } = response;
  const isSearchRequest = !!response.config?.params?.s;

  if (data.Response === "False") {
    if (isSearchRequest) {
      return { error: data.Error, movies: [], totalResults: 0 };
    }

    throw new Error(data.Error || t("toast.movieNotFound"));
  }

  if (data.Search) {
    return {
      movies: data.Search.map(({ Title, Year, imdbID, Type, Poster }) => ({
        id: imdbID,
        title: Title,
        year: Year,
        type: Type.charAt(0).toUpperCase() + Type.slice(1),
        posterUrl: Poster !== "N/A" ? Poster : "",
      })),
      totalResults: Number(data.totalResults) || 0,
    };
  }

  if (data.imdbID) return transformMovieDetailKeys(data);

  return data;
};

const handleErrorToastr = error => {
  if (error.message === t("toast.networkError")) {
    Toastr.error(t("toast.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }
};

const registerResponseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      if (response.data) response.data = transformResponseData(response);

      return response.data;
    },
    error => {
      handleErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = OMDB_API_URL;
  setHttpHeaders();
  registerResponseInterceptors();
};

export default initializeAxios;
