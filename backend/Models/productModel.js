const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    quantity: { type: Number, required: true },
    categ: { type: String, required: true },
    prImg: [{ type: String, required: true }],
    status: { type: String, enum: ["available", "out Of Stock"], default: "available" }
}, { timestamps: true });

productSchema.plugin(AutoIncrement, { inc_field: 'id' });

productSchema.pre("save",function(next){
    this.status=this.quantity>0 ? "available" : "out Of Stock"
    next()
})

// productSchema.pre("updateOne", function(next) {
//     const update = this.getUpdate(); // <- this is a Mongoose query object method

//     const quantity = update.$set?.quantity;

//     if (quantity !== undefined) {
//         // Automatically set the status based on quantity
//         update.$set.status = quantity > 0 ? "available" : "out Of Stock";
//     }

//     next(); // Continue with the update
// });
// function applyStatusBasedOnQuantity(update) {
//     // Support both $set and top-level updates
//     const quantity = update?.$set?.quantity ?? update?.quantity;

//     if (quantity !== undefined) {
//         update.$set = update.$set || {};
//         update.$set.status = quantity > 0 ? "available" : "out Of Stock";
//     }
// }
// applyStatusBasedOnQuantity()

// const updateHooks = ["updateOne", "updateMany", "findOneAndUpdate", "findByIdAndUpdate"];

// updateHooks.forEach(hook => {
//     productSchema.pre(hook, function (next) {
//         const update = this.getUpdate();
//         applyStatusBasedOnQuantity(update);
//         next();
//     });
// });
productSchema.pre("findOneAndUpdate", function(next) {
    const update = this.getUpdate();

    // Check if quantity is being updated either via $set or directly
    let quantity = update?.$set?.quantity ?? update?.quantity;

    if (quantity !== undefined) {
        update.$set = update.$set || {};
        update.$set.status = quantity > 0 ? "available" : "out Of Stock";
    }

    next();
});


const Product = mongoose.model('Product', productSchema);


module.exports = mongoose.model("product", productSchema);
