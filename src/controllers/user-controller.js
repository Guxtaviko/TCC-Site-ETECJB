const Sequelize = require('sequelize');
const connection = require('../database/database')
const User = require('../models/user')(connection, Sequelize)
const pagination = require('../helpers/pagination');
const bcrypt = require('bcrypt')

const getAll = async (req, res) => {
    let page = parseInt(req.query.page);
    if(isNaN(page))page = 1
    const limit = 5
    const exclude = 'password'
    const result = await pagination(User, page, limit, null, exclude)
    res.render('admin/users-management', {
        users: result.model, 
        page: page, 
        pageQnt: result.quantity
    })
}

const createNew = async (req, res) => {
    const salt = await bcrypt.genSalt(12)
    let {username, email, password, repeatPwd} = req.body
    username = username.trim()
    email = email.trim()

    const matchingUsername = await User.findOne({
        where: {
            username: username
        }
    })

    const matchingEmail = await User.findOne({
        where: {
            email: email
        }
    })

    if (matchingUsername) return res.render('admin/forms/user', {
        user: {},
        errors: {
            existing: ['username']
        }
    })

    if (matchingEmail) return res.render('admin/forms/user', {
        user: {},
        errors: {
            existing: ['email']
        }
    })

    if (password != repeatPwd) return res.render('admin/forms/user', {
        user: {},
        errors: {
            matches: ['password', 'repeatPwd']
        }
    })

    hashedPwd = await bcrypt.hash(password, salt)
    User.create({username, email, password: hashedPwd})
    res.redirect('/admin/usuarios')
}

const destroy = async (req, res) => {
    const { id } = req.params;
    await User.destroy({where: { id: id }})
    res.redirect('/admin/usuarios')
}

const search = async(req, res) => {
    let page = parseInt(req.query.page)
    const { name } = req.query
    const where = {
        column: 'username',
        item: name
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await pagination(User, page, limit, where)
    res.render('admin/users-management', {
        users: result.model,
        page: page,
        pageQnt: result.quantity,
        search: name
    })
}

module.exports = {
    getAll,
    createNew,
    destroy,
    search
}