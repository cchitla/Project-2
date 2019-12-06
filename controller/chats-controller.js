const express = require("express");
const router = express.Router();

router.get("/guncontrol", (req, res) => {
  res.render("guncontrol");
});

module.exports = router;
