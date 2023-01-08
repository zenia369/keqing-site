const Router = require("express");
const router = Router();

//service
const db = require("../../service/fireStoreService");

router.get("/myWife", async (req, res) => {
  try {
    const list = await db.getData("pages", "myWife_cards");

    res.status(200).send(JSON.stringify(list));
  } catch (error) {
    console.warn(`Error in send list to 'my wife': ${error}`);
    res.status(500).json([]);
  }
});

module.exports = router;
