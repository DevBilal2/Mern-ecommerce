const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, fullName, password: hashedPassword });
    await newUser.save();
    console.log("successfull");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fix: Use fullName instead of username
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    req.session.user = { id: user._id, email: user.email };
    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Logout User
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// Get Current User
router.get("/me", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ error: "Not authenticated" });
  res.json(req.session.user);
});

module.exports = router;
