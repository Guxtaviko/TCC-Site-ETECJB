const Sequelize = require('sequelize');
const connection = require('../database/database')
const Employee = require('../models/employee')(connection, Sequelize)
const pagination = require('../helpers/pagination');

const getAll = async (req, res) => {
    let page = parseInt(req.query.page);
    let team = req.query.team
    if(team === undefined) team = ""
    const where = {
        column: 'employee_team',
        item: team
    }
    if(isNaN(page))page = 1
    const limit = 5
    const result = await pagination(Employee, page, limit, where)
    res.render('admin/employees-management', {
        employees: result.model, 
        page: page, 
        pageQnt: result.quantity, 
        team: team
    })
}

const createNew = async (req, res) => {
    let { employee_name, employee_team, employee_role } = req.body 
    employee_name = employee_name.trim().toUpperCase()
    employee_role = employee_role.trim().toUpperCase()
    Employee.create({employee_name, employee_team, employee_role})
    res.redirect('/admin/funcionarios')
}

const edit = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByPk(id)
    res.render('admin/forms/employee', {employee: employee})
}

const update = async (req, res) => {
    const { id } = req.params;
    let { employee_name, employee_team, employee_role } = req.body 
    employee_name = employee_name.trim().toUpperCase()
    employee_role = employee_role.trim().toUpperCase()
    Employee.update({employee_name, employee_team, employee_role}, {where: {id: id}})
    res.redirect('/admin/funcionarios')
}

const destroy = async (req, res) => {
    const { id } = req.params;
    await Employee.destroy({where: { id: id }})
    res.redirect('/admin/funcionarios')
}

const search = async (req, res) => {
    let page = parseInt(req.query.page);
    const { name } = req.query
    const where = {
        column: 'employee_name',
        item: name
    }
    if(isNaN(page)) page = 1
    const limit = 5
    const result = await pagination(Employee, page, limit, where)
    res.render('admin/employees-management', {
        employees: result.model, 
        page: page, 
        pageQnt: result.quantity, 
        team: '',
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