const Sequelize = require('sequelize')
const connection = require('../database/database')
const Notice = require('../models/notice')(connection, Sequelize)
const Category = require('../models/category')(connection, Sequelize)

Notice.associate({Category})
Category.associate({Notice})

const deleteUpload = require('../helpers/deleteUpload')
const fs = require('fs')

const validate = async (req, res) => {
    const optionals = ['id', 'notice_img']
    const fields = Object.entries(req.body)
    const requiredFields = fields.filter(([key, _]) => !optionals.includes(key))
    const invalidFields = requiredFields.filter(([_, value]) => value.trim().length == 0)
    
    if(invalidFields.length != 0) {
        deleteUpload(req)

        res.render(`admin/forms/notice`, {
            notice: {},
            categories: await getCategories(),
            errors: {
                empty: Object.keys(Object.fromEntries(invalidFields))
            }
        })

        req.invalidFields = true
    }
}

const paginate = async (page, limit, where) => {
    const startIndex = (page - 1) * limit;
    if (where) {
        const result = {
            model: await Notice.findAll({ 
                offset: startIndex, 
                limit: limit,
                include: {
                    model: Category,
                    attributes: ['category_name']
                },
                where: {
                    [where.column]: {
                        [Sequelize.Op.startsWith]: where.item 
                    }
                }
            }),
            quantity: Math.ceil((await Notice.count({
                where: {
                    notice_title: {
                        [Sequelize.Op.startsWith]: where.item 
                    }
                }
            }))/limit)
        }
        return result
    } else {
        const result = {
            model: await Notice.findAll({ offset: startIndex, limit: limit, include: {
                model: Category,
                attributes: ['category_name']
            }}),
            quantity: Math.ceil((await Notice.count())/limit)
        }
        return result
    }
}

const getCategories = async () => {
    const categories = await Category.findAll()
    return categories
}

const getAll = async (req, res) => {
    let page = parseInt(req.query.page)
    let cat = req.query.cat
    if(cat === undefined) cat = '' 
    const where = {
        column: 'notice_categoryId',
        item: cat
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await paginate(page, limit, where)
    res.render('admin/news-management', {
        news: result.model,
        page: page,
        pageQnt: result.quantity,
        cat: cat,
        categories: await getCategories()
    })
}

const renderForm = async (req, res) => {
    res.render(`admin/forms/notice`, {
        notice: {},
        categories: await getCategories(),
        errors: {}
    })
}

const createNew = async (req, res) => {
    await validate(req, res)

    if(req.invalidFields == true) return

    // Handle upload errors
    const uploadFields = ['notice_img']
    if(Object.keys(req.files).length != uploadFields.length) return res.render(`admin/forms/notice`, {
        notice: {},
        categories: await getCategories(),
        errors: {
            empty: uploadFields.filter(field => !Object.keys(req.files).includes(field))
        }
    })

    let {
        notice_title,
        notice_subtitle,
        notice_body,
        notice_categoryId,
        notice_author,
        notice_date
    } = req.body

    notice_title = notice_title.trim()
    notice_subtitle = notice_subtitle.trim()
    notice_body = notice_body.trim()
    notice_author = notice_author.trim()

    Notice.create({
        notice_title,
        notice_subtitle,
        notice_body,
        notice_img: req.files.notice_img[0].filename,
        notice_categoryId,
        notice_author,
        notice_date
    })

    res.redirect('/admin/noticias')
}

const edit = async (req, res) => {
    const { id } = req.params;
    const notice = await Notice.findByPk(id)
    res.render('admin/forms/notice', {
        notice: notice,
        categories: await getCategories(),
        errors: {}
    })
}

const update = async (req, res) => {
    validate(req, res)

    const { id } = req.params;
    let {
        notice_title,
        notice_subtitle,
        notice_body,
        notice_categoryId,
        notice_author,
        notice_date
    } = req.body

    notice_title = notice_title.trim()
    notice_subtitle = notice_subtitle.trim()
    notice_body = notice_body.trim()
    notice_author = notice_author.trim()

    Notice.update({
        notice_title,
        notice_subtitle,
        notice_body,
        notice_categoryId,
        notice_author,
        notice_date
    }, {
        where: {id: id}
    })

    res.redirect('/admin/noticias')
}

const destroy = async (req, res) => {
    const { id } = req.params
    const notice = await Notice.findByPk(id)

    fs.unlink('src/public/uploads/news/' + notice.notice_img, (err) => {
        if (err) throw(err)
    })

    await Notice.destroy({where: {id: id}})
    res.redirect('/admin/noticias')
}

const search = async (req, res) => {
    let page = parseInt(req.query.page)
    const { name } = req.query
    const where = {
        column: 'notice_title',
        item: name
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await paginate(page, limit, where)
    res.render('admin/news-management', {
        news: result.model,
        page: page,
        pageQnt: result.quantity,
        cat: '',
        categories: await getCategories(),
        search: name
    })
}

module.exports = {
    getAll,
    createNew,
    renderForm,
    edit,
    update,
    destroy,
    search
}