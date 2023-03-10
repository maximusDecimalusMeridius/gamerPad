//loop in dependencies: express, handlebars, path
//create app, create handlebars view engine, define allRoutes as index.js in /controllers
const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();
const allRoutes = require("./controllers");

//define sequelize connection in /config/connection
const sequelize = require('./config/connection');

//Set PORT to process.env variable on Heroku or default to port 3000
const PORT = process.env.PORT || 3001;

//build tables when index.js is run
const { Account, Game, Note, Platform, User, UserFriend, UserGame } = require("./models");

//use express methods to interpret JSON objects
//middleware to append the response headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//references API routes in /controllers for each model
app.use('/api', allRoutes);

//use public as the base directory
// app.use(express.static(path.join(__dirname, 'public')));

//wildcard redirect
app.get("/*", (req, res) => {
    res.send("Oops we couldn't find what you're looking for!");
})

//sync sequelize, dropping and recreating the db each time
//launch server on PORT
sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);

    })

});