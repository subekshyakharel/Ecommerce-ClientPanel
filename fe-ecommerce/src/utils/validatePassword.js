export const validator = (password = "", confirmPassword = "") => {
  const error = [];

  //   password.length < 6 &&
  //     error.push("Password must contain at least 6 characters");

  //   !/[A-Z]/.test(password) &&
  //     error.push("Password must contain at least one UPPERCASE letter");

  //   !/[a-z]/.test(password) &&
  //     error.push("Password must contain at least one lowercase letter");

  //   !/[0-9]/.test(password) &&
  //     error.push("Password must contain at least one number");

  //   !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) &&
  //     error.push("Password must contain at least one special character");

  password !== confirmPassword && error.push("Passwords do not match");

  return error;
};
