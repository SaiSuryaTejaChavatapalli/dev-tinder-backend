const adminAuth = (req, res, next) => {
  console.log("ADMIN Authentication middleware called");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("UnAuthorized!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("USER Authentication middleware called");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("UnAuthorized!");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
