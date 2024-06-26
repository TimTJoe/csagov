var express = require("express");
var router = express.Router();
const controllers = require("../controllers/user.controllers");

/* create a user */
router.post("/", controllers.create);
// get all users
router.get("/", controllers.read);
// update a user
router.put("/:id", controllers.update);
// delete a user
router.delete("/", controllers.delete);

module.exports = router;
