const { Message } = require("../models");
const createError = require("http-errors")

module.exports.setMessage = (req, res, next) => {
  const { sender, receiver, order, service, message } = req.body;
  const communication = { sender, receiver, order, service, message };

  Message
    .create(communication)
    .then(message => res.status(201).json(message))
    .catch(next)
}