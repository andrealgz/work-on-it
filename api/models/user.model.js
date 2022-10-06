const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { admin } = require("../data")

const WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PW_PATTERN = /^.{8,}$/;
const PHONE_PATTERN = /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/;


const userSchema = new Schema (
  {
    email: {
      type: String,
      unique: true,
      required: "El email es obligatorio",
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, 'Correo inválido']
    },
    password: {
      type: String,
      required: "La contraseña es obligatoria",
      trim: true,
      match: [PW_PATTERN, 'La contraseña necesita mínimo 8 caracteres']
    },
    nickname: {
      type: String,
      trim: true,
      unique: true,
      required: "El nick es obligatorio"
    },
    name: {
      type: String,
      trim: true,
      maxLength: [30 , "El nombre no puede tener más de 30 caracteres"],
      minLength: [3 , "El nombre necesita mínimo 3 caracteres"],
      required: "El nombre es obligatorio"
    },
    surname: {
      type: String,
      trim: true,
      maxLength: [60 , "Los apellidos no puede tener más de 60 caracteres"],
      minLength: [3 , "Los apellidos necesita mínimo 3 caracteres"],
      required: "Los apellidos es obligatorio"
    },
    phone: {
      type: String,
      match: [PHONE_PATTERN, "El teléfono es incorrecto"]
    },
    address: {
      type: String,
      trim: true,
      required: "La dirección es obligatoria"
    },
    // location: {
    //     type: {
    //         type: String,
    //         default: "Point"
    //     },
    //     coordinates: [Number]
    // },
    locality: {
      type: String,
      trim: true,
      required: "La localidad es obligatoria"
    },
    isAdmin: Boolean,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
        delete ret.email;
        delete ret.phone;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

userSchema.pre('save', function (next) {
  this.isAdmin = admin.includes(this.email);
  if (this.isModified('password')) {
    bcrypt.hash(this.password, WORK_FACTOR)
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next)
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToMatch) {
  return bcrypt.compare(passwordToMatch, this.password)
}

userSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("orderSent", {
  ref: "Order",
  localField: "_id",
  foreignField: "customer",
});

userSchema.virtual("orderReceived", {
  ref: "Order",
  localField: "_id",
  foreignField: "ownerService",
});

const User = mongoose.model("User", userSchema);
module.exports = User;