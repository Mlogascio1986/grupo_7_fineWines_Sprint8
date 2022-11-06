//Modulos: Express y Path
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override');
const session = require('express-session')
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');
const cookies = require('cookie-parser');
const cors = require('cors'); // agrego esto para poder trabajar con Apis en la App de React
app.use(cors());
//heroku git:remote -a fwines-sp6-grupo7
//inicializo session
app.use(session({
    secret:'xx',
    resave: false,
    saveUninitialized: false,
}))
app.use(cookies());//Para usar cookies
//recien despues puedo preguntar por los datos de esa sesion
app.use(userLoggedMiddleware);


//Rutas: hay una a / que es el mainRouter.js
//y otra a /users que es al userRouter.js
const mainRouter = require('./routes/mainRouter.js')
const userRouter = require('./routes/userRouter.js')
const productsRouter = require('./routes/products.js'); // Rutas /products
// API routers
const APIUsersRouter = require('./routes/API/usersRouter');
const APIProductsRouter = require('./routes/API/productsRouter');

//Configuracion de la app
//Carpetas publicas
app.use(express.static(path.join(__dirname, '../public')))
//Configuraciones template engine: EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride("_method"));//Para poder usar PUT y DELETE
app.use(express.urlencoded({ extended: false }));//Para formularios
app.use(express.json());// con esto podemos procesar peticiones que viajen en formato json

app.use('/', mainRouter)
app.use('/user', userRouter)
app.use('/products', productsRouter);

// API routes
app.use('/api/products', APIProductsRouter);
app.use('/api/users', APIUsersRouter);

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
