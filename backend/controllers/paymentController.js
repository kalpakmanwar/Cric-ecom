const asyncWrapper = require("../middleWare/asyncWrapper");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process the payment
exports.processPayment = asyncWrapper(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount, // amount should be passed from frontend in paise
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

// Send STRIPE API key to frontend
exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
