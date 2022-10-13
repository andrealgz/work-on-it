const createError = require("http-errors");
const { Service } = require("../models");

module.exports.getServices = (req, res, next) => {
  const { id } = req.params;
  const criterial = {};

  if (id) {
    if (id === 'me') {
      criterial.user = req.user.id;
    } else {
      criterial._id = id;
    }
  } else {
    if (req.user) {
      criterial.user = { $ne: req.user.id };
    } 
  }

  Service
    .find(criterial)
    .populate("user", "nickname phone")
    .populate("orders")
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

  const { user, profession, bio, experience, rate, rating, disponibility, address, location } = req.body;
  const service = { user, profession, bio, experience, rate, rating, disponibility, address, location };

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
