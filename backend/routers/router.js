const Router = require("express");
const router = Router();
const Path = require("path");

//middlewares
const loginMiddlewar = require("../middlewares/login");
const securedUserRouter = require("../middlewares/securedUserRouter");

//constrolles
const pictures = require("../controllers/pictures");
const profile = require("../controllers/profile");
const character = require("../controllers/character");

router.get("/", (req, res) => {
  const fileName = Path.resolve(__dirname, `../public/pages/home/index.html`);

  res.sendFile(fileName);
});

router.get("/myWife", (req, res) => res.redirect("/my-wife"));
router.get("/my-wife", (req, res) => {
  //new name router
  const fileName = Path.resolve(__dirname, `../public/pages/myWife/index.html`);

  res.sendFile(fileName);
});

router.get("/aboutMe", (req, res) => res.redirect("/about-me"));
router.get("/about-me", (req, res) => {
  //new name router
  const fileName = Path.resolve(__dirname, `../public/pages/aboutMe/index.html`);

  res.sendFile(fileName);
});

router.get("/autorsReview", (req, res) => res.redirect("/autors-review"));
router.get("/autors-review", (req, res) => {
  //new name router
  const fileName = Path.resolve(__dirname, `../public/pages/autorsReview/index.html`);

  res.sendFile(fileName);
});

router.get("/login?:continuePath", loginMiddlewar, (req, res) => {
  const fileName = Path.resolve(__dirname, `../public/pages/login/index.html`);

  res.sendFile(fileName);
});

router.get("/registration", (req, res) => {
  let { url } = req;

  const fileName = Path.resolve(__dirname, `../public/pages/${url}/index.html`);

  res.sendFile(fileName);
});

router.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

router.get("/userProfile", (req, res) => res.redirect("/user/profile"));
router.get("/user/profile", securedUserRouter, profile); //new name router

router.get("/characters/:name", securedUserRouter, character);

router.get("/teyvat-through-picture", pictures);

module.exports = router;
