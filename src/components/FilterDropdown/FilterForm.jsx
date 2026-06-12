import { useEffect } from "react";

import { useFormikContext } from "formik";
import { Close } from "neetoicons";
import { Checkbox, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const FilterForm = ({ onClose, onFilterChange }) => {
  const { t } = useTranslation();
  const { values, setFieldValue, errors } = useFormikContext();

  useEffect(() => {
    const effectiveYear =
      values.year.length === 4 && !errors.year ? values.year : "";

    onFilterChange({
      ...values,
      year: effectiveYear,
    });
  }, [values, errors, onFilterChange]);

  const handleMovieChange = () => {
    const nextMovie = !values.movie;

    if (!nextMovie && !values.series) {
      setFieldValue("movie", true);
      setFieldValue("series", true);

      return;
    }

    setFieldValue("movie", nextMovie);
  };

  const handleSeriesChange = () => {
    const nextSeries = !values.series;

    if (!values.movie && !nextSeries) {
      setFieldValue("movie", true);
      setFieldValue("series", true);

      return;
    }

    setFieldValue("series", nextSeries);
  };

  return (
    <div className="relative w-64 rounded-lg bg-white p-5 shadow-lg">
      <button
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        type="button"
        onClick={onClose}
      >
        <Close size={16} />
      </button>
      <div className="filter-dropdown space-y-4">
        <Input
          label={t("label.year")}
          maxLength={4}
          name="year"
          placeholder={t("filter.yearPlaceholder")}
          showCount={false}
          onKeyDown={e => {
            if (
              !/^\d$/.test(e.key) &&
              ![
                "Backspace",
                "Delete",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
              ].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
        />
        <div>
          <Typography className="mb-3 font-semibold" style="body1">
            {t("label.type")}
          </Typography>
          <div className="flex gap-6">
            <Checkbox
              checked={values.movie}
              label={t("label.movie")}
              onChange={handleMovieChange}
            />
            <Checkbox
              checked={values.series}
              label={t("label.series")}
              onChange={handleSeriesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
