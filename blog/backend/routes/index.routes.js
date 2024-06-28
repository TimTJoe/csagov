var express = require("express");
var router = express.Router();
const controllers = require("../controllers/index.controllers");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", controllers.index);

module.exports = router;
