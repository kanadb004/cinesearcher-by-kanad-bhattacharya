import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const FILTER_INITIAL_VALUES = {
  year: "",
  movie: true,
  series: true,
};

export const CURRENT_YEAR = dayjs().year();

export const FILTER_VALIDATION_SCHEMA = yup.object().shape({
  year: yup.string().test(
    "valid-year-range",
    t("filter.yearValidation", {
      maxYear: CURRENT_YEAR + 2,
    }),
    value => {
      if (!value || value.length < 4) return true;

      const num = parseInt(value, 10);

      return num >= 1900 && num <= CURRENT_YEAR + 2;
    }
  ),
});
