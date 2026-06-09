import axios from "axios";

const show = async ({ id, plot = "short" }) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: process.env.REACT_APP_OMDB_API_KEY,
      i: id,
      plot,
    },
  });

  return response.data;
};

const fetch = async ({ searchTerm, type, year, page = 1 }) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: process.env.REACT_APP_OMDB_API_KEY,
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
