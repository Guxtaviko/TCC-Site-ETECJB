const Sequelize = require('sequelize');
const connection = require('../database/database')
const User = require('../models/user')(connection, Sequelize)
const Notice = require('../models/notice')(connection, Sequelize)
const Category = require('../models/category')(connection, Sequelize)

Notice.associate({Category})
Category.associate({Notice})

const bcrypt = require('bcrypt');

const renderNews = async (req, res) => {
    const news = await Notice.findAll({order: [['updatedAt', 'DESC']], include: {
        model: Category,
        attributes: ['category_name']
    }})

    const categories = await Category.findAll()

    res.render('news', {
        news: news,
        categories: categories
    })
}

const renderNotice = async (req, res) => {
    let { title } = req.params
    title = title.split('_').join(' ')

    const notice = await Notice.findOne({where: {notice_title: title}, raw: true})

    res.render('notice', {notice: notice})
}

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
    renderNews,
    renderNotice,
    loginUser
}