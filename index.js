const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const studentRouter = require('./routes/student');
const morgan = require('morgan');
dotenv.config();

const authenticateAdmin = require('./middleware/adminAuthorization');
const authentication = require('./middleware/authorization');

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth",authRouter);
app.use('/api/v1/student', authentication,studentRouter);
app.use("/api/v1/admin",authentication,authenticateAdmin, adminRouter);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`The server is Listening on ${port}`));
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
start();
