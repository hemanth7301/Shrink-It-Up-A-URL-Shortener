const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//Designing Schema for shortUrls collection
const shortUrlSchema = new mongoose.Schema({
  //long URL
  longURL: {
    type: String,
    required: true,
  },
  //short ID for URL redirection
  shortID: {
    type: String,
    required: true,
  },
  //timestamp
  date: {
    type: String,
    default: new Date(Date.now()),
  },
});

//exporting the model with shortUrls as name of collections
module.exports = mongoose.model("shortUrl", shortUrlSchema);
