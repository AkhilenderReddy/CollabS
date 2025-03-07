const Influencer = require('../Models/InfluencerModel');
const HttpError = require('../Models/errorModel');
const Client = require('../Models/ClientModel');


const getInfluencers = async(req,res,next)=>{
    try {
        const influencers = await Influencer.find();
        if(!influencers){
            return res.status(200).json("No Influencers found")
        }
        return res.status(200).json(influencers);
    } catch (error) {
        return next(new HttpError("Error fetching Influencers.",500));
    }
}

const getInfluencer = async(req,res,next)=>{
    try {
        const influencerId = req.params.id;
        const influencer = await Influencer.findById(influencerId);
        if(!influencer){
            return res.status(200).json("no influencers to show");
        }
        return res.status(200).json(influencer);
    } catch (error) {
        return next(new HttpError("Error fetching influencer.",500));
    }
}

const addReview = async(req,res,next)=>{
    try {
        const influencerId = req.params.id;
    const { clientId, rating, comment } = req.body;

    if(!rating){
        return next(new HttpError("Provide rating.",400))
    }
    
    const clientExists = await Client.findById(clientId);
    if(!clientExists){
        return res.status(404).json("You can not add review.");
    }
    const influencer = await Influencer.findById(influencerId);
    const newReview = {
        clientId,
        rating,
        comment
    };

    if(!influencer){
        return res.status(404).json("Influencer not found.");
    }

    influencer.reviews.push(newReview);
    await influencer.save();
    return res.status(201).json({newReview,message:"Review added successfully."});
    } catch (error) {
        return next(new HttpError("error adding review try again.",500));
    }
}

const getReviews = async(req,res,next)=>{
    try {
        const influencerId = req.params.id;
        const influencer = await Influencer.findById(influencerId).populate('reviews.clientId', 'username _id profilePicture');
        if (!influencer) {
          return res.status(404).json({ message: 'Influencer not found' });
        }
        const sortedReviews = influencer.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.status(200).json(sortedReviews);
      } catch (error) {
        return next(new HttpError(error));
      }
}

const updateInfluencer = async(req,res,next)=>{
    const influencerId = req.params.id;
    const { username, email, name, bio, profilePicture, socialMediaLinks, categories } = req.body;

    try {
        const updatedInfluencer = await Influencer.findByIdAndUpdate(
            influencerId,
            {
                username,
                email,
                name,
                bio,
                profilePicture,
                socialMediaLinks,
                categories,
            },
            { new: true, runValidators: true }
        );
        
        if (!updatedInfluencer) {
            return res.status(404).json({ message: 'Influencer not found' });
        }

        res.status(200).json({ message: 'Influencer updated successfully', influencer: updatedInfluencer });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
}

module.exports = {getInfluencers, getInfluencer,addReview,getReviews,updateInfluencer};
