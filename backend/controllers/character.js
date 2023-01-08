const Path = require("path");

const Wife = require("../service/wifeService");
const db = require("../service/fireStoreService");

const character = async (req, res) => {
  try {
    const name = req.params.name || "keqing";
    const { uid } = req.query;

    const user = await db.getUserData(uid);
    if (!user) throw Error("user not defined");

    Promise.all([db.getData("characters", `${name}`), Wife.getPathImg(name)])
      .then((props) => {
        if (props[1].images.length === 0) {
          throw Error("Error in search character...");
        } else {
          res.render(Path.resolve(__dirname, "../client/views/wife.hbs"), {
            layout: "layout-wife",
            ...props[0],
            ...props[1],
          });
        }
      })
      .catch((e) => {
        console.warn("Error in send character:", e.messages);
        res.status(500).sendFile(Path.resolve(__dirname, "../public/pages/error/error.html"));
      });
  } catch (error) {
    console.warn("Error in send character:", error.messages);
    res.redirect("/registration");
  }
};

module.exports = character;
