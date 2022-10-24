const Sequelize = require('sequelize')
const connection = require('../database/database')
const Notice = require('../models/notice')(connection, Sequelize)
const Category = require('../models/category')(connection, Sequelize)

const paginate = async (page, limit, where) => {
    const startIndex = (page - 1) * limit;
    if (where) {
        const result = {
            model: await Notice.findAll({ 
                offset: startIndex, 
                limit: limit,
                include: Category,
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
            model: await Notice.findAll({ offset: startIndex, include: Category, limit: limit, }),
            quantity: Math.ceil((await Notice.count())/limit)
        }
        return result
    }
}

const getAll = async (req, res) => {
    let page = parseInt(req.query.page)
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await paginate(page, limit)
    res.render('admin/news-management', {
        news: result.model,
        page: page,
        pageQnt: result.quantity
    })
}

const createNew = async (req, res) => {
    if(req.fileType) return res.render('admin/forms/notice', {
        notice: {},
        errors: {
            wrong: ['notice_img']
        }
    })

    let {
        notice_title,
        notice_subtitle,
        notice_body,
        notice_categoryId
    } = req.notice_body

    notice_title = notice_title.trim()
    notice_subtitle = notice_subtitle.trim()
    notice_body = notice_body.trim()
}