const axios = require("axios");
require("dotenv").config(); // Load environment variables

const CHAPA_URL =
  process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_AUTH;

if (!CHAPA_AUTH) {
  throw new Error("CHAPA_AUTH key is missing. Please set it in your .env file.");
}

// Initialize Payment
const initializePayment = async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`, // Fix: Add "Bearer " before the token
        "Content-Type": "application/json",
      },
    };

    // Chapa redirects to this URL upon success
    const CALLBACK_URL = "http://localhost:3000";

    // Generate a unique reference for the transaction
    const TEXT_REF = "tx-myecommerce12345-" + Date.now();

    // Payment data
    const data = {
      amount: req.body.amount,
      currency: "ETB",
      email: req.body.email || "ato@ekele.com", // Allow dynamic email
      first_name: req.body.first_name || "Ato",
      last_name: req.body.last_name || "Ekele",
      tx_ref: TEXT_REF,
      callback_url: CALLBACK_URL,
    };

    // Make the request to Chapa
    const response = await axios.post(CHAPA_URL, data, config);

    res.json({
      checkout_url: response.data.data.checkout_url,
      reference: TEXT_REF,
    });

    console.log("Payment initialized:", response.data);
  } catch (error) {
    console.error("Payment initialization error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to initialize payment" });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
      },
    };

    const transactionId = req.params.id;
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${transactionId}`,
      config
    );

    res.json({
      message: "Payment verified successfully",
      data: response.data,
    });

    console.log("Payment verification:", response.data);
  } catch (error) {
    console.error("Payment verification error:", error.response?.data || error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};

module.exports = { initializePayment, verifyPayment };
