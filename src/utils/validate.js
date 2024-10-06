const validator = require("validator");

const validateSignup = (request) => {
  const { firstName, lastName, emailId, password } = request.body;
  if (!firstName || !lastName) {
    throw new Error("Name not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validateProfileEditData = (request) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(request.body).every((item) =>
    allowedEditFields.includes(item)
  );
  return isEditAllowed;
};

module.exports = { validateSignup, validateProfileEditData };
