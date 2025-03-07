const express = require('express');
const { getClients, updateClientProfile, getClient } = require('../Controllers/ClientController');
const authMiddleware = require('../Middleware/authMiddleware');


const router = express.Router();


router.get('/',getClients);
router.get('/:id',getClient)
router.patch('/:id',authMiddleware,updateClientProfile);

module.exports = router; 