export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character (!@#$%^&*)";
  }
  return "";
};

export const validateUsername = (username: string) => {
  const trimmedUsername = username.trim();
  if (!trimmedUsername) {
    return "Username is required";
  }
  if (trimmedUsername.length < 3) {
    return "Username must be at least 3 characters long";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};

export const validateOTP = (otp: string[]) => {
  if (otp.some(digit => !digit)) {
    return "Please enter all digits of the verification code";
  }
  if (otp.some(digit => !/^\d$/.test(digit))) {
    return "Verification code can only contain numbers";
  }
  return "";
}; 