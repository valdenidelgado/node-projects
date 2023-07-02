const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/getapet");
  console.log("Connected to mongoose");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
