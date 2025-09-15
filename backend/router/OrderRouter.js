
const express=require("express")
const Order = require("../model/OrderModel")
const orderCroller=require("../controller/orderControler")
const orderRouter=express.Router()

orderRouter.post("/create/order",orderCroller.createOrder )



module.exports=orderRouter