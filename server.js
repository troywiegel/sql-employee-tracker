const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
);




app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);