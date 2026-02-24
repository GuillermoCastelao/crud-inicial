const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    if (req.session.loggedin){
        res.render('index',{
            login:true,
            name: req.session.name
        })
    } else {
        res.render('index',{
            login:false,
            name: 'Debe iniciar sesión'
        })        
    }
});

router.get('/logout',(req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
});

module.exports = router;