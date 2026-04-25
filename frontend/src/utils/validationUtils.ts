const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};
export default isValidEmail;
