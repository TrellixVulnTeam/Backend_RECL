const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const apiProducts = require('./api/products.js')
const apiMessages = require('./api/messages.js')
const products = new apiProducts()
const messages = new apiMessages('messages.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', async (socket) => {
    console.log('Conected')


    socket.emit('products', products.getAll())

    socket.on('actualizar', product => {
        products.save(product)
        io.sockets.emit('products', products.getAll())
    })
    

    socket.emit('messages', await messages.getAll())

    socket.on('newMessage', async message => {
        message.fyh = new Date().toLocaleString()
        await messages.save(message)
        io.sockets.emit('messages', await messages.getAll())
    })
})


const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
server.on('error', error => console.log('Error: ', error))