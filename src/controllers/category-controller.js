const Sequelize = require('sequelize');
const connection = require('../database/database')
const Category = require('../models/category')(connection, Sequelize)
const pagination = require('../helpers/pagination')

const getAll = async (req, res) => {
    let page = parseInt(req.query.page);
    if(isNaN(page))page = 1
    const limit = 5
    const result = await pagination(Category, page, limit)
    res.render('admin/categories-management', {
        categories: result.model, 
        page: page, 
        pageQnt: result.quantity
    })
}

const createNew = async (req, res) => {
    let {category_name, category_desc} = req.body

    category_name = category_name.trim()
    category_name = category_name[0].toUpperCase() + category_name.slice(1).toLowerCase();

    const matchingName = await Category.findOne({where: {
        category_name: category_name
    }})
    if (matchingName) return res.render('admin/forms/category', {
        category: {},
        errors: {
            existing: ['category_name']
        }
    })

    Category.create({category_name, category_desc})
    res.redirect('/admin/categorias')
}

const edit = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id)
    res.render('admin/forms/category', {
        category: category,
        errors: {}
    })
}

const update = async (req, res) => {
    const { id } = req.params;
    const { category_name, category_desc} = req.body
    Category.update({category_name, category_desc}, {
        where: {id: id}
    })
    res.redirect('/admin/categorias')
}

const destroy = async (req, res) => {
    const { id } = req.params;
    await Category.destroy({where: { id: id }})
    res.redirect('/admin/categorias')
}

const search = async (req, res) => {
    let page = parseInt(req.query.page)
    const { name } = req.query
    const where = {
        column: 'category_name',
        item: name
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await pagination(Category, page, limit, where)
    res.render('admin/categories-management', {
        categories: result.model,
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