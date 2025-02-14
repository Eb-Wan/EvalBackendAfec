const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to DB"))
.catch(error => {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
});

module.exports = connectDB;