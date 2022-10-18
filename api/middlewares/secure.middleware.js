const createError = require("http-errors")

module.exports.isLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isOwnerService = (req, res, next) => {
  const { id } = req.params;
  const { services } = req.user;
  if (
    services.some(service => service.id === id)
  ) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isOwner = (req, res, next) => {
  const { orderSent, orderReceived } = req.user;
  const { id } = req.params;

  if (
    orderSent.some(order => order.id === id) || 
    orderReceived.some(order => order.id === id)
  ) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isOwnerReceived = (req, res, next) => {
  const { orderReceived } = req.user;
  const { id } = req.params;
  
  if (orderReceived.some(order => order.id === id)) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isOwnerSent = (req, res, next) => {
  const { orderSent } = req.user;
  const { id } = req.params;

  
  if (orderSent.some(order => order.id === id)) {
    next();
  } else {
    next(createError(401));
  }
}
