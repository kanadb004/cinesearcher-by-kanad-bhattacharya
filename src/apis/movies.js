import { OMDB_API_KEY, OMDB_API_URL } from "constants/apis";

import axios from "axios";

const show = async ({ id, plot = "short" }) => {
  const response = await axios.get(OMDB_API_URL, {
    params: {
      apikey: OMDB_API_KEY,
      i: id,
      plot,
    },
  });

  return response.data;
};

const fetch = async ({ searchTerm, type, year, page = 1 }) => {
  const response = await axios.get(OMDB_API_URL, {
    params: {
      apikey: OMDB_API_KEY,
      s: searchTerm,
      type,
      y: year,
      page,
    },
  });

  return response.data;
};

const moviesApi = { show, fetch };

export default moviesApi;
