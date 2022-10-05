const { Order } = require('../models');

module.exports.createOrders = (req, res, next) => {
  const { user, service, orderNumber, rate, hours} = req.body;
  const order = { user, service, orderNumber, detailJob: {rate, hours}};

  Order
    .create(order)
    .then(order => res.status(201).json(order))
    .catch(next)
}