const Sequelize = require('sequelize');
const connection = require('../database/database')
const Course = require('../models/course')(connection, Sequelize)
const pagination = require('../helpers/pagination')

const fs = require('fs')

const getAll = async (req, res) => {
    let page = parseInt(req.query.page);
    if(isNaN(page))page = 1
    const limit = 5
    const result = await pagination(Course, page, limit)
    res.render('admin/courses-management', {
        courses: result.model,
        page: page,
        pageQnt: result.quantity
    }) 
}

const createNew = async (req, res) => {
    // Handle upload errors
    const uploadFields = ['course_img', 'course_curriculum']
    if(Object.keys(req.files).length != uploadFields.length) return res.render(`admin/forms/course`, {
        course: {},
        errors: {
            empty: uploadFields.filter(field => !Object.keys(req.files).includes(field))
        }
    })

    let {
        course_name, 
        course_desc, 
        course_workload,
        course_period,
        course_vacancies,
        course_coordinator,
        course_email,
        course_shift 
    } = req.body

    course_name = course_name.trim()
    course_desc = course_desc.trim()
    course_coordinator = course_coordinator.trim()
    course_email = course_email.trim()

    Course.create({
        course_name, 
        course_desc, 
        course_img: req.files.course_img[0].filename, 
        course_workload,
        course_curriculum: req.files.course_curriculum[0].filename,
        course_period,
        course_vacancies,
        course_coordinator,
        course_email,
        course_shift 
    })

    res.redirect('/admin/cursos')
}

const edit = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByPk(id)
    res.render('admin/forms/course', {
        course: course,
        errors: {}
    })
}

const update = async (req, res) => {
    const { id } = req.params;
    let {
        course_name, 
        course_desc, 
        course_workload,
        course_period,
        course_vacancies,
        course_coordinator,
        course_email,
        course_shift 
    } = req.body

    course_name = course_name.trim()
    course_desc = course_desc.trim()
    course_coordinator = course_coordinator.trim()
    course_email = course_email.trim()

    Course.update(
        { course_name, 
        course_desc,  
        course_workload,
        course_period,
        course_vacancies,
        course_coordinator,
        course_email,
        course_shift },
        { where: { id: id }}
    )
    res.redirect('/admin/cursos')
}

const destroy = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByPk(id)

    fs.unlink('src/public/uploads/courses/imgs/' + course.course_img, (err) => {
        if (err) throw(err)
    })
    fs.unlink('src/public/uploads/courses/curricula/' + course.course_curriculum, (err) => {
        if (err) throw(err)
    })

    await Course.destroy({where: {id: id} })
    res.redirect('/admin/cursos')
}

const search = async (req, res) => {
    let page = parseInt(req.query.page)
    const { name } = req.query
    const where = {
        column: 'course_name',
        item: name
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await pagination(Course, page, limit, where)
    res.render('admin/courses-management', {
        courses: result.model,
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