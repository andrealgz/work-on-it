const createError = require("http-errors")

module.exports.isLogged = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next()
  } else {
    next(createError(401))
  }
}