const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

export const passwordRules = [
  {
    label: "At least 8 characters",
    test: (p: string) => p.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (p: string) => /[A-Z]/.test(p),
  },
  {
    label: "One lowercase letter",
    test: (p: string) => /[a-z]/.test(p),
  },
  {
    label: "One number",
    test: (p: string) => /[0-9]/.test(p),
  },
  {
    label: "One special character",
    test: (p: string) => /[!@#$%^&*]/.test(p),
  },
];

export default isValidEmail;
