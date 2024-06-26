var express = require("express");
var router = express.Router();
const controllers = require("../controllers/user.controllers");

/* create a user */
router.post("/signup", controllers.create);
// get all users
router.get("/read", controllers.read);
// update a user
router.put("/:id", controllers.update);
// delete a user
router.delete("/delete", controllers.delete);
// log user in
router.post("/login", controllers.login);

module.exports = router;
