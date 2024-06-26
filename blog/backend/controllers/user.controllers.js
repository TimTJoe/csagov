const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");


exports.create = async (req, res) => {
  // req.send(User)
  // console.log(User);
  try {
    const {firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      id: uuidv4(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save()
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.read = function (req, res, enxt) {
  res.send("get all user...");
  next();
};

exports.update = function (req, res, next) {
  res.send("updating a user...");
  next();
};

exports.delete = function (req, res, next) {
  res.send("deleting a user...");
  next();
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