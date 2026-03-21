const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static("public"));

// MongoDB connection (Docker)
mongoose.connect("mongodb://localhost:27017/contactDB")
.then(() => console.log("MongoDB connected 🐳"))
.catch(err => console.log("Mongo error:", err));

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
    res.sendFile(path.join(__dirname, "index.html"));
});

// Route: Handle contact form
app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message, budget, timeline } = req.body;

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

// Start server on 5050
app.listen(5050, () => {
    console.log("Server running on http://localhost:5050 🔥");
});