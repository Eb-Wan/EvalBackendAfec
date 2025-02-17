const mongoose = require("mongoose");

const settingModel = mongoose.Schema ({
    userid: { type: mongoose.Schema.ObjectId, index: true },
    acceptsCookies: { type: Boolean, default: false }
});

module.exports = mongoose.model("settings", settingModel);