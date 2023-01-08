const express = require("express");
const router = express.Router();

//service
const db = require("../../service/fireStoreService");

router.get("/login-images", async (req, res) => {
  try {
    const list = await db.getData("pages", "login-images");

    res.status(200).send(JSON.stringify(list));
  } catch (error) {
    console.warn(`Error in send list to 'login': ${error}`);
    res.status(500).json([]);
  }
});

module.exports = router;
