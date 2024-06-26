const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      id: uuidv4(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.read = async function (req, res, next) {
  try {
    const users = await User.findAll();
    if (!users) return res.status(404).json({ error: "No User" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  next();
};

exports.find = async function (req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "No User" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async function (req, res, next) {
   try {
     const { password, ...updateData } = req.body;
     if (password) {
       updateData.password = await bcrypt.hash(password, 10);
     }
     const [updated] = await User.update(updateData, {
       where: { id: req.params.id },
     });
     if (!updated) {
       return res.status(404).json({ error: "User not found" });
     }
     const updatedUser = await User.findByPk(req.params.id);
     res.status(200).json(updatedUser);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
  next();
};

exports.delete = async function (req, res, next) {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).json({message: "User deleted"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  next();
};
