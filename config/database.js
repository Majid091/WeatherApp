const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async(req, res)=>{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database is connected successfully....");
    }
    catch(error)
    {
        console.error(error);
        process.exit(1);
    }
}


module.exports = connectDB;