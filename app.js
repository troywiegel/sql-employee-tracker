const inquirer = require('inquirer')
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateAnEmployeeRole, exit } = require('./functions')

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
            chooseQuery()
        })
}

function init() {
    chooseQuery()
}

init()

module.exports = { chooseQuery }