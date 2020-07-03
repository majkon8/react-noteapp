require("dotenv").config();

module.exports = {
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/notes",
  serverport: process.env.PORT || 3000,
};
