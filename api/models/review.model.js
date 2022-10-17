const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
    },
    text: {
      type: String,
      required: true,
      minLength: [10, "El comentario debe contener al menos 10 caracteres"],
      maxLength: [100, "El comentario puede contener hasta 100 caracteres"]
    },
    order: {
      ref: "Order",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;