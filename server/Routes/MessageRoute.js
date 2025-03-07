const express = require('express');
const { addMessage, getMessages } = require('../Controllers/MessageController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();


router.post('/',authMiddleware,addMessage)
router.get('/:chatId',authMiddleware,getMessages)


module.exports = router;