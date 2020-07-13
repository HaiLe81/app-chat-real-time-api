const router = require('express').Router()
const userController = require('../controller/user.controller')

router.get('/users/:id/checkJoinChannel/:channelId', userController.checkUserJoinedChannel)

module.exports = router