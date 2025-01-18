export const validationRules = {
    accountTypeId: [(v) => !!v || "Account Type is required"],
    name: [(v) => !!v || "Name is required"],
    email: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) => {
        if (v?.length <= 100) return true;
        return "Email should not be greater than 100 characters";
      },
    ],
    password: [(v) => !!v || "Password is required"],
    password_confirmation: (form) => [
        (v) => !!v || "Password confirmation is required",
        (v) => v === form.password || "Passwords must match",
      ],
}