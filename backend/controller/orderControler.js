const OrderModel = require("../Models/orderModel");
const ProductModel = require("../Models/productModel");

const createOrder = async (req, res) => {
  const { Customers, product } = req.body;

  if (!product || product.length === 0) {
    return res.status(400).json({ message: "Product is required" });
  }

  let TotalAmount = 0;
  let Order = [];

  for (let items of product) {
    const productData = await ProductModel.findById(items.ProductId);
    if (!productData) {
      return res.status(400).json({ error: "This product not found" });
    }

    // Check stock quantity
    if (items.quantity > productData.quantity) {
      return res.status(400).json({ message: "This product is out of stock" });
    }

    // Calculate total
    let price = productData.price;
    let total = price * items.quantity;
    TotalAmount += total;

    // Reduce product stock
    productData.quantity -= items.quantity;
    await productData.save();

    // Add to order array
    Order.push({
      ProductId: productData._id,
      quantity: items.quantity,
      price,
      total,
    });
  }

  const newOrder = new OrderModel({
    customerName: Customers,
    Products: Order,
    TotalAmount,
  });

  await newOrder.save();
  res.status(201).json(newOrder);
};

module.exports = { createOrder };
