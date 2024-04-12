const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

// anslutning till databas

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if(err) {
        console.log("Connection failed: " + err);
    }

    console.log("Connected to database");
});


app.use(cors());

app.use(express.json());

// routes

app.get("/api", (req, res) => {
    res.json({message: "Welcome to my api"});
});

app.get("/api/cv", (req, res) => {
    // get cv
    connection.query(`SELECT * FROM cv;`, (err, results) => {
        if(err) {
            res.status(500).json({error: "Somthing went wrong: " + err});
            return;
        }

        console.log(results);
        if(results.length === 0) {
            res.status(404).json({message: "no cv found"});
        }
        else {
            res.json({results});
        }
    })
});

app.post("/api/cv", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;


    // error handling

    let errors = {
        message: "",
        detail: "", 
        https_response: {

        }
    };

    if(!companyname || !jobtitle || !location) {
       // error message
       errors.message = "companyname, jobtitle or location not included";
       errors.detail = "You must include companyname, jobtitle and location in json";

       // response code
       errors.https_response.message = "Bad request";
       errors.https_response.code = 400;

       res.status(400).json(errors);

        return;
    }

    //add cv to database
    connection.query(`INSERT INTO cv(companyname, jobtitle, location) VALUES (?, ?, ?);`, [companyname, jobtitle, location], (err, results) => {
        if(err) {
            res.status(500).json({error: "Somthing went wrong: " + err});
            return;
        }

        console.log("Fråga skapad: " + results);

        let cv = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location
        }
    
        res.json({message: "cv added", cv});
    });
});

app.put("/api/cv/:id", (req, res) => {
    res.json({message: "cv updated " + req.params.id});
});

app.delete("/api/cv/:id", (req, res) => {
    res.json({message: "cv deleted " + req.params.id});
});



app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});