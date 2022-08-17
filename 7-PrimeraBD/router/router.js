const {Router} = require('express');


const routerApp = Router();

routerApp.get('/', (req,res) => {   

    res.sendFile('../layout/index.html',{root:__dirname})

})

module.exports = routerApp;