// Load Env Variables
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// Import Mongoose for mongoDB
const mongoose = require('mongoose');

async function connectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to Database");
    } catch (err){
        console.log(err);
    }
    
}

module.exports = connectToDb;