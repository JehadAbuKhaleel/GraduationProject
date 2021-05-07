export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const phoneValidator = (phone) => {
  
  if (!phone) return "Phone cannot be empty.";
  if (phone.length < 10) return "Ooops! We need a valid phone number.";

  return "";
};

export const passwordValidator = (password) => {
  const ch = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!password || password.length <= 0) return "Password cannot be empty.";
  if (!ch.test(password)) return "password should contain at least one number and one special character";

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};
