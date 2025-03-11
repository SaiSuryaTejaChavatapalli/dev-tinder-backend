const ACCESS_TOKEN_EXPIRY = "1m"; // Short-lived token
const REFRESH_TOKEN_EXPIRY = "7d"; // Longer-lived token
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "skills",
  "about",
];

module.exports = {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_SECRET,
  REFRESH_SECRET,
  USER_SAFE_DATA,
};
