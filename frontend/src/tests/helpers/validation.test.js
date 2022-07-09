import { validate } from "../../helpers/validation";
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
  PASSWORDS_DIFFERENT,
} from "../../constants/validation/errors";
import {
  USERNAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from "../../constants/validation/patterns";

const validationSchema = {
  name: {
    required: {
      value: true,
      message: USERNAME_REQUIRED,
    },
    pattern: {
      value: USERNAME_PATTERN,
      message: USERNAME_INVALID,
    },
  },
  email: {
    required: {
      value: true,
      message: EMAIL_REQUIRED,
    },
    pattern: {
      value: EMAIL_PATTERN,
      message: EMAIL_INVALID,
    },
  },
  password: {
    required: {
      value: true,
      message: PASSWORD_REQUIRED,
    },
    pattern: {
      value: PASSWORD_PATTERN,
      message: PASSWORD_INVALID,
    },
  },
  confirmPassword: {
    required: {
      value: true,
      message: PASSWORD_REQUIRED,
    },
    matches: {
      value: "password",
      message: PASSWORDS_DIFFERENT,
    },
  },
};

describe("validates the form", () => {
  it("returns messages of the type required for empty values", () => {
    const values = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const errors = {
      name: USERNAME_REQUIRED,
      email: EMAIL_REQUIRED,
      password: PASSWORD_REQUIRED,
      confirmPassword: PASSWORD_REQUIRED,
    };
    expect(validate(values, validationSchema)).toEqual(errors);
  });
  it("returns messages of the type invalid for values that don't match the given pattern", () => {
    const values = {
      name: "John1",
      email: "john@gmail.com/",
      password: "123456",
      confirmPassword: "123456",
    };
    const errors = {
      name: USERNAME_INVALID,
      email: EMAIL_INVALID,
      password: PASSWORD_INVALID,
    };
    expect(validate(values, validationSchema)).toEqual(errors);
  });
  it("returns message of the type matches for value, whose input field does not match the value of another given input field", () => {
    const values = {
      name: "John",
      email: "john@gmail.com",
      password: "john1234",
      confirmPassword: "123456",
    };
    const errors = {
      confirmPassword: PASSWORDS_DIFFERENT,
    };
    expect(validate(values, validationSchema)).toEqual(errors);
  });
  it("returns no errors if all values match the validation criteria of their input fields", () => {
    const values = {
      name: "John",
      email: "john@gmail.com",
      password: "john1234",
      confirmPassword: "john1234",
    };
    expect(validate(values, validationSchema)).toEqual({});
  });
});
