const createError = require("http-errors");
const { Review, Order } = require("../models");

module.exports.createReview = (req, res, next) => {
  const { rating, text } = req.body;
  const { id } = req.params;
  const contribution = { 
    customer: req.user.id, 
    text, 
    rating: parseInt(rating), 
    order: id 
  };

  contribution.photo = req.file.path;

  console.log(contribution)
 
  Review
    .create(contribution)
    .then(() => {
      return Order
        .findByIdAndUpdate(id, { status: "finish" }, { new: true, runValidators: true })
        .then(() => res.status(201).json())
    })
    .catch(next)
}