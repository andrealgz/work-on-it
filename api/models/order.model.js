const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { status } = require("../data");

const orderSchema = new Schema (
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service"
    },
    ownerService: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
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
        _id: false
      }
    },
    address: String,
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
    status: {
      type: String,
      enum: status.map(status => status.value),
    },
    review: {
      type: {
        rating: Number,
        description: String,
        _id: false
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

orderSchema.pre('save', function (next) {
  this.status = "review";
  this.review = {
    rating: 0,
    description: ''
  };
  next();
});

orderSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "order",
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;