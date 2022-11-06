const path = require('path')
const fs = require('fs');
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const cookies = require('cookie-parser');
const {User, Rol} = require("../../database/models");
const {Op} = require('sequelize')

//Objeto literal userController
//Viene de userRouter a cada modulo

const userController = {
    userIndexApi:  (req,res) => {
		res.render('users/profile.ejs', {
            user: req.session.userLogged
        })},
    userDetailApi: (req,res) => {
		res.render('users/profile.ejs', {
            user: req.session.userLogged
        })}
    
}

module.exports = userController