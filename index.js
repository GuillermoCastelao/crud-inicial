const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});
const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('Hola Mundito')
})
//const port = process.env.PORT;
const PORT = process.env.PORT || 3555;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))