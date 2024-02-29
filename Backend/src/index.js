const express = require("express");
const redirect = require("./controllers/redirects.controller");
const url = require("./controllers/url.controller");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ Shrink_It_Up: "A URL Shortener" });
});

app.use("/", redirect);
app.use("/url", url);

module.exports = app;
