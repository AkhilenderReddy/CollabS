const express = require('express');
const { getInfluencers, getInfluencer, addReview, getReviews, updateInfluencer } = require('../Controllers/InfluencerController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();


router.get('/',getInfluencers);
router.get('/:id',getInfluencer);
router.post('/:id/reviews',authMiddleware,addReview);
router.get('/:id/reviews',getReviews);
router.patch('/:id/edit',authMiddleware,updateInfluencer);

module.exports = router