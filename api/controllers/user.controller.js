const { User } = require("../models");

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  
  User
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        next(createError(404, "El usuario no existe"))
      }
    })
    .catch(next)
}

module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;
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
    .findByIdAndUpdate(id, user, { new: true, runValidators: true })
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        next(createError(404, "El usuario no existe"))
      }
    })
    .catch(next)  

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