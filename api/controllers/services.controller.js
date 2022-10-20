const createError = require("http-errors");
const { Service } = require("../models");

module.exports.getServices = (req, res, next) => {
  const { id, profession } = req.params;
  const criterial = {};

  if (id) {
    criterial._id = id;
  } else {
    criterial.status = true;
    if (req.user) {
      criterial.user = { $ne: req.user.id };
    }
    if (profession) {
      if (profession === 'me') {
        criterial.user = req.user.id;
        delete criterial.status;
      } else {
        criterial.profession = profession;
      }
    }
  }

  Service
    .find(criterial)
    .populate("user")
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


module.exports.updateServices = (req, res, next) => {
  const { id } = req.params;

  const { address, bio, experience, latitude, longitude, profession, rate, status, disponibility } = req.body;
  const data = { address, bio, experience, profession, rate, status, disponibility };
  data.location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  }
  
  Service
    .findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate("user")
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
  const { profession, bio, experience, rate, timeTables, address, longitude, latitude } = req.body;
  const service = {
    user: req.user.id,
    profession: profession?.value,
    bio,
    experience: experience?.value,
    rate,
    disponibility: timeTables?.value,
    address,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  }

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
