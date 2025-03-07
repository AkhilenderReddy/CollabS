const express = require('express')
const { createChat, userChats, findChat } = require('../Controllers/ChattController')
const authMiddleware = require('../Middleware/authMiddleware')

const router = express.Router()



router.post('/',authMiddleware,createChat)
router.get('/:userId',authMiddleware,userChats)
router.get('/find/:firstId/:secondId',authMiddleware,findChat) 

module.exports = router;