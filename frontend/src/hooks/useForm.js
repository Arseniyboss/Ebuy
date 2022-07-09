import { useState, useEffect } from "react";
import { validate } from "../helpers/validation";

export const useForm = (initialState, callback, validationSchema) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema && setErrors(validate(values, validationSchema));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback]);

  return { values, setValues, errors, handleChange, handleSubmit };
};
