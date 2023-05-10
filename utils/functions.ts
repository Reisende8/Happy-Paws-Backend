export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.match(emailRegex)) {
    return true;
  }
  return false;
};

//The password must have at least 8 characters, must contain at least one uppercase letter,
//one lowercase letter, one digit, and one special character.
export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\da-zA-Z]).{8,}$/;
  if (password.match(passwordRegex)) {
    return true;
  }
  return false;
};

export const checkPasswordMatch = (
  password: string,
  repeatPassword: string
) => {
  return password !== repeatPassword;
};
