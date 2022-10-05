const { User, Services, Order } = require("../models");

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  
  User
    .findById(id)
    .populate("services")
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

module.exports.getOrders = (req, res, next) => {
  const { id } = req.params;
  const result = {};
  Services
    .find({ user: id })
    .then(service => {
      const filter = service.reduce((service, curService) => {
        service ? service.push({service: curService.id}) : [{service: curService.id}]
        return service;
      }, []);
      return Order
        .find({$or: filter})
        .then(orders => {
          result.doing = orders;
          return Order
            .find({user: id})
            .then(orders => {
              result.requested = orders;
              res.status(200).json(result);
            })
        })
    })
    .catch(next)
}