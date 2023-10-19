const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        require: true,
    },
  });

const User = mongoose.model("User", userSchema);

module.exports = User;