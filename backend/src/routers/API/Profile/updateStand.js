const Router = require("express");
const router = Router();

const db = require("../../../service/fireStoreService");

router.put("/updateStand", async (req, res) => {
  try {
    const { uid, newCard, id } = req.body;

    await db.changeUserDataStandByID({ newCard, id }, uid);

    res.status(200).send(JSON.stringify({ message: "stand update" }));
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: "server error: update stand" }));
  }
});

router.put("/stand/update", async (req, res) => {
  try {
    const { uid, stand } = req.body;

    await db.update_user_stand(stand, uid);

    res.status(200).send(JSON.stringify({ message: "stand updated" }));
  } catch (error) {
    res.status(500).send(JSON.stringify({ message: "server error: update stand" }));
  }
});

module.exports = router;
