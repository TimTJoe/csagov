const { Post, User, Like } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    let post = Post.findOne({ where: { id: post_id } });
    if (!post) return res.status(404).json({ error: "Empty post" });
    let user = User.findOne({ where: { id: user_id } });
    if (!user) return res.status(404).json({ error: "No user" });
    const like = await Like.create({
      id: uuidv4(),
      post_id,
      user_id,
    });
    await like.save();
    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.read = async function (req, res) {
  try {
    const Likes = await Like.findAll({ include: [User, Post] });
    if (!Likes) return res.status(404).json({ error: "No Like" });
    res.status(200).json({ Likes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.find = async function (req, res) {
  try {
    const Like = await Like.findOne({
      where: { id: req.params.id },
      include: [User, Post],
    });
    if (!Like) return res.status(404).json({ error: "No Like" });
    res.status(200).json(Like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.user = async function (req, res) {
  try {
    const Likes = await Like.findAll({ where: { user_id: req.params.id } });
    if (!Likes) return res.status(404).json({ error: "No Like" });
    res.status(200).json(Likes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.post = async function (req, res) {
  try {
    const Likes = await Like.findAll({ where: { post_id: req.params.id } });
    if (!Likes) return res.status(404).json({ error: "No Like" });
    res.status(200).json(Likes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const { ...updateData } = req.body;

    const [updated] = await Like.update(updateData, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Like not found" });
    }
    const updatedLike = await Like.findByPk(req.params.id);
    res.status(200).json(updatedLike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async function (req, res) {
  try {
    const deleted = await Like.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.status(200).json({
      message: "Like deleted",
      deleted,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
