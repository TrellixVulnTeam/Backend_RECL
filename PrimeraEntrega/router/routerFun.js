import { Router } from "express";

const routerFun = Router()

routerFun.get('/',(req,res)=>{
    res.render('./layouts/form.pug')
})

export default routerFun;