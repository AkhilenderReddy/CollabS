const Client = require('../Models/ClientModel');
const HttpError = require('../Models/errorModel');
const Influencer = require('../Models/InfluencerModel');
const Promotion = require('../Models/PromotionModel');

const createPromotion = async (req, res,next) => {
  const { promotionName,clientId, twitter, instagram, youtube } = req.body;
  const influencerId = req.user.id;

  if(!clientId || !twitter || !instagram || !youtube){
    return next(new HttpError("Fill in all the details.",401))
  }

  try {
    const newPromotion = new Promotion({ 
      promotionName,
      influencerId,
      clientId,
      twitter,
      instagram,
      youtube,
    });
    console.log(newPromotion)

    const savedPromotion = await newPromotion.save();
    const influencer = await Influencer.findById(influencerId);
    const client = await Client.findById(clientId);
    const clientPromotions = client.promotions + 1;
    const influencerPromotions = influencer.promotions + 1;
    await Client.findByIdAndUpdate(clientId,{promotions: influencerPromotions});
    await Influencer.findByIdAndUpdate(influencerId,{promotions: clientPromotions});
    return res.status(201).json({savedPromotion,message: "Promotion added successfully."});
  } catch (error) {
    return next(new HttpError("Error creating promotion.",500))  
  }
}; 

const getPromotions = async(req,res,next)=>{
    try {
        let promotions = await Promotion.find().sort({createdAt: -1}).populate('clientId','username profilePicture businessName').populate('influencerId', 'username profilePicture name');;
        if(!promotions){
            return next(new HttpError("No promotions to show.",404));
        }
        return res.status(200).json(promotions);
    } catch (error) {
        console.log("error fetching promotions.")
    }
}

const deletePromotion = async (req, res,next) => {   // decrement the promotions for client and influencer.
  const promotionId = req.params.id;

  try {
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return next(new HttpError("Promotion not found.",404)); 
    }

    if (promotion.influencerId.toString() !== req.user.id) { 
      return next(new HttpError("Unauthorized action.",403))
    }

    await Promotion.findOneAndDelete({
      _id: promotionId,
      influencerId: req.user.id,
    });
    res.status(200).json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    return next(new HttpError("Error deleting promotion.",500));
  }
};

const updatePromotion = async (req, res,next) => {
  const promotionId = req.params.id;
  const {promotionName,clientId, twitter, instagram, youtube } = req.body;

  try {
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return next(new HttpError("Promotion not found.",404))
    } 

    if (promotion.influencerId.toString() !== req.user.id) {
      return next(new HttpError("Unauthorized action.",403))
    }

    const updatedPromotion = await Promotion.findByIdAndUpdate(
      promotionId,
      {promotionName,clientId, twitter, instagram, youtube },
      { new: true, runValidators: true }
    );

    return res.status(200).json({updatedPromotion,message: "Promotion updated successfully."});
  } catch (error) {
    return next(new HttpError("Error Updating promotion.",500))
  }
};


module.exports = {createPromotion,getPromotions,deletePromotion,updatePromotion};