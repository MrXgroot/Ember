import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      default: null,
    },

    displayName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
