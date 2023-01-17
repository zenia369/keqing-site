const glob = require("glob");

const PATH_TO_JS = "./src/app/**/js/*.js";

module.exports = () => {
  const entry = {};

  glob.sync(PATH_TO_JS).forEach((file) => {
    const name = file.match(/([a-zA-Z]{1,})\/js\/([a-zA-Z]{1,}).js/)[1];
    entry[name] = file;
  });

  return entry;
};
