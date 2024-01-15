import { Field } from "formik";
import React from "react";

const TextField = ({ type, name, placeholder, className }) => {
  return (
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TextField;
