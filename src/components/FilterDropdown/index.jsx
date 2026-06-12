import { Form as NeetoUIForm } from "neetoui/formik";

import { FILTER_INITIAL_VALUES, FILTER_VALIDATION_SCHEMA } from "./constants";
import FilterForm from "./FilterForm";
import "./index.css";

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

export default FilterDropdown;
