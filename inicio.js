const express = require('express');
const rutas = require('./APP/rutas');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(rutas);


app.listen('3000','localhost',() => {
    console.log('Servidor Arriba');
}); 
