const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema (
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Services"
    },
    orderNumber: {
      type: String,
      required: true,
      trim: true
    },
    detailJob: {
      type: {
        rate: {
          type: Number,
          required: true,
        },
        hours: {
          type: Number,
          required: true,
        },
      }
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    review: {
      type: {
        rating: Number,
        description: String,
      }
    },
  }
)

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;