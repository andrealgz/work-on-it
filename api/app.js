require('dotenv/config');
const express = require("express");
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
require('./config/db.config');

const routes = require("./config/routes.config");
app.use("/api/v1", routes);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.info(`Work on it running at port ${port}`)
);

module.exports = app;