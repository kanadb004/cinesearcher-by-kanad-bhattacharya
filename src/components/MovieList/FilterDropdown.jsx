import { useEffect } from "react";

import { useFormikContext } from "formik";
import { t } from "i18next";
import { Close } from "neetoicons";
import { Checkbox, Typography } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import "./FilterDropdown.css";

const FILTER_INITIAL_VALUES = { year: "", movie: true, series: true };

const CURRENT_YEAR = new Date().getFullYear();

const FILTER_VALIDATION_SCHEMA = yup.object().shape({
  year: yup
    .string()
    .test(
      "valid-year-range",
      t("filter.yearValidation", { maxYear: CURRENT_YEAR + 2 }),
      value => {
        if (!value || value.length < 4) return true;
        const num = parseInt(value, 10);

        return num >= 1900 && num <= CURRENT_YEAR + 2;
      }
    ),
});

const FilterForm = ({ onClose, onFilterChange }) => {
  const { t: translate } = useTranslation();
  const { values, setFieldValue, errors } = useFormikContext();

  useEffect(() => {
    const effectiveYear =
      values.year.length === 4 && !errors.year ? values.year : "";
    onFilterChange({ ...values, year: effectiveYear });
  }, [values, errors, onFilterChange]);

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
          label={translate("label.year")}
          maxLength={4}
          name="year"
          placeholder={translate("filter.yearPlaceholder")}
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
            {translate("label.type")}
          </Typography>
          <div className="flex gap-6">
            <Checkbox
              checked={values.movie}
              label={translate("label.movie")}
              onChange={() => setFieldValue("movie", !values.movie)}
            />
            <Checkbox
              checked={values.series}
              label={translate("label.series")}
              onChange={() => setFieldValue("series", !values.series)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({ initialValues, onClose, onFilterChange }) => (
  <NeetoUIForm
    formProps={{ noValidate: true }}
    formikProps={{
      initialValues: initialValues || FILTER_INITIAL_VALUES,
      validationSchema: FILTER_VALIDATION_SCHEMA,
      onSubmit: () => {},
    }}
  >
    <FilterForm onClose={onClose} onFilterChange={onFilterChange} />
  </NeetoUIForm>
);

export { FILTER_INITIAL_VALUES };

export default FilterDropdown;
