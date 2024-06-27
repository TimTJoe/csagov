var express = require("express");
var router = express.Router();
const controllers = require("../controllers/like.controllers");

/* create a user */
router.post("/create", controllers.create);
// get all users
router.get("/", controllers.read);
router.get("/:id", controllers.find);
router.get("/user/:id", controllers.user);
router.get("/post/:id", controllers.post);
// update a user
router.put("/:id", controllers.update);
// delete a user
router.delete("/:id", controllers.delete);

module.exports = router;
