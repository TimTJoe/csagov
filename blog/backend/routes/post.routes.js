const express = require("express");
const router = express.Router();
const controllers = require("../controllers/post.controllers");

/* create a post */
router.post("/create", controllers.create);
// get all posts
router.get("/", controllers.read);
router.get("/:id", controllers.find);
router.get("/author/:id", controllers.author);
// update a post
router.put("/:id", controllers.update);
// delete a post
router.delete("/:id", controllers.delete);

module.exports = router;
