var express = require("express");
var router = express.Router();
const controllers = require("../controllers/user.controllers");

/* create a user */
router.post("/signup", controllers.create);
// get all users
router.get("/", controllers.read);
router.get("/:id", controllers.find);
// update a user
router.put("/:id", controllers.update);
// delete a user
router.delete("/:id", controllers.delete);
// log user in
router.post("/login", controllers.login);

module.exports = router;
