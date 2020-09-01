var express = require("express");
var router = express.Router();

/* GET Tredending Repos. */
router.get("/", function (req, res) {
  res.send("Success");
});

module.exports = router;
