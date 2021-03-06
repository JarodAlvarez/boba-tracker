const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
  return token;
};

// const checkPassword = async (req, res, next) => {
//   const { password, username } = req.body;
//   const user = await User.findOne({ username });
//   if (user.password !== password) {
//     return res.status(401).send({ message: "Incorrect password" });
//   } else next();
// };

const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).send({ message: "Invalid Token" });
      next();
    });
  } else return res.status(401).send({ message: "Couldn't find token" });
};

// const isAdmin = (req, res, next) => {
//   if ((req.body.user && req.body.user.isAdmin) || req.query.isAdmin) {
//     return next();
//   }
//   return res.status(401).send({ message: "This is not an admin" });
// };

module.exports = { createToken, isAuthenticate };
