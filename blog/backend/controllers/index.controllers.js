exports.index = (req, res) => {
  try {
    res.status(200).json({ message: "Hello World!" });
  } catch (error) {
    res.status(404).json({ error });
  }
};
