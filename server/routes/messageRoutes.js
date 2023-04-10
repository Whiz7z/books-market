import Message from "../models/Message.js";
import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protectRoute } from "../middleware/authMiddleware.js";

const messageRoutes = express.Router();

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  console.log(messages);

  res.json(messages);
});

messageRoutes.route("/").get(protectRoute, admin, getAllMessages);

export default messageRoutes;
