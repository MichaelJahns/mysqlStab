const mysql = require('mysql');
const express = require('express');
require('dotenv').config();

var app = express();

const bodyParser = require(`body-parser`);

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

mysqlConnection.connect((err)=>{
if(!err){
    console.log(`DB connection successfull`);
}else{
    console.log(`DB connection failed \n Error: ` + JSON.stringify(err, undefined, 2))
}
});

app.listen(3000, ()=> console.log(`Express server is running at port #${3000}`))

// Get all rows
app.get('/employees',(req, res)=> {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields)=> {
        if(!err){
        res.send(rows);
        }else
        console.log(err);
    })
});

// Get rows by ID
app.get('/employees/:id',(req, res)=> {
    mysqlConnection.query('SELECT * FROM employee WHERE EmployeeID = ?',[req.params.id],(err, rows, fields)=> {
        if(!err){
        res.send(rows);
        }else
        console.log(err);
    })
});

// Delete employee by ID
app.delete('/employees/:id',(req, res)=> {
    mysqlConnection.query('DELETE employee WHERE EmployeeID = ?',[req.params.id],(err, rows, fields)=> {
        if(!err){
        res.send(`Deleted success`);
        }else
        console.log(err);
    })
});