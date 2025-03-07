const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
  mobileNumber: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  businessName: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: ''
  },
  backgroundImage: {
    type: String,
    default: '',
  },
  promotions: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
