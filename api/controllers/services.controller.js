const { Services } = require("../models")

module.exports.getAllServices = (req, res, next) => {
  Services
    .find()
    .populate("user", "nickname phone")
    .then(services => res.status(200).json(services))
    .catch(next)
}

module.exports.getService = (req, res, next) => {
  const { id } = req.params;
  Services
    .findById(id)
    .populate("user")
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

  const { user, profession, bio, experience, rate, rating, disponibility } = req.body;
  const service = { user, profession, bio, experience, rate, rating, disponibility };

  Services
    .create(service)
    .then(service => res.status(201).json(service))
    .catch(next)
}
