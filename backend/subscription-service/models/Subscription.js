const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  autoRenew: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
