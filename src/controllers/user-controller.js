const Sequelize = require('sequelize');
const connection = require('../database/database')
const User = require('../models/user')(connection, Sequelize)

const getAll = async (req, res) => {
    const users = await User.findAll();
    res.render('admin/users-management', {users: users})
}

module.exports = {
    getAll
}