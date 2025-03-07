const express = require('express');
const { loginUser, registerUser, getUser,decodeToken } = require('../Controllers/UserController');

const router = express.Router()



router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/:id',getUser)
router.post('/decode/:token',decodeToken)

module.exports = router;