const Router = require("express");
const router = Router();
const Path = require("path");

router.get("/*", (req, res) => {
  res.status(404).sendFile(Path.resolve(__dirname, "../public/pages/error/error.html"));
});

module.exports = router;
