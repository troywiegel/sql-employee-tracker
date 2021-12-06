const mysql = require('mysql2')
const { chooseQuery } = require('./app')
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_HOST
    },
    console.log(`Connected to the employee_db database.`)
)

function viewAllDepartments() {

    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log('\n')
        console.table(result)
    })
}

function viewAllRoles() {

    console.log('viewing all roles!!')

    db.query('SELECT * FROM role', (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log('\n')
        console.table(result)
    })
}

function viewAllEmployees() {

    console.log('viewing all employees!!')

    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log('\n')
        console.table(result)
    })
}

function addADepartment() {
    console.log('adding a department!!')
    console.log('\n')
}

function addARole() {
    console.log('adding a role!!')
    console.log('\n')
}

function addAnEmployee() {
    console.log('adding an employee!!')
    console.log('\n')
}

function updateAnEmployeeRole() {
    console.log('updating an employee role!!')
    console.log('\n')
}

function exit() {
    console.log('see ya!!')
    return
}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateAnEmployeeRole, exit }