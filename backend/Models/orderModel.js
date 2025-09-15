const mongoose = require("mongoose");



const OrderSchema=mongoose.Schema({
    customerName:{type:String , required:true},
    Products:[{
        ProductId:{type: mongoose.Schema.Types.ObjectId, ref:"product", reqired:true},
        quantity:{type:Number , required:true}
    }],
    TotalAmount:{type:Number , required:true}
})

module.exports= mongoose.model("Order", OrderSchema)