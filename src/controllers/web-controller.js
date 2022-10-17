const Sequelize = require('sequelize');
const connection = require('../database/database')
const User = require('../models/user')(connection, Sequelize)
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({where: {username: username}})

    // Checks if user exists
    if(!user) return res.render('login', {error: 'NotFound'})
    // Check if password is correct
    if(await bcrypt.compare(password, user.password)) return res.redirect('/admin/noticias')
    return res.render('login', {error: 'WrongPwd'})
}

module.exports = {
    loginUser
}