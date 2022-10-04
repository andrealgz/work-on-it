const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { professions, experiences, timeTables } = require("../data");

const professionalSchema = new Schema (
  {
    idUser: {
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
  }
)

const Professional = mongoose.model('Professional', professionalSchema);
module.exports = Professional;