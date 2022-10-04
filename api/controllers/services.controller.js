const { Services } = require("../models")

module.exports.getAllServices = (req, res, next) => {
  Services
    .find()
    .then(task => res.status(200).json(task))
    .catch(next)
}

module.exports.getService = (req, res, next) => {
  const { id } = req.params;
  Services
    .findById(id)
    .then(service => {
      if (service) {
        res.status(200).json(service)
      } else {
        res.status(404).json({error: "Servicio no encontrado"})
      }
    })
    .catch(next)
}

module.exports.createService = (req, res, next) => {
  res.status(401).json({ error: "aun no podemos crear servicios porque necesitamos usuarios" })
}
