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

module.exports = { validateSignup };
