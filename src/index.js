// require('dotenv').config()
const express = require("express");
const router = require("./routes/route");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://group15_project:EDHBqxqKYJaki5EJ@cluster0.i9alz.mongodb.net/habuild_assignment_1",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDB is Connected!!"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});