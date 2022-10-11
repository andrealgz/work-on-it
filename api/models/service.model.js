const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { professions, experiences, timeTables } = require("../data");

const serviceSchema = new Schema (
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    profession: {
      type: String,
      enum: professions.map(profession => profession.value),
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true,
      trim: true,
      maxLength: [300, "La descripción puede contener hasta 300 caracteres"]
    },
    experience: {
      type: String,
      enum: experiences.map(experience => experience.value),
      required: true,
      trim: true
    },
    rate: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    disponibility: {
      type: String,
      required: true,
      trim: true,
      enum: timeTables.map( timeTable => timeTable.value )
    },
    address: String,
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
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

serviceSchema.pre('save', function (next) {
  this.rating = 0;
  next();
});

serviceSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "service",
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;