const router = require('express').Router()
const messageController = require('../controller/message.controller')

router.post('/messages', messageController.sendMessage)

router.get('/messages/:channelId', messageController.getMessageByChannelId)

module.exports = router