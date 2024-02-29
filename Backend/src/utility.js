//Using Base 62 (26 UpperCase Alphabets, 26 LowerCase Alphabets, 10 Numbers)
const baseCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//function for generating random shortId
const shortIdGenerator = () => {
  let shortId = "";
  let shortIdLength = 7; //Define the custom length of the shortId
  for (let i = 0; i < shortIdLength; i++) {
    let index = Math.floor(Math.random() * baseCharacters.length);
    shortId += baseCharacters.charAt(index);
  }
  return shortId;
};

//console.log(shortIdGenerator());

module.exports = shortIdGenerator;
