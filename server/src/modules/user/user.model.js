// modules/user/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    bio: {
      type: String,
      trim: true,
      default: "",
      maxlength: 300,
    },

    avatar: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
