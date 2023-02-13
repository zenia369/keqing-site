const Path = require("path");
const db = require("../service/fireStoreService");

const { APP_CHARACTERS_LIST } = require("../paths");
const charactersList = require(APP_CHARACTERS_LIST);

const profile = async (req, res) => {
  try {
    const { uid } = req.query;

    const user = await db.getUserData(uid);
    if (!user) throw Error("user not defined");

    res.render(Path.resolve(__dirname, "../client/views/profile.hbs"), {
      layout: "layout-profile",
      user,
      charactersList,
    });
  } catch (error) {
    res.redirect("/registration");
  }
};

module.exports = profile;
