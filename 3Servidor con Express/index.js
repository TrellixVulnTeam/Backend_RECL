const express = require('express')
const Container = require('./container')

const PORT = 8080
const app = express()
const container = new Container('./products.txt')

const server = app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + PORT)
})

app.get('/products', async (req,res) =>{
    container.getAll().then(resp => 
        res.send(resp)
    )
})

app.get('/productoRandom', async (req,res) =>{
    let total;
    let prodRandom
    container.getAll().then(r => {
       total = r.length
       prodRandom = Math.floor(Math.random() * total+1)
        container.getById(prodRandom).then( prod =>{
            res.send(prod)
        })
    })
})