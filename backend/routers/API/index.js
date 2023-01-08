const Router = require("express");
const router = Router();

const emailAPI = require("./emailAPI");
const myWifeAPI = require("./myWifeAPI");
const homeImagesAPI = require("./main_imagesAPI");
const loginImagesAPI = require("./login_images");
const registrationImagesAPI = require("./registration_images");
const authRoot = require("./Auth/index");
const profileRoot = require("./Profile/index");
const wifeRoot = require("./Wife/index");
const picturesAPI = require("./pictures");

router.use("/api", emailAPI);
router.use("/api", myWifeAPI);
router.use("/api", homeImagesAPI);
router.use("/api", loginImagesAPI);
router.use("/api", registrationImagesAPI);
router.use("/api", authRoot);
router.use("/api", profileRoot);
router.use("/api", wifeRoot);
router.use("/api", picturesAPI);

module.exports = router;
