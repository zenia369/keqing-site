const Router = require("express");
const router = Router();
const Path = require("path");

const ROOT_PAGE = Path.resolve(__dirname, "../client/public/pages");

router.get("/*", (req, res) => {
  res.status(404).sendFile(Path.resolve(ROOT_PAGE, "./error/error.html"));
});

module.exports = router;
