const mongoose = require("mongoose");

const skillSchema = mongoose.Schema ({
    userid: { type: mongoose.Schema.ObjectId, index: true },
    title: { type: String, require: true },
    category: { type: String, require: true },
    level: { type: String, enum: ["Débutant", "Intermédiaire", "Expert"] },
    imgurl: { type: String, require: true },
    imgid: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model("skills", skillSchema);