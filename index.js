require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// Connect to the database

const uri = `mongodb+srv://rahul2pathak3297:${process.env.MONGODB_PASSWORD}@cluster0.9wavjba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
const questionRoutes = require("./src/routes/questionRoutes");
const optionRoutes = require("./src/routes/optionRoutes");

app.use("/questions", questionRoutes);
app.use("/options", optionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
