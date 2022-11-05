const { body } = require("express-validator");

const path = require("path");

const productCreateValidation = [
    body('name')
        .notEmpty().withMessage("No puede estar el campo vacio").bail() 
        // bail se usa para cortar la validacion y que no se ejecuten las demas validaciones
        .isLength({ min: 5 }).withMessage('Debes escribir un nombre de producto con más de 5 caracteres'),
    
    body('bodegaId')
        .notEmpty().withMessage("No puede estar el campo vacio").bail(),
        //.isLength({ min: 4 }).withMessage('Debes escribir una bodega con más de 4 caracteres'),
    
    body('varietalId')
        .notEmpty().withMessage("No puede estar el campo vacio").bail(),
        //.isLength({ min: 4 }).withMessage('Debes escribir un varietal con más de 4 caracteres'),
    body('price')
        .notEmpty().withMessage("No puede estar el campo vacio"),
        //.min(0).withMessage('Tiene que ser mas de 0'),
        
	body("category")
        .notEmpty().withMessage("Debe seleccionar una categoría"),
        
	body('description')
        .notEmpty().withMessage('Debe escribir una descripción').bail()
	    .isLength({ min: 20 }).withMessage('Debe escribir como mínimo 20 letras o caracteres'),

	body("image")
        .custom((value, {req}) => {
            // const files = req.files; // La linea de abajo hace lo mismo
            const { files } = req;
	
            if(files.length === 0){
               throw new Error("Debes subir al menos una imagen");
            }
                
            const extensionesValidas = [".png", ".jpg", ".jpeg"];

            files.forEach( file => {
                const fileExtension = path.extname(file.originalname)
                if(!extensionesValidas.includes(fileExtension)){
                    throw new Error(`Los formatos de imagen validos son ${extensionesValidas.join(', ')}`);
                }
            })
            
            return true; 
        }),	
]

module.exports = productCreateValidation;