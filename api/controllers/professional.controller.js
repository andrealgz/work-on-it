module.exports.getAllProfessional = (req, res, next) => {
  res.json("holi")
}

module.exports.getProfessional = (req, res, next) => {
  const { id } = req.params;
  res.json(id)
}
