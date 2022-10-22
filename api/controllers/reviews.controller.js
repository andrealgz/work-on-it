const createError = require("http-errors");
const { Review, Order, Service } = require("../models");

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

  Review
    .create(contribution)
    .then(() => {
      return Order
        .findByIdAndUpdate(id, { status: "finish" }, { new: true, runValidators: true })
    })
    .then(order => {
      return Service
        .findById(order.service)
        .populate({
          path: "orders",
          populate: {
            path: "reviews"
          }
        })
    })
    .then(service => {
      const ratings = service.orders.filter(order => order.reviews.length).map(order => order.reviews[0].rating);
      const resultRating = ratings.reduce((acc, cur) => acc + cur,0) / ratings.length;
      return Service
        .findByIdAndUpdate(service.id, {rating: resultRating}, {new: true, runValidators: true} )
    })
    .then(() => res.status(201).json())
    .catch(next)
}