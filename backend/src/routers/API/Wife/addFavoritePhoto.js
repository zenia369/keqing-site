const Router = require("express");
const router = Router();

const db = require("../../../service/fireStoreService");

router.put("/addFavoritePhoto", async (req, res) => {
  try {
    const { uid, bigLink, link } = req.body;

    await db.addUserFavoriteItem({ bigLink, link }, uid);

    res.status(200).send(JSON.stringify({ message: "image saved" }));
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: "server error: save favorite image" }));
  }
});

module.exports = router;
