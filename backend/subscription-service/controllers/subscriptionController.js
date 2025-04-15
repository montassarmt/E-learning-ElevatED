const Subscription = require('../models/Subscription');

// Créer un abonnement
exports.createSubscription = async (req, res) => {
  try {
    const { userId, plan, endDate, autoRenew } = req.body;
    const subscription = await Subscription.create({ userId, plan, endDate, autoRenew });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un abonnement par userId
exports.getSubscriptionByUser = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId });
    if (!subscription) return res.status(404).json({ message: 'Aucun abonnement trouvé' });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Renouveler un abonnement
exports.renewSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId });
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });

    subscription.endDate = new Date(new Date(subscription.endDate).setMonth(new Date(subscription.endDate).getMonth() + 1));
    subscription.isActive = true;
    await subscription.save();

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
