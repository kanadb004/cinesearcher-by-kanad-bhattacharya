import { BASE_URL } from "constants/apis";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const getNavLinkClass = path =>
    classNames("font-medium", {
      "text-blue-600": pathname === path,
      "text-gray-600": pathname !== path,
    });

  return (
    <div className="flex items-center gap-8 border-b border-gray-200 bg-white px-8 py-4">
      <div className="text-3xl font-bold">
        <span className="text-blue-600">Cine </span>
        <span>Searcher</span>
      </div>
      <nav className="flex gap-6 pt-3">
        <Link
          className={getNavLinkClass(`${BASE_URL}movies`)}
          to={`${BASE_URL}movies`}
        >
          {t("nav.home")}
        </Link>
        <Link
          className={getNavLinkClass(`${BASE_URL}favourites`)}
          to={`${BASE_URL}favourites`}
        >
          {t("nav.favourites")}
        </Link>
      </nav>
    </div>
  );
};

export default Header;
