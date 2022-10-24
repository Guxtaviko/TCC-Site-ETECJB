const Sequelize = require('sequelize')
const connection = require('../database/database')
const Testimonial = require('../models/testimonial')(connection, Sequelize)
const pagination = require('../helpers/pagination')

const getAll = async (req, res) => {
    let page = parseInt(req.query.page);
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await pagination(Testimonial, page, limit)
    res.render('admin/testimonials-management', {
        testimonials: result.model,
        page: page,
        pageQnt: result.quantity
    })
}

const createNew = async (req, res) => {
    if(req.fileType) return res.render('admin/forms/testimonial', {
        testimonial: {},
        errors: {
            wrong: ['testimonial_img']
        }
    })
    
    let {
        testimonial_author,
        testimonial_role,
        testimonial_year,
        testimonial_body
    } = req.body

    testimonial_author = testimonial_author.trim()
    testimonial_role = testimonial_role.trim()
    testimonial_year = testimonial_year.trim()
    testimonial_body = testimonial_body.trim()

    if (req.files.testimonial_img) {
        Testimonial.create({
            testimonial_author,
            testimonial_role,
            testimonial_img: req.files.testimonial_img[0].filename,
            testimonial_year,
            testimonial_body
        })
    } else {
        Testimonial.create({
            testimonial_author,
            testimonial_role,
            testimonial_year,
            testimonial_body
        })
    }

    res.redirect('/admin/depoimentos')

}

const edit = async (req, res) => {
    const { id } = req.params
    const testimonial = await Testimonial.findByPk(id)
    res.render('admin/forms/testimonial', {
        testimonial: testimonial,
        errors: {}
    })
}

const update = async (req, res) => {
    const { id } = req.params
    let {
        testimonial_author,
        testimonial_role,
        testimonial_year,
        testimonial_body
    } = req.body

    testimonial_author = testimonial_author.trim()
    testimonial_role = testimonial_role.trim()
    testimonial_year = testimonial_year.trim()
    testimonial_body = testimonial_body.trim()

    Testimonial.update({
        testimonial_author,
        testimonial_role,
        testimonial_year,
        testimonial_body
    }, {where: {id: id}}
    )

    res.redirect('/admin/depoimentos')
}

const destroy = async (req, res) => {
    const { id } = req.params

    await Testimonial.destroy({where: {id: id} })
    res.redirect('/admin/depoimentos')
}

const search = async (req, res) => {
    let page = parseInt(req.query.page)
    const { name } = req.query
    const where = {
        column: 'testimonial_author',
        item: name
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await pagination(Testimonial, page, limit, where)
    res.render('admin/testimonials-management', {
        testimonials: result.model,
        page: page,
        pageQnt: result.quantity,
        search: name
    })
}

module.exports = {
    getAll,
    createNew,
    edit,
    update,
    destroy,
    search
}