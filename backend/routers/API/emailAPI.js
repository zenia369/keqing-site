const Router = require("express");
const router = Router();

const validator = require("email-validator");
const Email = require("../../service/SendEmailService");

router.post("/message", async (req, res) => {
  const { body } = req;
  try {
    if (validator.validate(`${body.email}`)) {
      const { st, check } = await Email.send(body);

      res.status(st).json({ check });
    } else {
      res.status(201).json({ check: false });
      console.warn("Erorr in send message");
    }
  } catch (error) {
    res.status(201).json({ check: false });
    console.warn("Erorr in send message:", error);
  }
});

module.exports = router;
