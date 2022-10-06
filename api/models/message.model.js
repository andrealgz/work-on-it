const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    receiver: { 
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    order: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order"
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service"
    },
    message: String
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
  });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;