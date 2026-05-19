require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");

require("./models/Site");
require("./models/Attendance");
require("./models/Transaction");

const authRoutes = require("./routes/authRoutes");
const siteRoutes = require("./routes/siteRoutes");
const managerRoutes = require("./routes/managerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

// ✅ FIX 1: Explicit CORS Configuration for Production Deployment
app.use(cors({
  origin: [
    "https://gradina.vercel.app",                 // Your live Vercel frontend link
    "https://gradina-1hsnecbge-misriyas-projects.vercel.app", // Your Vercel preview link (from screenshot)
    "http://localhost:5173"                       // Your local development frontend link
  ],
  credentials: true,                              // Allows login sessions / tokens to pass smoothly
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/stats", statsRoutes);

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      username: "admin",
    });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        "admin123",
        salt
      );

      await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Default Admin Seeded");
    }

  } catch (error) {
    console.error("Error seeding admin", error);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedAdmin();

  // ✅ FIX 2: Dynamic console logging so you don't look for localhost on production
  app.listen(PORT, () => {
    console.log(`Server successfully initialized and listening on port: ${PORT}`);
  });
});