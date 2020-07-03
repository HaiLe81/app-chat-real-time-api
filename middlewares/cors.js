const cors = require("cors");
const {env} = require('../config/globals')
let whitelist = [env.CLIENT_APP_URL]

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
const middleware = cors(corsOptions)
module.exports = middleware
