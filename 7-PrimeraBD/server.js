const express = require('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer, Socket} = require('socket.io');

const chat = require('./controllers/chat.js');
const prod = require('./controllers/prod');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'pug');
app.set('views', "./views");

app.use(express.static('uploads'))
app.use(express.static('./views'));
app.use(express.static('data'));

const products = [];

const messages = [];


app.get('/', (req,res) => {
    res.render('./layouts/index.pug',{root: __dirname})
})



/*servidor */

const PORT = 8080;

httpServer.listen(PORT, () => {
    console.log(`SERVER ON`);
});

io.on('connection', (socket) =>{
    console.log('connected');
    socket.emit('products', products);
    socket.emit('messages', messages);

    socket.on('new-products', data => {
        products.push(data);
        io.sockets.emit('products',products);

        prod.saveProd( confMysql, 'productos',data);

    })

    socket.on('new-messages', (messageData) =>{
        messages.push(messageData);
        io.sockets.emit('messages', messages)

        chat.saveChat( confSQLite, 'mensajes',messageData);
    })

})