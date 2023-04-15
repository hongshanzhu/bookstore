require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const morganBody = require('morgan-body')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

morganBody(app);

app.use(cookieParser());
// Third-party middleware
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// router-level middleware
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/accounts", require("./routes/accounts.routes"));

mongoose
  .connect(
    process.env.DB_URI
  )
  .then(() => {
    console.log("Connected to database success!");
    app.listen(PORT, () => {
      console.log(`Server at port ${PORT} started!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



