const mongoose = require('mongoose');
const { Schema } = mongoose;

const promotionSchema = new Schema({
  promotionName:{
    type: String,
    default: ''
  },
  influencerId: {
    type: Schema.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  twitter: { 
    url: {
      type: String,  
    },
    postType: {
      type: String,
      enum: ['post', 'video'],
    },
  },
  instagram: {
    url: {
      type: String,
    },
    postType: {
      type: String,
      enum: ['post', 'reel'],
    },
  },
  youtube: {
    url: {
      type: String,
    },
    postType: {
      type: String,
      enum: ['short', 'video'],
    },
  },
},{timestamps: true});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
