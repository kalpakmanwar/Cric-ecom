const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment/process", processPayment);
router.get("/stripeapikey", sendStripeApiKey);

module.exports = router;
