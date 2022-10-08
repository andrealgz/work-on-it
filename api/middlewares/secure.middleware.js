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