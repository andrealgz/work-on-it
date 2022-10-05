const { User } = require("../models");

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  res.json(id);
}

module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  res.json(id);
}

module.exports.createUser = (req, res, next) => {
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
}