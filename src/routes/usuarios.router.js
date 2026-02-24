const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../../database/db');

//Presenta Login
router.get('/login', (req, res)=>{
    res.render('login');
});

//Presenta Register
router.get('/register', (req, res)=>{
    res.render('register');
});

//11.Autenticación
router.post('/auth', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcrypt.hash(pass,8);
    if (user && pass){
        connection.query('SELECT * FROM inti_qwq WHERE Usuario=?', [user] , async (error, results)=>{
            if (results.length == 0 || !(await bcrypt.compare(pass, results[0].Clave))){
                res.render('login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage:"Usuario y/o Password incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer:1500,
                    ruta:''                   
                });
            } else {
                req.session.loggedin = true;
                req.session.name = results[0].Email;
                res.render('login',{
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage:"Login correcto",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer:1500,
                    ruta:''                   
                });
            }
        })
    } else {
        res.render('login',{
            alert: true,
            alertTitle: "Adventencia",
            alertMessage:"Por favor, ingrese usuario y contraseña'",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer:1500,
            ruta:''                   
        });
    }
});

//10.Registración
router.post('/register', async (req, res)=>{
    const dni = req.body.dni;
    const user = req.body.user;
    const email = req.body.email;
    const rol = 'ALU';
    const pass = req.body.pass;
    let passwordHaash = await bcrypt.hash(pass,8);
    connection.query('INSERT INTO inti_qwq SET ?',{Usuario:user, DNI:dni, Email:email, Perfil:rol, Clave:passwordHaash}, async(error, results)=>{
        if (error){
            console.log(error);
        } else {
            res.render('index',{
                login:true,
                name: email
            })
        }        
    })
});

module.exports = router;