require('dotenv').config()
module.exports = {
	env: {
		PORT: process.env.PORT || 8080,
		MONGODB_CONNECT_URI: process.env.NODE_ENV === 'production' ? process.env.MONGODB_CONNECT_URI : 'mongodb://localhost:27017/qrcode',
		NODE_ENV: process.env.NODE_ENV || 'development',
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY|| 'test',
		CLIENT_APP_URL: process.env.CLIENT_APP_URL || 'http://localhost:3000'
	},
	statusCodes: {
		OK: 200,
		BAD_REQUEST: 400,
		NOT_FOUND: 404,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403 
	}
};