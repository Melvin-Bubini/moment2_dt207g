const mysql = require("mysql");
require('dotenv').config();


// anslutnigns inställningar

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err);
        return;
    }

    console.log("Connected to mysql!");
});

// SQL Fråga
connection.query("DROP TABLE IF EXISTS cv;", (err, results) => {
    if (err) throw err;

    console.log("Tabellen cv raderad!")
})

connection.query(`CREATE TABLE cv (
   id integer primary key auto_increment,
   companyname varchar(255) not null,
   jobtitle varchar(255) not null,
   location varchar(255) not null,
   posted timestamp default current_timestamp not null)`, (err, results) => {
    if (err) throw err;

    console.log("table cv created: " + results);
});