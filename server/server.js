const express = require("express");
const cors = require("cors");
const adminAuthRoutes = require("./routes/adminAuth");
require("dotenv").config();

const mongoose = require("mongoose");
const Appointment = require("./models/Appointment");
const jwt = require("jsonwebtoken");
const app = express();

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔐 Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();
    } catch (error) {
    console.error("❌ JWT verification error:", error.message);

    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token.",
    });
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminAuthRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🍃 MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Smart Clinic API is running 🚀",
  });
});


// Create appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const {
      name,
      phone,
      age,
      concern,
      date,
      time,
      message,
    } = req.body;

    // Basic validation
    if (!name || !phone || !age || !concern || !date || !time) {
      return res.status(400).json({
        status: "error",
        message: "Please fill all required fields.",
      });
    }

    const appointment = new Appointment({
      name,
      phone,
      age,
      concern,
      date,
      time,
      message,
    });

    await appointment.save();

    console.log("📋 New appointment saved:");
    console.log(appointment);

    res.status(201).json({
      status: "success",
      message: "Appointment booked successfully! 🎉",
      appointment,
    });
  } catch (error) {
    console.error("❌ Appointment error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Unable to save appointment.",
    });
  }
});

// Get all appointments
app.get(
  "/api/appointments",
  authenticateAdmin,
  async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    res.json({
      status: "success",
      appointments,
    });
  } catch (error) {
    console.error("❌ Fetch appointments error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Unable to fetch appointments.",
    });
  }
});

// Update appointment status
app.patch(
  "/api/appointments/:id/status",
  authenticateAdmin,
  async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid appointment status.",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: "Appointment not found.",
      });
    }

    res.json({
      status: "success",
      message: `Appointment ${status.toLowerCase()} successfully.`,
      appointment,
    });
  } catch (error) {
    console.error("❌ Update status error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Unable to update appointment status.",
    });
  }
});
// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Smart Clinic server running on http://localhost:${PORT}`
  );
});