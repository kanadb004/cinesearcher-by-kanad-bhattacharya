import { useState, useEffect, useRef } from "react";

import { Filter, Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import FilterDropdown from "./FilterDropdown";

const DEFAULT_PAGE_INDEX = 1;

const SearchBar = ({ searchTerm, filterValues, onFilterChange }) => {
  const { t } = useTranslation();
  const routerHistory = useHistory();

  const [searchKey, setSearchKey] = useState(searchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setSearchKey(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchChange = ({ target: { value } }) => {
    setSearchKey(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      routerHistory.replace(
        value
          ? `/movies?page=${DEFAULT_PAGE_INDEX}&searchTerm=${encodeURIComponent(
              value
            )}`
          : "/movies"
      );
    }, 350);
  };

  return (
    <div className="flex justify-center">
      <div className="relative flex w-full items-center gap-3">
        <Input
          autoFocus={false}
          className="flex-1 rounded-md border-[#ddd] bg-white shadow-sm"
          placeholder={t("search.placeholder")}
          prefix={<Search className="text-gray-400" />}
          ref={searchInputRef}
          size="large"
          type="search"
          value={searchKey}
          onChange={handleSearchChange}
        />
        <button
          className="flex-shrink-0 cursor-pointer text-gray-500 hover:text-gray-700"
          type="button"
          onClick={() => setIsFilterOpen(prev => !prev)}
        >
          <Filter size={20} />
        </button>
        {isFilterOpen && (
          <div className="absolute right-0 top-12 z-50">
            <FilterDropdown
              initialValues={filterValues}
              onClose={() => setIsFilterOpen(false)}
              onFilterChange={onFilterChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
