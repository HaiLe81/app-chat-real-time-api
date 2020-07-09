const router = require('express').Router()
const channelController = require('../controller/channel.controlller')

router.post('/channels', channelController.createChannel)
router.get('/channels', channelController.getChannels)

module.exports = router