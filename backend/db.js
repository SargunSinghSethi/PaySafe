const mongoose = require("mongoose");
const { MongoDB_Key } = require("./config");
mongoose.connect(MongoDB_Key);
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
    maxLength: 60,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 8,
    maxLength: 30,
  },
  lastName: {
    type: String,
    require: true,
    maxLength: 60,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
