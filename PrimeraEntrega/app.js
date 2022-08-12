import express from "express";
import routerProd from './router/routerProd.js';
import routerCart from "./router/routerCart.js";
import routerFun from "./router/routerFun.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./uploads'));
app.use(express.static('./views'));
app.set('view engine', 'pug');
app.set('views', "./views");

app.use('/api/productos', routerProd)
app.use('/api/carrito', routerCart)
app.use('/api', routerFun)
app.get('/',(req, res) =>{
    res.redirect('/api/productos')
})

export default app;