const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
//require the posts.js
const bookRouters = require("./routes/books");

//use
app.use(bodyParser.json());
app.use("/books", bookRouters);
app.get("/", (req, res) => {
    res.send("we are in Home");
});

mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("connected to db")
);
app.listen(27017);