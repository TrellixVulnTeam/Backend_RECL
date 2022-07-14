const express = require('express')
const Container = require('./container')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products', Container);

app.use(express.static('public'));

app.listen(8080, () => {
    console.log('Server running on port 8080');
});


// app.use('/api', router)
// const container = new Contenedor('./products.txt')


// router.get('/products', (req, res) => {
//     container.getAll().then(resp =>
//         res.send(resp)
//     )
// })

// router.get('/products/:id',  (req,res) =>{
//     const id = parseInt(req.params.id)
//     container.getAll().then(p => {
//         if (isNaN(id)) {
//             return res.send({ error: 'El id ingresado no es un número' })
//         }

//         if (id < 1 || id > p.length) {
//             return res.send({ error: 'products no encontrado' })
//         }

//         container.getById(id).then( prod =>{
//             res.send(prod)
//         })
//     })
// })

// router.post('/products', (req,res) =>{
//     const producto = req.body
//     container.save(producto)
//         .then(p =>  res.json(p))
//         .catch(e => res.error('Error al agregar un products ' + e))
// })


// router.put('/products/:id', (req,res) =>{
//     const {id} = req.params
//     const {title, price, thumbnail} = req.body
//     const producto = {
//         "id": parseInt(id),
//         "title": title,
//         "price": price,
//         "thumbnail": thumbnail,
//     }
//     container.putById(id, producto).then(r =>{
//         res.json({
//             result: 'ok',
//             id: parseInt(id),
//             nuevo: producto
//         })
//     })
// })

// router.delete('/products/:id', (req,res) =>{
//     const id = parseInt(req.params.id)
//     container.deleteById(id).then(p => {

//         res.json({
//             result: 'ok',
//             id: id,
//         })
//     } )
// })



