const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT
});

connection.authenticate()
.then(() => {
	console.log('Conexão com o banco realizado com sucesso')
}).catch(() => {
	console.log('Conexão com o banco não realizada com sucesso')
})

module.exports = connection;