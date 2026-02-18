import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    let newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    newMessage = await newMessage.populate("senderId", "fullName profilePhoto");

    const receiverSocketId = getRecieverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log("⚠️ Receiver socket not found (user offline)");
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({
      message: "Message send failed",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: {
        path: "senderId",
        select: "fullName profilePhoto",
      },
    });

    return res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.error("Get message error:", error);
    return res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};
