const express = require('express');
const { createPromotion, getPromotions, updatePromotion, deletePromotion } = require('../Controllers/PromotionController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();


router.post('/',authMiddleware,createPromotion);
router.get('/',getPromotions);
router.patch('/:id',authMiddleware,updatePromotion);
router.delete('/:id',authMiddleware,deletePromotion);

module.exports = router;