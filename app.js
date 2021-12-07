const inquirer = require('inquirer')
const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
)

function chooseQuery() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'queryOptions',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update An Employee Role',
                    'Exit'
                ]
            }
        ])
        .then((answer) => {
            switch (answer.queryOptions) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add A Department':
                    addADepartment()
                    break;
                case 'Add A Role':
                    addARole()
                    break;
                case 'Add An Employee':
                    addAnEmployee()
                    break;
                case 'Update An Employee Role':
                    updateAnEmployeeRole()
                    break;
                case 'Exit':
                    exit()
                    break;
            }
        })
}

function viewAllDepartments() {
    db.promise().query(
        'SELECT * FROM department;'
    ).then(([res]) => {
        console.log('\n')
        console.table(res)
    }).then(() => chooseQuery())
}

function viewAllRoles() {
    db.promise().query(
        'SELECT * FROM role;'
    ).then(([res]) => {
        console.log('\n')
        console.table(res)
    }).then(() => chooseQuery())
}

function viewAllEmployees() {
    db.promise().query(
        'SELECT * FROM employee;'
    ).then(([res]) => {
        console.log('\n')
        console.table(res)
    }).then(() => chooseQuery())
}

function addADepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you would like to add?',
                name: 'addDepartment',
            }
        ])
        .then((res) => {
            db.promise().query(
                'INSERT INTO department (name) VALUE (?)', `${res.addDepartment}`
            ).then((res) => {
                console.log(`${res.addDepartment} has been added to the department database!`)
            }).then(() => chooseQuery())
        })
}

function addARole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of the role you would like to add?',
                name: 'addRoleTitle',
            },
            {
                type: 'input',
                message: 'What is the salary of the role you would like to add?',
                name: 'addRoleSalary',
            },
            {
                type: 'input',
                message: 'What is the department of the role you would like to add?',
                name: 'addRoleDepartment',
            }
        ])
        .then((res) => {
            const newRole = [`${res.addRoleTitle}`, `${res.addRoleSalary}`, `${res.addRoleDepartment}`]
            db.promise().query(
                'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', newRole
            ).then((res) => {
                console.log(`${res.addRoleTitle} has been added to the role database!`)
            }).then(() => chooseQuery())
        })
}

function addAnEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employee first name?',
                name: 'addEmployeeFirstName',
            },
            {
                type: 'input',
                message: 'What is the employee last name?',
                name: 'addEmployeeLastName',
            },
            {
                type: 'input',
                message: 'What is the employee role?',
                name: 'addEmployeeRole',
            },
            {
                type: 'input',
                message: 'Who is the manager for this employee?',
                name: 'addEmployeeManager',
            }
        ])
        .then((res) => {
            const newEmployee = [`${res.addEmployeeFirstName}`, `${res.addEmployeeLastName}`, `${res.addEmployeeRole}`, `${res.addEmployeeManager}`]
            db.promise().query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', newEmployee
            ).then((res) => {
                console.log(`${res.addEmployeeFirstName} has been added to the employee database!`)
            }).then(() => chooseQuery())
        })
}

function updateAnEmployeeRole() {
    console.log('\n')
    console.log('updating an employee role!!')
}

function exit() {
    console.log('\n')
    console.log('see ya!!')
    console.log('\n')
    process.exit()
}

function init() {
    chooseQuery()
}

init()