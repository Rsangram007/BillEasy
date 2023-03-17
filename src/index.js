const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./route/route");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
//app.use("/api")
mongoose
  .connect(
    "mongodb+srv://Rsangram890:hPZbgpmJvegZil8Q@cluster0.osqcdhn.mongodb.net/Jaykisan?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(
    () => console.log("MongoDb is connected"),
    (err) => console.log(err)
  );

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.use("/", route);

app.listen(3000, () => {
  console.log("API server is running on port 3000");
});
