const Sequelize = require("sequelize");

const initModels = require("./models");

const bd = new Sequelize("students3", "postgres", "11221122", {
  host: "students.c45a8qzzyvx9.eu-west-2.rds.amazonaws.com",
  dialect: "postgres"
});

initModels(bd);

module.exports = bd;
