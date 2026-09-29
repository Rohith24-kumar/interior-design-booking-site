require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static("public"));

// MongoDB connection (uses MONGODB_URI from environment / .env file)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/contactDB";

mongoose.connect(MONGODB_URI, {
    dbName: process.env.DB_NAME || "nordic_designs",
    serverSelectionTimeoutMS: 8000   // fail fast instead of hanging the request
})
.then(() => console.log("MongoDB connected 🐳"))
.catch(err => console.error("Mongo connection error:", err.message));

// Return a clear JSON error if the DB is not connected (readyState 1 = connected)
function requireDb(req, res, next) {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            message: "Database is not connected right now. Please try again shortly."
        });
    }
    next();
}

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    budget: Boolean,
    timeline: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

// Route: Serve homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route: Handle contact form
app.post(["/contact", "/api/contact"], requireDb, async (req, res) => {
    try {
        const { name, email, phone, subject, message, budget, timeline } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are required." });
        }

        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            budget,
            timeline
        });

        await newContact.save();

        res.status(200).json({ message: "Data saved successfully 🚀" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving data" });
    }
});

// Schema: quote requests (modal on index.html)
const quoteSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    budget: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Quote = mongoose.model("Quote", quoteSchema);

// Route: Handle quote requests
app.post("/api/quote", requireDb, async (req, res) => {
    try {
        const { name, email, phone, service, budget, description } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required." });
        }

        await new Quote({ name, email, phone, service, budget, description }).save();

        res.status(201).json({ message: "Quote request received! We'll contact you shortly. 🎉" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving quote request" });
    }
});

// Health check (open /health in a browser to see if the server + DB are up)
app.get("/health", (req, res) => {
    res.json({ server: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// Always answer unknown POST/API routes with JSON (never HTML)
app.use((req, res, next) => {
    if (req.method !== "GET") return res.status(404).json({ message: "Route not found" });
    next();
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error" });
});

// Start server (Render provides PORT; falls back to 5050 locally)
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🔥`);
});