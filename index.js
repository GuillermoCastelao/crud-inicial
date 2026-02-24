//1.Invoca express
const express = require('express');
const Sequelize = require ('sequelize');
const app = express();

//2.Setea encod para capturar formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3.Setea variables de entorno
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//4.Setea directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
//console.log(__dirname);

//5.Setea plantillas
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//6.Setea encriptación
const bcrypt = require('bcryptjs');

//7.Variables de session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//8.Invoca conexion a la base
const connection = require('./database/db');

//9.Setea rutas
const PORT = process.env.PORT || 3555;
app.use(require('./src/routes/usuarios.router'));

//12.Auth pages
const mainRouter = require('./src/routes/main.router');
app.use(mainRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))