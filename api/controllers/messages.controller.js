const { Message } = require("../models");
const createError = require("http-errors")

module.exports.setMessage = (req, res, next) => {
  const { sender, receiver, service, message } = req.body;
  const { id } = req.params;
  const communication = { sender, receiver, order: id, service, message };


  Message
    .create(communication)
    .then(message => res.status(201).json(message))
    .catch(next)
}