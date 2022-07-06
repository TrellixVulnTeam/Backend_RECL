const express = require('express')
const Container = require('./container')

const PORT = 8080
const app = express()
const container = new Container('./products.txt')

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});
server.on("error", err => console.log(`Error: ${err.message}`));

app.get('/', (req, res) => {
        res.send('<h1 style="color:blue">Desafío 3 Servidor con Express</h1>');
    })
    
    app.get("/productos", (req, res )=> {
        let container_file = container.read();
         res.send((container_file));
    });

    app.get("/productoRandom", (req, res) => {
        let container_file = container.read();
        let productRandom = container_file[Math.floor(Math.random() * container_file.length)];
        res.send(productRandom);
    });