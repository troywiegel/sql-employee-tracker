const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')
require('dotenv').config()

// creating the database connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
)
// listing all possible queries and asking which to choose
function chooseQuery() {
    inquirer.prompt([
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
    ]).then((res) => {
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
// view all departments in the database
function viewAllDepartments() {
    db.query(
        `SELECT department.id AS 'ID', department.name AS 'Department Name' FROM department`,
        (err, res) => {
            console.table(res)
            chooseQuery()
        }
    )
}
// view all roles in the database
function viewAllRoles() {
    db.query(
        `SELECT role.id AS 'ID', role.title AS 'Job Title', role.salary AS 'Salary', department.name AS 'Department' FROM role LEFT JOIN department on role.department_id = department.id`,
        (err, res) => {
            console.table(res)
            chooseQuery()
        }
    )
}
// view all employees in the database
function viewAllEmployees() {
    db.query(
        `SELECT employee.id AS 'ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title', department.name AS 'Department', role.salary as Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' from employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`,
        (err, res) => {
            console.table(res)
            chooseQuery()
        }
    )
}
// add a department to the department table in the database
function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'addDepartment',
        }
    ]).then((res) => {
        db.query(
            'INSERT INTO department (name) VALUES (?)',
            [res.addDepartment],
            (err, res) => {
                console.log('Success! Added the department to the database.')
                chooseQuery()
            })
    })
}
// add a role to the role table in the database
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
                    console.log('Success! Added the role to the database.')
                    chooseQuery()
                })
        })
    })
}
// add an employee to the employee table in the database
function addAnEmployee() {
    db.query('SELECT * FROM role', (err, res) => {
        const addEmployeeArray = []
        for (let i = 0; i < res.length; i++) {
            const newEmployeeRole = {
                name: res[i].title,
                value: res[i].id
            }
            addEmployeeArray.push(newEmployeeRole)
        }
        db.query('SELECT * FROM employee', (err, res) => {
            const addManagerArray = []
            for (let i = 0; i < res.length; i++) {
                const newEmployeeManager = {
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: res[i].id
                }
                addManagerArray.push(newEmployeeManager)
            }
            addManagerArray.push({ name: 'No Manager', value: null })

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
                    type: 'list',
                    message: 'What is the employee role?',
                    name: 'addEmployeeRole',
                    choices: addEmployeeArray
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
                        console.log('Success! Added the employee to the database.')
                        chooseQuery()
                    })
            })
        })
    })
}
// update and employee on the employee table in the database
function updateAnEmployeeRole() {
    db.query('SELECT * FROM employee', (err, res) => {
        const employeeArray = []
        for (let i = 0; i < res.length; i++) {
            const employeeName = {
                name: `${res[i].first_name} ${res[i].last_name}`,
                value: res[i].id
            }
            employeeArray.push(employeeName)
        }
        db.query('SELECT * FROM role', (err, res) => {
            const roleArray = []
            for (let i = 0; i < res.length; i++) {
                const roleName = {
                    name: res[i].title,
                    value: res[i].id
                }
                roleArray.push(roleName)
            }
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the name of the employee?',
                    name: 'chooseEmployee',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    message: 'What is their new role?',
                    name: 'chooseRole',
                    choices: roleArray
                }
            ]).then((res) => {
                db.query(
                    'UPDATE employee SET role_id = (?) WHERE id = (?)',
                    [res.chooseRole, res.chooseEmployee],
                    (err, res) => {
                        console.log('Success! Employee role has been updated')
                        chooseQuery()
                    })
            })
        })
    })
}
// option to exit the looping inquirer questions
function exit() {
    console.log('\n')
    console.log('Thank you for using the employee tracker app. Goodbye!')
    console.log('\n')
    process.exit()
}
// calling the first function to initiate the app
chooseQuery()