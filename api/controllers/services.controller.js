const createError = require("http-errors");
const { Service } = require("../models")

module.exports.getAllServices = (req, res, next) => {
  Service
    .find()
    .populate("user", "nickname phone")
    .then(services => {
      if (services) {
        res.status(200).json(services);
      } else {
        next(createError(404, "Servicios no encontrados"));
      }
    })
    .catch(next)
}

module.exports.getService = (req, res, next) => {
  const { id } = req.params;
  Service
    .findById(id)
    .populate("user")
    .then(service => {
      if (service) {
        res.status(200).json(service);
      } else {
        next(createError(404, "Servicio no encontrado"));
      }
    })
    .catch(next)
}

module.exports.createService = (req, res, next) => {

  const { user, profession, bio, experience, rate, rating, disponibility } = req.body;
  const service = { user, profession, bio, experience, rate, rating, disponibility };

  Service
    .create(service)
    .then(service => {
      if (service) {
        res.status(201).json(service);
      } else {
        next(createError(400, "No se pudo crear el servicio"));
      }
    })
    .catch(next)
}
