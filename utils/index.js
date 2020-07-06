const bcrypt = require("bcrypt");

const Exception = function Exception(message, statusCode) {
  this.message = message;
  this.statusCode = statusCode;
};
const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, 10);
};
/**
 *
 * @param {string} hashedPassword
 * @param {string} plainPassword
 */
const verifyPassword = (hashedPassword, plainPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  Exception,
  hashPassword,
  verifyPassword
};
