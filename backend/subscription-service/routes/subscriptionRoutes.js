const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getSubscriptionByUser,
  renewSubscription
} = require('../controllers/subscriptionController');

router.post('/', createSubscription);
router.get('/:userId', getSubscriptionByUser);
router.put('/renew/:userId', renewSubscription);

module.exports = router;
