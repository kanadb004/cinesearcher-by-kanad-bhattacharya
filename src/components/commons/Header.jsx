import { BASE_URL } from "constants";

import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-8 border-b border-gray-200 bg-white px-8 py-4">
      <div className="text-2xl font-bold">
        <span className="text-blue-600">Cine </span>
        <span>Searcher</span>
      </div>
      <nav className="flex gap-6">
        <Link
          to={`${BASE_URL}movies`}
          className={`font-medium ${
            pathname === `${BASE_URL}movies` ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {t("nav.home")}
        </Link>
        <Link
          to={`${BASE_URL}favourites`}
          className={`font-medium ${
            pathname === `${BASE_URL}favourites`
              ? "text-blue-600"
              : "text-gray-600"
          }`}
        >
          {t("nav.favourites")}
        </Link>
      </nav>
    </div>
  );
};

export default Header;
