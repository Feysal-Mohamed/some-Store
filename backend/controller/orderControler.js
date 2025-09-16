const OrderModel = require("../Models/orderModel");
const ProductModel = require("../Models/productModel");

const createOrder = async (req, res) => {
  const { Customers, customerEmail, customerPhone, product } = req.body;

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
      name: productData.name,
      price: productData.price,
      quantity: items.quantity,
      prImg: productData.prImg || null
    });
  }

  const newOrder = new OrderModel({
    customerName: Customers,
    customerEmail: customerEmail || '',
    customerPhone: customerPhone || '',
    Products: Order,
    TotalAmount,
  });

  await newOrder.save();
  res.status(201).json(newOrder);
};

// Read all orders
const readOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  try {
    const updated = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { delivered: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order marked as delivered", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrder, readOrders, deleteOrder };
