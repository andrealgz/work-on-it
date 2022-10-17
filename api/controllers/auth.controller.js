const createError = require("http-errors");
const { User } = require("../models");

module.exports.register = (req, res, next) => {
  const { 
    email, 
    password, 
    nickname, 
    name, 
    surname, 
    phone, 
    address,
    locality,
    photo
  } = req.body;

  const infoUser = {
    email,
    password,
    nickname,
    name,
    surname,
    phone,
    locality, 
    address
  };
  
  User
    .findOne({ $or: [{ email }, { nickname }]})
    .then(user => {
      if (user) {
        next(
          createError(400, {
            message: "User validation failed",
            errors: { email: { message: "Nickname o email registrado" } },
          })
        );
      } else {
        req.body.photo = req.file.path;
        return User
          .create(infoUser)
          .then(user => res.status(201).json(user))
      }
    })
    .catch(next)
};

module.exports.login = (req, res, next) => {
  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { password: { message: "Email o contraseña inválidos" } },
      })
    );
  }

  const { email, password } = req.body;
  User
    .findOne({ email })
    .populate("services")
    .populate({
      path: "orderSent",
      populate: {
        path: "messages"
      }
    })
    .populate({
      path: "orderReceived",
      populate: {
        path: "messages"
      }
    })
    .then(user => {
      if (!user) {
        invalidAuthError();
      } else {
        return user
          .checkPassword(password)
          .then(match => {
            if (match) {
              req.session.userId = user.id;
              res.status(200).json(user);
            } else {
              invalidAuthError();
            }
          });
      }
    })
    .catch(next)
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.status(204).send();
};

module.exports.getProfile = (req, res, next) => {
  res.json(req.user);
}