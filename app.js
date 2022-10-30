require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const connecDB = require("./db/connect");
const port = process.env.PORT || 3000;

//routes
const routes = require("./routes/index");
app.use(routes);
app.use(express.json());

//Middleware
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handle");
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connecDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
