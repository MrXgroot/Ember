// modules/message/message.seed.js

import mongoose from "mongoose";
import { Message } from "./message.model.js";
import { User } from "../user/user.model.js";

export async function seedMessages() {
  const users = await User.find().limit(3);

  if (users.length < 2) {
    console.log("Need at least 2 users to seed messages.");
    return;
  }

  const [userA, userB, userC] = users;

  await Message.deleteMany({});

  await Message.create([
    {
      sender: userA._id,
      receiver: userB._id,
      content: "Hey!",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      sender: userB._id,
      receiver: userA._id,
      content: "Hey, what's up?",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      sender: userA._id,
      receiver: userB._id,
      content: "Working on Ember.",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },

    // Separate conversation
    ...(userC
      ? [
          {
            sender: userC._id,
            receiver: userA._id,
            content: "Hello from user C!",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        ]
      : []),
  ]);

  console.log("✅ Message seed completed");
}
