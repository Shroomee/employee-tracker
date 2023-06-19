const express = require('express');
const mysql = require('mysql12');
const inquirer = require('inquirer');
//port and app variables
const PORT = 3001;
const app = express();

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to a database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Dudeomouspop1!',
        database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
);


//questions for the user
function questions() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'Add an employee',
      'Update an employee role',
      'View all roles',
      'Add a role',
      'View all departments',
      'Add a department',
      'Quit'
    ]
  })
  .then((answer) => {
    switch (answer.action) {
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Quit':
        quit();
        break;
    }
  })
}

//functions for cases
function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    questions();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name?"
    },
    {
      type: 'input',
      name: 'role_id',
      message: "What is the employee's role id?"
    },
    {
      type: 'input',
      name: 'manager_id',
      message: "What is the employee's manager id?"
    }
  ])
  .then((answer) => {
    db.query('INSERT INTO employee SET ?', answer, function (err, results) {
      console.log('Employee added.');
      questions();
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: "What is the employee's id?"
    },
    {
      type: 'input',
      name: 'role_id',
      message: "What is the employee's new role id?"
    }
  ])
  .then((answer) => {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.id], function (err, results) {
      console.log('Employee role updated.');
      questions();
    });
  });
}

function viewAllRoles() { 
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    questions();
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the role's title?"
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the role's salary?"
    },
    {
      type: 'input',
      name: 'department_id',
      message: "What is the role's department id?"
    }
  ])
  .then((answer) => {
    db.query('INSERT INTO role SET ?', answer, function (err, results) {
      console.log('Role added.');
      questions();
    });
  });
}

function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    questions();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the department's name?"
    }
  ])
  .then((answer) => {
    db.query('INSERT INTO department SET ?', answer, function (err, results) {
      console.log('Department added.');
      questions();
    });
  });
}

function quit() {
  db.end();
}

//start the app
questions();

//listen on port
app.use((req, res) => {
  res.status(404).end();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});