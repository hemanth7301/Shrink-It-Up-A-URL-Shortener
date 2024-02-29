const router = require("express").Router();
const URLModel = require("../models/shortUrl");

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    //check if the shortID exists in the collections
    const url = await URLModel.findOne({
      shortID: code,
    });
    //if exists then redirect
    if (url) {
      return res.redirect(url.longURL);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
