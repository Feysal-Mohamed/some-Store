const express=require("express")
const Order = require("../Models/orderModel")
const orderCroller=require("../controller/orderControler")
const orderRouter=express.Router()


orderRouter.post("/create/order", orderCroller.createOrder);

// Get all orders
orderRouter.get("/read/orders", orderCroller.readOrders);

// Delete order by ID
orderRouter.delete("/delete/order/:id", orderCroller.deleteOrder);



module.exports=orderRouter