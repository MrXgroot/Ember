import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video", "gif"],
    },

    url: {
      type: String,
    },

    publicId: {
      type: String,
    },

    width: {
      type: Number,
    },

    height: {
      type: Number,
    },

    duration: {
      type: Number,
    },

    size: {
      type: Number,
    },
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    media: {
      type: [mediaSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Post", postSchema);
