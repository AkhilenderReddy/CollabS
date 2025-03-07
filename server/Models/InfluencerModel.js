const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: String,
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  socialMediaLinks: {
    youtube: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    }
  },
  reviews: [
    {
      clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
      rating: { type: Number, required: true },
      comment: { type: String, default: '' },
      date: { type: Date, default: Date.now }
    }
  ],
  categories: [
    {
      type: String,
    }
  ],
  promotions: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const Influencer = mongoose.model('Influencer', influencerSchema);
module.exports = Influencer;
