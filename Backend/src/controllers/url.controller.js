const router = require("express").Router();
const validUrl = require("valid-url");
const URLModel = require("../models/shortUrl");
const generateShortId = require("../utility");

const baseUrl = process.env.baseUrl;

const generateUniqueShortId = async () => {
  let shortID;
  let existingURL;
  //checking if generated ID doesnt exist in DB
  while (true) {
    shortID = generateShortId();
    existingURL = await URLModel.findOne({ shortID: shortID });

    if (!existingURL) {
      break;
    }
  }
  return shortID;
};

router.post("/shortener", async (req, res) => {
  let { longUrl, urlCode } = req.body;
  try {
    //Valid URL check
    if (!validUrl.isUri(longUrl)) {
      return res.status(401).json({ error: "Invalid URL" });
    }

    if (urlCode) {
      const existingCodeBookmark = await URLModel.findOne({ shortID: urlCode });

      if (existingCodeBookmark) {
        return res.status(400).json({
          error: `Code ${urlCode} already in use. Please choose a different code.`,
        });
      }
    }

    const existingURL = await URLModel.findOne({ longURL: longUrl });

    if (existingURL && !urlCode) {
      return res.json({ urlCode: existingURL.shortID });
    }

    let generatedCode;
    if (!urlCode) {
      generatedCode = await generateUniqueShortId();
    } else {
      generatedCode = urlCode;
    }
    const shortUrl = `${baseUrl}${generatedCode}`;
    const newURL = new URLModel({
      shortID: generatedCode,
      longURL: longUrl,
    });
    await newURL.save();
    res.status(201).json({ urlCode: generatedCode });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

module.exports = router;
