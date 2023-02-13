const path = require("node:path");
const fs = require("node:fs");

// /etc/secrets/<filename>
const BUILD_PATH = path.resolve("/etc/secrets/");

module.exports = {
  APP_SERVICE_ACCOUNT: fs.existsSync(__dirname, "./data/serviceAccountKey.js")
    ? path.resolve("./data/serviceAccountKey.js")
    : path.join(BUILD_PATH, "serviceAccountKey.js"),
  APP_PICTURES_DATA: fs.existsSync(__dirname, "./data/pictures_data.json")
    ? path.resolve("./data/pictures_data.json")
    : path.join(BUILD_PATH, "pictures_data.json"),
  APP_CHARACTERS_LIST: fs.existsSync(__dirname, "./data/charactersList.js")
    ? path.resolve("./data/charactersList.js")
    : path.join(BUILD_PATH, "charactersList.js"),
  APP_FIREBASE_CONFIG: fs.existsSync(__dirname, "./data/firebaseConfig.json")
    ? path.resolve("./data/firebaseConfig.json")
    : path.join(BUILD_PATH, "firebaseConfig.json"),
};
