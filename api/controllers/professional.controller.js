const { professional } = require("../models")

module.exports.getAllProfessional = (req, res, next) => {
  professional
    .find()
    .then(professionals => res.status(200).json(professionals))
    .catch(next)
}

module.exports.getProfessional = (req, res, next) => {
  const { id } = req.params;
  professional
    .findById(id)
    .then(professional => {
      if (professional) {
        res.status(200).json(professional)
      } else {
        res.status(404).json({error: "Profesional no encontrado"})
      }
    })
    .catch(next)
}
