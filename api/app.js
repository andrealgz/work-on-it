require('dotenv/config');
const express = require("express");
const logger = require('morgan');
const mongoose = require("mongoose");
const createError = require("http-errors");

require('./config/db.config');

const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(logger('dev'));

const { initSession, loadUser } = require("./config/session.config");
app.use(initSession);
app.use(loadUser);


const routes = require("./config/routes.config");
app.use("/api/v1", routes);

app.use((req, res, next) => next(createError(404, "Ruta no encontrada")));

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  const data = {};

  if (error instanceof mongoose.Error.ValidationError || error.status === 400) {
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Recurso no encontrado");
  }

  data.message = error.message;

  res.status(error.status);
  res.json(data);
});

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.info(`Work on it running at port ${port}`)
);

module.exports = app;