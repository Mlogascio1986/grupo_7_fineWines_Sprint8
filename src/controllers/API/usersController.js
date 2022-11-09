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
    userIndexApi:  async (req,res) => {
      try {
          const users = await User.findAll({
              attributes: ['id', 'nombres','apellidos', 'email'],
          })
          console.log(users)
          users.forEach(user => { user.dataValues.url = `/api/users/${user.id}`
          });

          let respuesta = {
              meta:{
                  status: 200,
                  count: users.length
              },
              users
          }

          return res.json({respuesta});

      } catch (error) {
          res.json(error.message) 
      }
     
  },

    userDetailApi: async (req,res) => {
      //const id = Number(req.params.id);
      try {
          const id = req.params.id
          const user = await User.findByPk(id);
          
          delete user.dataValues.password
          delete user.dataValues.rolesId
          //delete user.dataValues.image

          //user.dataValues.urlImage = `/api/users/image/${user.id}`
          user.dataValues.urlImage = `images/users/${user.dataValues.image}`
          
          console.log(user)

          let respuesta = {
              meta:{
                  status: 200,
              },
              user
          }

          return res.json({user});
          
      }catch (error) {
          res.json(error.message)
      }
  },
}

module.exports = userController