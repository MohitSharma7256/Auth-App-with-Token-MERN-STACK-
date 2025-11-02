const mongoose = require('mongoose');

//make a connection with mongoDb database localy 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is now Connected");
    } catch (error) {
        console.log("MongoDB Connection is Failed due to:", error.message)
        process.exit(1)
    }
};

module.exports = connectDB