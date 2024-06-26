const {Post} = require("../models")
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const { title, category, body, user_id } = req.body;
    const post = await Post.create({
      id: uuidv4(),
      title,
      category,
      body,
      user_id
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.read = async function (req, res) {
    try {
      const posts = await Post.findAll();
      if (!posts) return res.status(404).json({ error: "No Post" });
      res.status(200).json({ posts });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

exports.find = async function (req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) return res.status(404).json({ error: "No Post" });
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

exports.author = async function (req, res) {
    try {
      const posts = await Post.findAll({where: {user_id: req.params.id}});
      if (!posts) return res.status(404).json({ error: "No Posts" });
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
exports.update = async function (req, res) {
     try {
       const {...updateData } = req.body;
    
       const [updated] = await Post.update(updateData, {
         where: { id: req.params.id },
       });
       if (!updated) {
         return res.status(404).json({ error: "Post not found" });
       }
       const updatedPost = await Post.findByPk(req.params.id);
       res.status(200).json(updatedPost);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
};
exports.delete = async function (req, res) {
    try {
      const deleted = await Post.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(204).json({ message: "Post deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
