const Router = require("express");
const router = Router();

//service
const db = require("../../service/fireStoreService");

router.get("/registration_page", async (req, res) => {
  try {
    const list = await db.getData("pages", "registration_page");

    res.status(200).send(JSON.stringify(list));
  } catch (error) {
    console.warn(`Error in send list to 'login': ${error}`);
    res.status(500).json([]);
  }
});

module.exports = router;
