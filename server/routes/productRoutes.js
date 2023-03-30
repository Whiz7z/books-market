import express from "express";
import Product from "../models/Product.js";
import Tag from "../models/Tag.js";
import fs from "fs";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { protectRoute, admin } from "../middleware/authMiddleware.js";
import path from "path";

const productRoutes = express.Router();

const getProducts = asyncHandler(async (req, res) => {
  console.log(req.query.category);

  if (
    req.query.category === "all" ||
    req.query.category === "" ||
    req.query.category == undefined
  ) {
    const products = await Product.find({});
    res.json(products);
  } else {
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  //console.log(req.body);
  const { id, title, description, price, category, stock } = req.body.product;

  const _id = mongoose.Types.ObjectId(id);

  const product = await Product.findById(_id);
  if (product) {
    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;

    const updatedProduct = await product.save();
    console.log("updated product", updatedProduct);

    try {
      fs.unlink(
        "../server/productImages/" + updatedProduct.imagePath,
        (err) => {
          console.log("Delete File successfully.");
        }
      );
    } catch (err) {}

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, stock, author, tags } =
    req.body.product;
  console.log(req.body);
  // const _id = mongoose.Types.ObjectId(id);
  const newProduct = await Product.create({
    title: title,
    author: author,
    description: description,
    price: price,
    category: category
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(" "),
    tags: tags.filter((value, index, array) => array.indexOf(value) === index),
    stock: stock,
  });
  console.log("product cc", newProduct);
  await newProduct.save();

  const allTags = await Tag.find({});

  console.log(allTags);

  allTags[0].allTags.push(...tags);

  const updatedTags = await allTags[0].save();

  console.log("updated tags", updatedTags);
  if (newProduct) {
    res.json(newProduct);
  } else {
    res.status(404);
    throw new Error("Product could not be uploaded.");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { productId } = req.body;

    const _id = mongoose.Types.ObjectId(productId);
    const productToDelete = await Product.findById(_id);

    if (productToDelete) {
      const deleted = await Product.deleteOne({ _id: _id });
      console.log("deleted", deleted);

      fs.unlink(
        "../server/productImages/" + productToDelete.imagePath,
        (err) => {
          if (err) {
            console.log(err);
          }

          console.log("Delete File successfully.");
        }
      );
      res.json("product deleted");
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  } catch (error) {
    console.log(error);
  }
});

productRoutes.route("/").get(getProducts);
productRoutes.route("/").put(protectRoute, admin, updateProduct);
productRoutes.route("/").post(protectRoute, admin, createProduct);
productRoutes.route("/").delete(protectRoute, admin, deleteProduct);

export default productRoutes;
