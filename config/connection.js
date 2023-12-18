const Sequalize = require('sequalize');
require('dotenv').config();

let sequelize;
// what is JAWSDB_URL?
if (process.env.JAWSDB_URL) {
 sequelize = const Sequalize(process.env.JAWSDB_URL);
} else {
 sequelize = new Sequalize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
   host: 'localhost',
   dialect: 'mysql',
   port: 3306,
  }
 );
}

//why is it not green?
module.exports = sequelize;