  const express = require('express'),
  app = express();
const dotenv = require ('dotenv');
  dotenv.config();
const bd = require('./db');

const initRouter = require('./routes');

const  bodyParser = require('body-parser');

bd.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

bd.sync();

app.use(bodyParser.json());

initRouter(app);

app.listen(3000, () => console.log("Server start port 3000"));
