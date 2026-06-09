import axios from "axios";
import { REACT_APP_OMDB_API_KEY } from "env";

const show = ({ id, plot = "short" }) =>
  axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: REACT_APP_OMDB_API_KEY,
      i: id,
      plot,
    },
  });

const fetch = ({ searchTerm, type, page = 1 }) =>
  axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: REACT_APP_OMDB_API_KEY,
      s: searchTerm,
      type,
      page,
    },
  });

const moviesApi = { show, fetch };

export default moviesApi;
