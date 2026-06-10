import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center gap-8 border-b border-gray-200 bg-white px-8 py-4">
      <div className="text-2xl font-bold">
        <span className="text-blue-600">Cine </span>
        <span>Searcher</span>
      </div>
      <nav className="flex gap-6">
        <Link
          to="/movies"
          className={`font-medium ${
            pathname === "/movies" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Home
        </Link>
        <Link
          to="/favourites"
          className={`font-medium ${
            pathname === "/favourites" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => console.log("clicked favourites")}
        >
          Favourites
        </Link>
      </nav>
    </div>
  );
};

export default Header;
