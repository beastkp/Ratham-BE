const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide with a name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide with a email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide with a password"],
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    required: false,
    default: "student",
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, role:this.role}, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = bcrypt.compare(candidatePassword,this.password)
  return isMatch;
}

module.exports = mongoose.model("User", userSchema);
