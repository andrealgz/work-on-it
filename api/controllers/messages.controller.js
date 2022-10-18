const { Message } = require("../models");
const createError = require("http-errors")

module.exports.setMessage = (req, res, next) => {
  const { order, message } = req.body;
  const { id } = req.params;

  const communication = { 
    sender: req.user.id, 
    receiver: req.user.id === order.customer.id ? order.ownerService.id : order.customer.id, 
    order: id, 
    service: order.service.id, 
    message 
  };

  Message
    .create(communication)
    .then(message => res.status(201).json(message))
    .catch(next)
}