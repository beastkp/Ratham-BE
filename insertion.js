const fs = require("fs");
const jsondata = "./data.json";
const User = require("./models/User");
const Appointment = require("./models/Appointments");


// const result = Appointment.insertMany(documents);
const insertion = async (req, res, next) => {
  try {
    const rawData = fs.readFileSync(jsondata, "utf-8");
    // console.log(rawData);
    const data = JSON.parse(rawData);
    const documents = data.items;
    // console.log(documents);
    const result = await Appointment.insertMany(documents);
    res
      .status(200)
      .send({ message: "Data successfully inserted", insertedData: result });
  } catch (error) {
    res.status(400).send({ message: "Error in inserting data" });
    console.log(error);
  }
  next();
};

module.exports = { insertion };
