const router = require('express').Router()
const channelController = require('../controller/channel.controlller')

router.post('/channels', channelController.createChannel)

router.get('/channels', channelController.getChannels)

router.patch('/channels', channelController.joinChannel)

router.get('/channels/:id', channelController.getChannelById)

module.exports = router