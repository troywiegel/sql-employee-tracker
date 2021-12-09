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
        .then((res) => {
            switch (res.queryOptions) {
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
                    addADepartment();
                    break;
                case 'Add A Role':
                    addARole();
                    break;
                case 'Add An Employee':
                    addAnEmployee();
                    break;
                case 'Update An Employee Role':
                    updateAnEmployeeRole();
                    break;
                case 'Exit':
                    exit();
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
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'addDepartment',
        }
    ]).then((res) => {
        db.query(
            'INSERT INTO department (name) VALUE (?)',
            [res.addDepartment],
            (err, res) => {
                console.log(`${res.addDepartment} has been added to the department database!`)
                chooseQuery()
            })
    })
}

function addARole() {

    db.query('SELECT * FROM department', (err, res) => {

        const addRoleArray = []
        for (let i = 0; i < res.length; i++) {
            const newRoleId = {
                name: res[i].name,
                value: res[i].id
            }
            addRoleArray.push(newRoleId)
        }

        inquirer.prompt([
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
                type: 'list',
                message: 'What is the department of the role you would like to add?',
                name: 'addRoleDepartment',
                choices: addRoleArray
            }
        ]).then((res) => {

            db.query(
                'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
                [res.addRoleTitle, res.addRoleSalary, res.addRoleDepartment],
                (err, res) => {
                    console.log(`${res.addRoleTitle} has been added to the role database!`)
                    chooseQuery()
                })
        })
    })
}

function addAnEmployee() {

    db.query('SELECT * FROM employee', (err, res) => {

        const addManagerArray = []
        for (let i = 0; i < res.length; i++) {
            const newEmployeeManager = {
                name: res[i].first_name,
                value: res[i].id
            }
            addManagerArray.push(newEmployeeManager)
        }

        inquirer.prompt([
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
                type: 'list',
                message: 'Who is the manager for this employee?',
                name: 'addEmployeeManager',
                choices: addManagerArray
            }
        ]).then((res) => {

            db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
                [res.addEmployeeFirstName, res.addEmployeeLastName, res.addEmployeeRole, res.addEmployeeManager],
                (err, res) => {
                    console.log(`Employee has been added to the employee database!`)
                    chooseQuery()
                })
        })
    })
}

function updateAnEmployeeRole() {

    db.query('SELECT * FROM employee', (err, res) => {

        const employeeArray = []
        for (let i = 0; i < res.length; i++) {
            const employeeName = {
                name: res[i].name,
                value: res[i].id
            }
            employeeArray.push(employeeName)

            db.query('SELECT * FROM role', (err, res) => {

                const roleArray = []
                for (let i = 0; i < res.length; i++) {
                    const roleName = {
                        name: res[i].name,
                        value: res[i].id
                    }
                    roleArray.push(roleName)
                }

                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What is the name of the employee?',
                        name: 'addRoleDepartment',
                        choices: employeeArray[i].name
                    },
                    {
                        type: 'list',
                        message: 'What is their new role?',
                        name: 'addRoleDepartment',
                        choices: roleArray[i].name
                    }
                ]).then((res) => {

                    db.query(
                        'UPDATE employee SET rold_id = ? WHERE id = ?',
                        [res.roleArray, res.employeeArray],
                        (err, res) => {
                            console.log(`${res.employeeArray} has been updated in the role database!`)
                            chooseQuery()
                        })
                })
            })
        }
    })
}

function exit() {
    console.log('\n')
    console.log('see ya!!')
    console.log('\n')
    process.exit()
}

chooseQuery()