const router = require("express").Router();
const verify = require("./verifytoken");

router.get("/", verify, (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.send({ name: "laxmikant", email: "varkallaxmikant62@gmail.com" });
});
module.exports = router;
