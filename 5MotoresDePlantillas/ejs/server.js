const express = require('express')
const app = express()

const PORT = 8080 || process.env.PORT
const ApiProducts = require('./api/products.js')
const prod = new ApiProducts()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.post('/products', (req, res) => {
    const product = req.body
    prod.save(product)
    res.redirect('/')
})

app.get('/products', (req, res) => {
    const prods = prod.getAll()
    res.render('productsList.ejs', {
        Products: prods,
        ProductsQty: prods.length
    })
})


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
