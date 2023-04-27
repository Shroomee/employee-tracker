const express = require('express');
const mysql = require('mysql');

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

app.use((req, res) => {
    res.status(404).end();
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


