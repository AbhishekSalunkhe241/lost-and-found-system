// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;
const SECRET = "lostfoundsecret";

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= MONGODB =================
mongoose.connect("mongodb://127.0.0.1:27017/lostfound")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// ================= MULTER =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ================= SCHEMAS =================

// USER
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// LOST
const lostSchema = new mongoose.Schema({
    name: String,
    category: String,
    date: { type: Date, default: Date.now },
    location: String,
    contact: String,
    photo: String,
    status: { type: String, default: "Pending" }
});
const Lost = mongoose.model("Lost", lostSchema);

// FOUND
const foundSchema = new mongoose.Schema({
    name: String,
    category: String,
    date: { type: Date, default: Date.now },
    location: String,
    photo: String
});
const Found = mongoose.model("Found", foundSchema);

// ================= HELPER FUNCTION =================
const deleteImage = (filename) => {
    if (!filename) return;

    const filePath = path.join(__dirname, "uploads", filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.log("Image delete error:", err.message);
        } else {
            console.log("Image deleted:", filename);
        }
    });
};

// ================= TEST =================
app.get("/", (req, res) => {
    res.send("Lost & Found API is running 🚀");
});

// ================= AUTH =================

// REGISTER
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashed });
        await user.save();

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ================= LOST =================

// GET LOST
app.get("/lost", async (req, res) => {
    const data = await Lost.find();

    const updated = data.map(item => ({
        ...item._doc,
        imageUrl: item.photo
            ? `http://localhost:${PORT}/uploads/${item.photo}`
            : null
    }));

    res.json(updated);
});

// ADD LOST
app.post("/lost", upload.single("photo"), async (req, res) => {
    try {
        const item = new Lost({
            name: req.body.name,
            category: req.body.category,
            date: req.body.date,
            location: req.body.location,
            contact: req.body.contact,
            photo: req.file ? req.file.filename : null
        });

        await item.save();
        res.json(item);

    } catch (err) {
        res.status(500).json({ message: "Error saving lost item" });
    }
});

// DELETE LOST (WITH IMAGE DELETE)
app.delete("/lost/:id", async (req, res) => {
    try {
        const item = await Lost.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        deleteImage(item.photo);

        await Lost.findByIdAndDelete(req.params.id);

        res.json({ message: "Lost item + image deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// MARK AS FOUND
app.post("/lost/markfound/:id", async (req, res) => {
    try {
        const lostItem = await Lost.findById(req.params.id);

        if (!lostItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        const foundItem = new Found({
            name: lostItem.name,
            category: lostItem.category,
            date: new Date(),
            location: lostItem.location,
            photo: lostItem.photo
        });

        await foundItem.save();
        await Lost.findByIdAndDelete(req.params.id);

        res.json({ message: "Moved to Found" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ================= FOUND =================

// GET FOUND
app.get("/found", async (req, res) => {
    const data = await Found.find();

    const updated = data.map(item => ({
        ...item._doc,
        imageUrl: item.photo
            ? `http://localhost:${PORT}/uploads/${item.photo}`
            : null
    }));

    res.json(updated);
});

// ADD FOUND
app.post("/found", upload.single("photo"), async (req, res) => {
    try {
        const item = new Found({
            name: req.body.name,
            category: req.body.category,
            date: req.body.date,
            location: req.body.location,
            photo: req.file ? req.file.filename : null
        });

        await item.save();
        res.json(item);

    } catch (err) {
        res.status(500).json({ message: "Error saving found item" });
    }
});

// DELETE FOUND (WITH IMAGE DELETE)
app.delete("/found/:id", async (req, res) => {
    try {
        const item = await Found.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        deleteImage(item.photo);

        await Found.findByIdAndDelete(req.params.id);

        res.json({ message: "Found item + image deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});