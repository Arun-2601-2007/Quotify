const {quotes} = require("./data.js");
const {Quote} = require("../MODELS/quotesSchema.js");

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/quotify";
main()
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Quote.deleteMany({});
    await Quote.insertMany(quotes);
    console.log("data was initiallized");
}

initDB();