import { useShowMovie } from "hooks/reactQuery/useMoviesApi";

const FavouriteItem = ({ imdbID }) => {
  const { data: movie = {} } = useShowMovie({ id: imdbID });

  return (
    <div className="flex items-center justify-between rounded-lg border border-l-4 border-gray-300 bg-white px-6 py-4 shadow-sm">
      <span className="font-semibold text-gray-900">{movie.Title}</span>
      <span className="text-gray-500">
        <span className="font-semibold text-gray-500">Rating: </span>
        {movie.imdbRating}/10
      </span>
    </div>
  );
};

export default FavouriteItem;
