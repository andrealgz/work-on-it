const createError = require("http-errors");
const { Order } = require('../models');

module.exports.createOrders = (req, res, next) => {
  const { customer, service, ownerService, rate, hours } = req.body;
  const order = { customer, service, ownerService, detailJob: {rate, hours}};

  Order
    .create(order)
    .then(order => {
      if (order) {
        res.status(201).json(order);
      } else {
        next(createError(400, "No se pudo crear la orden"));
      }
    })
    .catch(next)
}

module.exports.getOrders = (req, res, next) => {

  const { id } = req.params;

  const criterial = {};

  if (id) {
    criterial._id = id;
  }

  Order
    .find(criterial)
    .populate("messages")
    .populate("customer")
    .populate("service")
    .populate("ownerService")
    .then(order => {
      if (order) {
        res.status(200).json(order);
      }else{
        next(createError(404, "Orden no encontrada"));
      }
    })
    .catch(next)
}

module.exports.updateOrders = (req, res, next) => {

  const { id } = req.params;
  const { status } = req.body;
  const data = { status };

  const criterial = {};

  if (id) {
    criterial._id = id;
  }

  Order
    .findByIdAndUpdate(criterial, data, {new: true, runValidators: true})
    .populate("messages")
    .populate("customer")
    .populate("service")
    .populate("ownerService")
    .then(order => {
      if (order) {
        res.status(200).json(order);
      }else{
        next(createError(404, "Orden no encontrada"));
      }
    })
    .catch(next)
}