const { v2: cloudinary } = require("cloudinary");

const cloudinaryConfig = () => {
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_KEY, 
            api_secret: process.env.CLOUDINARY_SECRET
        });
    } catch (error) {
        console.error(error)
    }
};

module.exports = cloudinaryConfig;