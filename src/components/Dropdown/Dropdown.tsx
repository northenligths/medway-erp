import { Field } from "formik";
import React from "react";

const Dropdown = ({ name, className, children }) => {
  return (
    <Field as="select" name={name} className={className}>
      {children}
    </Field>
  );
};

export default Dropdown;
