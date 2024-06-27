const { Post, User, Comment } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const { comment, post_id, user_id } = req.body;
    let post = Post.findOne({ where: { id: post_id } })
    if (!post) return res.status(404).json({ error: "Empty post" });
    let user = User.findOne({ where: { id: user_id } })
    if (!user) return res.status(404).json({ error: "No user" });
    
    const _comment = await Comment.create({
      id: uuidv4(),
      comment,
      post_id,
      user_id,
    });
    await _comment.save();
    res.status(201).json(_comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.read = async function (req, res) {
  try {
    const comments = await Comment.findAll({ include: [User, Post] });
    if (!comments) return res.status(404).json({ error: "No Comment" });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.find = async function (req, res) {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.id },
      include: [User, Post],
    });
    if (!comment) return res.status(404).json({ error: "No comment" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.commenter = async function (req, res) {
  try {
    const comments = await Comment.findAll({
      where: { user_id: req.params.id },
    });
    if (!comments) return res.status(404).json({ error: "No comments" });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const { ...updateData } = req.body;

    const [updated] = await Comment.update(updateData, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Comment not found" });
    }
    const updatedPost = await Comment.findByPk(req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async function (req, res) {
  try {
    const deleted = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(204).json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
