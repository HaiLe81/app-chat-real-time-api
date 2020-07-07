//routes
const auth = require("./auth.route");

// middlewares
const authMiddleware = require("../middlewares/auth");

// init rest routes
module.exports = (router) => {
  const prefix = "/api/v1";
  router.use(`${prefix}/auth`, auth);
};