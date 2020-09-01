var express = require("express");
var router = express.Router();

var githubController = require("../controller").githubController;

/* GET Tredending Repos. */
router.get("/", githubController.getTrendingRepos);

module.exports = router;
