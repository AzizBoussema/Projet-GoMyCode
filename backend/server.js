const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const cors = require("cors");

// ---------APP SETUP--------
const app = express();

// Options CORS pour la production
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// ---------DATABASE--------
connectDB();

// ---------ROUTES--------
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/restaurants", require("./routes/restaurant.route"));
app.use("/api/products", require("./routes/product.route"));
app.use("/api/orders", require("./routes/order.route"));
app.use((req, res) => res.send("API IS RUNNING"));
// ---------SERVER--------
const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Le serveur est sur le : http://localhost:${PORT}`);
});
