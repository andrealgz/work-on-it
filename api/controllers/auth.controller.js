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
    typeStreet, 
    street, 
    numberStreet, 
    floor, 
    door, 
    locality, 
    city, 
    postcode 
  } = req.body;

  const user = {
    email,
    password,
    nickname,
    name,
    surname,
    phone,
    locality, 
    city, 
    postcode,
    address: {
      typeStreet, 
      street, 
      numberStreet, 
      floor, 
      door
    }
  };

  User
    .create(user)
    .then(user => res.status(201).json(user))
    .catch(next)
};

module.exports.login = (req, res, next) => {
  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { password: { message: "Invalid email or password" } },
      })
    );
  }

  const { email, password } = req.body;
  User.findOne({ email })
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
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.status(204).send();
};