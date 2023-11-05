const User = require("../models/User");

const signup = async (req, res) => {
  try {
    console.log("I am here");
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });
    // const {password:pass,...rest} = user._doc;

    const token = user.createJWT();

    const { password: pass, ...rest } = user._doc;
    res.status(201).json({ rest, token });
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(200).send("Please signup first");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(401).send("You are not authorized");
    }

    const token = user.createJWT();

    const { password: pass, ...rest } = user._doc;
    res.status(201).json({ rest, token });
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error");
  }
};

module.exports = { signup, login };
