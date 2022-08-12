import app from './app.js'


const PORT = 8080;

const server = app.listen(PORT, () =>{
    console.log('Server on:', PORT);
})

server.on('error', error =>{
    console.log(`${error}`)
})

