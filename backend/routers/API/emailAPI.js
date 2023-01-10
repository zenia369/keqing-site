const Router = require("express");
const router = Router();

const validator = require("email-validator");
const Email = require("../../service/SendEmailService");

router.post("/message", async (req, res) => {
  const { body } = req;
  try {
    if (validator.validate(`${body.email}`)) {
      const { st, check } = await Email.send(body);

      res.status(st).json({ result: check });
    } else {
      res.status(401).json({ result: false });
    }
  } catch (error) {
    res.status(500).json({ result: false });
    console.warn("Erorr in send message:", error);
  }
});

module.exports = router;
