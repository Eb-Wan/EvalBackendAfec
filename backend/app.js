const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const app = express();

const Exeption = require("./classes/exeption");
const errorMiddleware = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const cloudinaryConfig = require("./config/cloudinary");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

connectDB();
cloudinaryConfig();

const accessLogStream = fs.createWriteStream("./logs/access.log", { flags: 'a' })

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials:true }));
app.use(helmet());
app.use(morgan("common", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/settings", settingsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT;
if (PORT) app.listen(PORT, () => console.log("Server is listening on port", PORT));
else {
    console.error(new Exeption("Dotenv is not setup"));
    process.exit(1);
}