const createError = require("http-errors")

module.exports.isLogged = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next(createError(401))
  }
}