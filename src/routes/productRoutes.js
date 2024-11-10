const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new product
router.post("/", async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    stock,
    imageUrl,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).send("Product not found");
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send("Product not found");
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
