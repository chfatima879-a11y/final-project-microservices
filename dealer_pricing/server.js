const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DEALER_PRICES = {
  "Laptop": [
    { dealer: "TechZone", price: 850 },
    { dealer: "MegaMart", price: 880 },
    { dealer: "PrimeHub", price: 830 }
  ],
  "Smartphone": [
    { dealer: "TechZone", price: 650 },
    { dealer: "CityElectronics", price: 640 },
    { dealer: "PrimeHub", price: 670 }
  ],
  "Headphones": [
    { dealer: "SoundWorld", price: 150 },
    { dealer: "MegaMart", price: 160 },
    { dealer: "CityElectronics", price: 145 }
  ],
  "Office Chair": [
    { dealer: "HomeComfort", price: 220 },
    { dealer: "MegaMart", price: 235 },
    { dealer: "PrimeHub", price: 210 }
  ]
};

app.get("/", (req, res) => {
  res.json({ status: "Dealer Pricing Service Running" });
});

app.get("/dealers/:product", (req, res) => {
  const productName = decodeURIComponent(req.params.product);
  const entries = DEALER_PRICES[productName] || [];
  res.json({
    product: productName,
    dealers: entries.map((item) => item.dealer),
    prices: entries
  });
});

app.get("/prices/:product", (req, res) => {
  const productName = decodeURIComponent(req.params.product);
  const dealerName = req.query.dealer;
  const entries = DEALER_PRICES[productName] || [];

  if (dealerName && dealerName !== "ALL") {
    const found = entries.find(
      (item) => item.dealer.toLowerCase() === dealerName.toLowerCase()
    );
    return res.json({
      product: productName,
      dealer: dealerName,
      results: found ? [found] : []
    });
  }

  return res.json({
    product: productName,
    dealer: "ALL",
    results: entries
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Dealer Pricing Service listening on port ${PORT}`);
});
