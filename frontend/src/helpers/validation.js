export const validate = (values, validationSchema) => {
  const errors = {};

  const printErrors = (field) => {
    const property = field[0];
    const value = field[1];

    const options = {
      required: value.hasOwnProperty("required"),
      pattern: value.hasOwnProperty("pattern"),
      matches: value.hasOwnProperty("matches"),
    };

    const required = value.required;
    const pattern = value.pattern;
    const matches = value.matches;

    if (
      options.required &&
      !values[property] &&
      required.value &&
      typeof required.message === "string"
    ) {
      errors[property] = required.message;
    }

    if (
      options.pattern &&
      values[property] &&
      pattern.value &&
      ((pattern.value instanceof RegExp &&
        !pattern.value.test(values[property])) ||
        (pattern.value instanceof Function &&
          !pattern.value(values[property]))) &&
      typeof pattern.message === "string"
    ) {
      errors[property] = pattern.message;
    }

    if (
      options.matches &&
      matches.value &&
      validationSchema.hasOwnProperty(matches.value) &&
      values[property] &&
      values[matches.value] !== values[property] &&
      typeof matches.message === "string"
    ) {
      errors[property] = matches.message;
    }
  };

  Object.entries(validationSchema).forEach((field) => printErrors(field));

  return errors;
};
