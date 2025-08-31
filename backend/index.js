require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(express.urlencoded({ extended: true })); // Add this line
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Sample Route
const likeRoutes = require("./routes/likedProducts");
app.use("/api/likes", likeRoutes);
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

const addressRoutes = require("./routes/addresses");
app.use("/api/addresses", addressRoutes);
const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);
app.get("/", (req, res) => {
  res.send("MERN Backend Running...");
});
const path = require("path");

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
