//routes
const auth = require("./auth.route");
const channel = require("./channel.route");
const message = require("./message.route");
const user = require("./user.route");

// middlewares
const authMiddleware = require("../middlewares/auth");

// init rest routes
module.exports = (router) => {
  const prefix = "/api/v1";
  router.use(`${prefix}/auth`, auth);
  router.use(`${prefix}`, authMiddleware.isAuthorized, channel);
  router.use(`${prefix}`, authMiddleware.isAuthorized, message);
  router.use(`${prefix}`, authMiddleware.isAuthorized, user);
};