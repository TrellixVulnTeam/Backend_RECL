const {Router} = require('express');

const routerApp = Router();

routerApp.get('/', (req,res) => {   
    res.sendFile('../views/layouts/index.html',{root:__dirname})
})


module.exports = routerApp;