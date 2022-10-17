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
    },
    photo: {
      type: String,
      default: 'https://res.cloudinary.com/dp520ozjl/image/upload/v1659034965/glovo/dvyi5n3bxrymxwrrjgcf.png',
      validate: {
        validator: function(image){
          try {
            new URL(image);
            return true;
          } catch(error){
            return false;
          }
        },
      }
    },
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