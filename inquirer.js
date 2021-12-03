const inquirer = require('inquirer')


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
                    console.log('viewing all departments!!');
                    db.query('SELECT * FROM dapertment', (err, results) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(results)
                    });
                    break;
                case 'View All Roles':
                    console.log('viewing all roles!!');
                    db.query('SELECT * FROM role', (err, results) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(results)
                    });
                    break;
                case 'View All Employees':
                    console.log('viewing all employees!!');
                    db.query('SELECT * FROM employee', (err, results) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(results)
                    });
                    break;
                case 'Add A Department':
                    console.log('adding a department!!');
                    break;
                case 'Add A Role':
                    console.log('adding a role!!');
                    break;
                case 'Add An Employee':
                    console.log('adding an employee!!');
                    break;
                case 'Update An Employee Role':
                    console.log('updating an employee role!!');
                    break;
                case 'Exit':
                    console.log('see ya!!');
                    return;
            }
            chooseQuery()
        })
}

module.exports = chooseQuery()