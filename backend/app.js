const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const Exeption = require("./classes/exeption");
const errorMiddleware = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const cloudinaryConfig = require("./config/cloudinary");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoute");

connectDB();
cloudinaryConfig();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/skill", skillRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT;
if (PORT) app.listen(PORT, () => console.log("Server is listening on port", PORT));
else {
    console.error(new Exeption("Dotenv is not setup"));
    process.exit(1);
}