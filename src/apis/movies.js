import { OMDB_API_KEY } from "constants/apis";

import axios from "axios";

const show = async ({ id, plot = "short" }) =>
  axios.get("/", {
    params: {
      apikey: OMDB_API_KEY,
      i: id,
      plot,
    },
  });

const fetch = async ({ searchTerm, type, year, page = 1 }) =>
  axios.get("/", {
    params: {
      apikey: OMDB_API_KEY,
      s: searchTerm,
      type,
      y: year,
      page,
    },
  });

const moviesApi = { show, fetch };

export default moviesApi;
