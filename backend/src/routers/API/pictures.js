const express = require("express");
const router = express.Router();

//service
const { filterPictures } = require("../../service/localData.service");

router.get("/pictures", (req, res) => {
  try {
    const responsedData = filterPictures(req.query);

    res.status(200).json(responsedData);
  } catch (error) {
    console.warn(`Error in send list to 'pictures': ${error}`);
    res.status(500).json({ data: [] });
  }
});

module.exports = router;
