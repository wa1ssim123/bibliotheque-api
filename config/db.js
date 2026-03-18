const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "bibliotheque_db", // nom de ta base
  "root",            // user
  "1234",            // mot de passe (TRÈS IMPORTANT)
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;