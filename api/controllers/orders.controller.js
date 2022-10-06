const createError = require("http-errors");
const { Order } = require('../models');

module.exports.createOrders = (req, res, next) => {
  const { user, service, orderNumber, rate, hours} = req.body;
  const order = { user, service, orderNumber, detailJob: {rate, hours}};

  Order
    .create(order)
    .then(order => {
      if (order) {
        res.status(201).json(order)
      } else {
        next(createError(400, "No se pudo crear la orden"));
      }
    })
    .catch(next)
}

module.exports.getAllOrders = (req, res, next) => {
  Order
    .find()
    .then(order => {
      if (order) {
        res.status(200).json(order);
      }else{
        next(createError(404, "Orden no encontrada"));
      }
    })
    .catch(next)
}

module.exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  
  Order
    .findById(id)
    .then(order => {
      if (order) {
        res.status(200).json(order);
      } else {
        next(createError(404, "Orden no encontrada"));
      }
    })
    .catch(next)
}