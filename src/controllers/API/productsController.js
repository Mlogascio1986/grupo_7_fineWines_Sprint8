const {Product, Bodegas, Varietal, Imagesproduct} = require('../../database/models');
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


const productController = {
    productIndexApi: async (req,res) => {
        try {
            const products = await Product.findAll({
                attributes: ['id', 'name', 'description', 'category'],
                //include: [Varietal, Bodegas, Imagesproduct]
                // include: [{ model: db.Category, attributes: ['name'] },...]
            })
            console.log(products)
            products.forEach(product => { product.dataValues.url = `/api/products/${product.id}`
            });

            let countByCategory = await Product.findAll({
                attributes: ['category',
                  [Sequelize.fn('COUNT', Sequelize.col('category')), 'count'],
                ],
                group: ['category'],
                raw: true
              });

            let respuesta = {
                meta:{
                    status: 200,
                    count: products.length,
                    countByCategory
                },
                products
            }

            return res.json({respuesta});

        } catch (error) {
            res.json(error.message) 
        }
       
    },
    productDetailApi: async (req,res) => {
        //const id = Number(req.params.id);
        try {
            const id = req.params.id
            const product = await Product.findByPk(id, {
                include: [Bodegas,Varietal,Imagesproduct],
                include: [{ model: Imagesproduct, attributes: ['nameImage'] }]
            });
            
            let respuesta = {
                meta:{
                    status: 200,
                },
                product
            }

            return res.json({product});
            
        }catch (error) {
            res.json(error.message)
        }
    }
}

module.exports = productController



//Api productos: El response debe ser: 
//1. count: cantidad total de productos en la base, 
//2. CountByCategory: objeto literal con una propiedad por categoria con el total de productos por cada una
//3. productos: array de objetos literales por cada producto en la base.
// Cada producto debe tener: id, name, description, una url para ver el detalle del productos