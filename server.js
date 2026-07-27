// ================= IMPORTS =================
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= LOGIN PAGE =================
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ================= LOST PAGE =================
app.get("/lost", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "lost.html"));
});

// ================= FOUND PAGE =================
app.get("/found", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "found.html"));
});

// ================= ADMIN PAGE =================
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ================= SUCCESS PAGE =================
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "success.html"));
});

// ================= 404 PAGE =================
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});