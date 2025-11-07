type ValidationRule = (v: string) => boolean | string;
type FormValidationRules<T> = { [K in keyof T]: ValidationRule[] | ((form: T) => ValidationRule[]) };

export const validationRules: FormValidationRules<ValidationForm> = {
  accountTypeId: [(v) => !!v || "Account Type is required"],
  name: [(v) => !!v || "Name is required"],
  email: [
    (v) => !!v || "Email is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    (v) => v.length <= 100 || "Email should not be greater than 100 characters",
  ],
  password: [(v) => !!v || "Password is required"],
  passwordConfirmation: (form) => [
    (v) => !!v || "Password confirmation is required",
    (v) => v === form.password || "Passwords must match",
  ],
};
