const createError = require("http-errors");
const { Service } = require("../models")

module.exports.getServices = (req, res, next) => {
  const { id } = req.params;
  const criterial = {};

  if (id) {
    criterial._id = id;
  }

  Service
    .find(criterial)
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
