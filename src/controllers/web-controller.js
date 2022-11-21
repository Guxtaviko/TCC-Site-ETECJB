const Sequelize = require('sequelize');
const connection = require('../database/database')
const User = require('../models/user')(connection, Sequelize)
const Notice = require('../models/notice')(connection, Sequelize)
const Category = require('../models/category')(connection, Sequelize)
const Testimonial = require('../models/testimonial')(connection, Sequelize)
const Course = require('../models/course')(connection, Sequelize)
const Employee = require('../models/employee')(connection, Sequelize)
const jwt = require('jsonwebtoken')
require('dotenv').config();

Notice.associate({ Category })
Category.associate({ Notice })

const bcrypt = require('bcrypt');

const renderIndex = async (req, res) => {
    const news = await Notice.findAll({
        order: [['updatedAt', 'DESC']], limit: 3, include: {
            model: Category
        }
    })

    const integralCourses = await Course.findAll({
        where: {
            course_period: 'Integral'
        }, limit: 4
    })

    const parcialCourses = await Course.findAll({
        where: {
            course_period: 'Parcial'
        }, limit: 4
    })

    const testimonials = await Testimonial.findAll()

    res.render('index', {
        news,
        integralCourses,
        parcialCourses,
        testimonials
    })
}

const renderCourses = async (req, res) => {
    const integralCourses = await Course.findAll({
        where: {
            course_period: 'Integral'
        }
    })

    const parcialCourses = await Course.findAll({
        where: {
            course_period: 'Parcial'
        }
    })

    res.render('courses', {
        integralCourses,
        parcialCourses
    })
}

const findCourse = async (req, res) => {
    const { name } = req.query

    const integralCourses = await Course.findAll({
        where: {
            course_period: 'Integral',
            course_name: {
                [Sequelize.Op.startsWith]: name
            }
        }
    })

    const parcialCourses = await Course.findAll({
        where: {
            course_period: 'Parcial',
            course_name: {
                [Sequelize.Op.startsWith]: name
            }
        }
    })

    res.render('courses', {
        integralCourses,
        parcialCourses
    })
}

const infoOfCourse = async (req, res) => {
    const { id } = req.params
    const course = await Course.findOne({ where: { id } })
    return res.json(course)
}

const renderNews = async (req, res) => {
    const news = await Notice.findAll({
        order: [['updatedAt', 'DESC']], include: {
            model: Category,
            attributes: ['category_name']
        }
    })

    const mostViewed = await Notice.findAll({ order: [['notice_views', 'DESC']], limit: 5 })

    const categories = await Category.findAll()

    res.render('news', {
        news,
        mostViewed,
        categories
    })
}

const renderNotice = async (req, res) => {
    const { title } = req.params

    const news = await Notice.findAll({
        include: Category,
        order: [['updatedAt', 'DESC']],
        where: {
            notice_title: {
                [Sequelize.Op.not]: title
            }
        },
        limit: 5
    })

    const notice = await Notice.findOne({
        where: { notice_title: title },
        include: {
            model: Category
        }
    })

    if(!notice) return res.status(404).render('404')

    if (req.cookies[notice.notice_title] != 'Visited') {
        const views = notice.notice_views + 1
        await Notice.update({ notice_views: views }, { where: { id: notice.id }, silent: true })
        res.cookie(notice.notice_title, 'Visited')
    }

    res.render('notice', { notice: notice, news: news })

}

const findNotice = async (req, res) => {
    const { name } = req.query

    const news = await Notice.findAll({
        order: [['updatedAt', 'DESC']],
        where: {
            ['notice_title']: {
                [Sequelize.Op.startsWith]: name
            }
        },
        include: {
            model: Category,
            attributes: ['category_name']
        }
    })

    const mostViewed = await Notice.findAll({ order: [['notice_views', 'DESC']], limit: 5 })

    const categories = await Category.findAll()

    res.render('news', {
        news,
        mostViewed,
        categories
    })

}

const filterNews = async (req, res) => {
    const { cat } = req.params

    const category = await Category.findOne({
        where: { 'category_name': cat },
        order: [
            [Notice, 'updatedAt', 'DESC']
        ],
        include: [{ model: Notice, include: Category }]
    })

    const news = category.Notices

    const mostViewed = await Notice.findAll({ order: [['notice_views', 'DESC']] })

    const categories = await Category.findAll()

    res.render('news', {
        news,
        mostViewed,
        categories
    })
}

const getEmployees = async (req, res) => {
    const { team } = req.params
    const employees = await Employee.findAll({
        where: {
            employee_team: team
        }
    })
    return res.json(employees)
}

const getUser = async (req, res) => {
    const token = req.cookies['x-access-token'];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.json('');

        return res.json(decoded.username)
    })
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username: username } })

    // Checks if user exists
    if (!user) return res.render('login', { error: 'NotFound' })
    // Check if password is correct
    if (!await bcrypt.compare(password, user.password)) return res.render('login', { error: 'WrongPwd' })

    const token = jwt.sign({ username }, process.env.SECRET)

    res.setHeader('x-access-token', token)
    res.cookie('x-access-token', token)

    return res.redirect('/admin/noticias')
}

const logout = async (req, res) => {
    res.setHeader('x-access-token', '')
    res.cookie('x-access-token', '')
    req.user = ''

    return res.redirect('/')
}

module.exports = {
    renderIndex,
    renderNews,
    renderCourses,
    findCourse,
    infoOfCourse,
    renderNotice,
    findNotice,
    filterNews,
    getEmployees,
    getUser,
    loginUser,
    logout
}