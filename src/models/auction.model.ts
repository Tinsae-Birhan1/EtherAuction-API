const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidder: String,
  amount: Number,
  timestamp: Date,
});

export const AuctionHistory = mongoose.model('AuctionHistory', bidSchema);
