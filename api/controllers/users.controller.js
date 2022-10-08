const mongoose = require("mongoose")
const createError = require("http-errors");
const { User, Service, Order } = require("../models");


module.exports.getUser = (req, res, next) => {
  const { nickName } = req.params;

  const criterial = {};

  if (nickName) {
    if (nickName === "me") {
      criterial._id = req.user.id;
    } else {
      criterial.nickname = nickName;
    }
  }
  
  User
    .find(criterial)
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
      if (user) {
        if (Object.keys(criterial).length && !user.length) {
          next(createError(404, "Usuario no encontrado"));
        } else {
          res.status(200).json(user);
        }
      } else {
        next(createError(404, "Usuario no encontrado"))
      }
    })
    .catch(next)
}

module.exports.updateUser = (req, res, next) => {
  const { 
    email, 
    password, 
    nickname, 
    name, 
    surname, 
    phone, 
    address,
    locality, 
  } = req.body;

  const user = {
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
    .findByIdAndUpdate(req.user.id, user, { new: true, runValidators: true })
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        next(createError(404, "Usuario no actualizado"))
      }
    })
    .catch(next)  
}