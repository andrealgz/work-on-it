const createError = require("http-errors");
const { Review } = require("../models");

module.exports.createReview = (req, res, next) => {
  const { customer, text, order } = req.body;
  const contribution = { customer, text, order };
 
  Review
    .create(contribution)
    .then(review => res.status(201).json(review))
    .catch(next)
}