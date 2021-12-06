// const mysql = require('mysql2')
// const inquirer = require('inquirer')
// require('dotenv').config()

// const db = mysql.createConnection(
//     {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME
//     },
//     console.log(`Connected to the ${process.env.DB_HOST} database.`)
// )

// function chooseQuery() {
//     inquirer
//         .prompt([
//             {
//                 type: 'list',
//                 message: 'What would you like to do?',
//                 name: 'queryOptions',
//                 choices: [
//                     'View All Departments',
//                     'View All Roles',
//                     'View All Employees',
//                     'Add A Department',
//                     'Add A Role',
//                     'Add An Employee',
//                     'Update An Employee Role',
//                     'Exit'
//                 ]
//             }
//         ])
//         .then((answer) => {
//             switch (answer.queryOptions) {
//                 case 'View All Departments':
//                     viewAllDepartments();
//                     break;
//                 case 'View All Roles':
//                     viewAllRoles();
//                     break;
//                 case 'View All Employees':
//                     viewAllEmployees();
//                     break;
//                 case 'Add A Department':
//                     addADepartment()
//                     break;
//                 case 'Add A Role':
//                     addARole()
//                     break;
//                 case 'Add An Employee':
//                     addAnEmployee()
//                     break;
//                 case 'Update An Employee Role':
//                     updateAnEmployeeRole()
//                     break;
//                 case 'Exit':
//                     exit()
//                     break;
//             }
//             chooseQuery()
//         })
// }

// function viewAllDepartments() {

//     db.query('SELECT * FROM department', (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log('\n')
//         console.table(result)
//     })
// }

// function viewAllRoles() {

//     console.log('viewing all roles!!')

//     db.query('SELECT * FROM role', (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log('\n')
//         console.table(result)
//     })
// }

// function viewAllEmployees() {

//     console.log('viewing all employees!!')

//     db.query('SELECT * FROM employee', (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log('\n')
//         console.table(result)
//     })
// }

// function addADepartment() {
//     inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 message: 'What is the name of the department you would like to add?',
//                 name: 'addDepartment',
//             }
//         ])
//         .then((answer) => {
//             db.query(`INSERT INTO department (name) VALUES (?)`, `${answer.addDepartment}`, (err, result) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 console.log('\n')
//                 console.table(result)
//             })
//         })
// }

// function addARole() {
//     inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 message: 'What is the title of the role you would like to add?',
//                 name: 'addRoleTitle',
//             },
//             {
//                 type: 'input',
//                 message: 'What is the salary of the role you would like to add?',
//                 name: 'addRoleSalary',
//             },
//             {
//                 type: 'input',
//                 message: 'What is the department of the role you would like to add?',
//                 name: 'addRoleDepartment',
//             }
//         ])
//         .then((answer) => {
//             db.query(`INSERT INTO role (title, salary. department_id) VALUES (?, ?, ?)`, `[${answer.addRoleTitle}, ${answer.addRoleSalary}, ${answer.addRoleDepartment}]`, (err, result) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 console.log('\n')
//                 console.table(result)
//             })
//         })
// }

// function addAnEmployee() {
//     inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 message: 'What is the employee first name?',
//                 name: 'addEmployeeFirstName',
//             },
//             {
//                 type: 'input',
//                 message: 'What is the employee last name?',
//                 name: 'addEmployeeLastName',
//             },
//             {
//                 type: 'input',
//                 message: 'What is the employee role?',
//                 name: 'addEmployeeRole',
//             },
//             {
//                 type: 'input',
//                 message: 'Who is the manager for this employee?',
//                 name: 'addEmployeeManager',
//             }
//         ])
//         .then((answer) => {
//             db.query(`INSERT INTO employee (first_name, last_name. role_id, manager_id) VALUES (?, ?, ?, ?)`, `[${answer.addEmployeeFirstName}, ${answer.addEmployeeLastName}, ${answer.addEmployeeRole}, ${answer.addEmployeeManager}]`, (err, result) => {
//                 if (err) {
//                     console.log(err)
//                 }
//                 console.log('\n')
//                 console.table(result)
//             })
//         })
// }

// function updateAnEmployeeRole() {
//     console.log('updating an employee role!!')
//     console.log('\n')
// }

// function exit() {
//     console.log('see ya!!')
//     return
// }

// function init() {
//     chooseQuery()
// }

// init()