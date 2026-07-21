import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },

    value: {
      type: Number,
      enum: [1, -1],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// One user can have only one vote per post.
voteSchema.index({ user: 1, post: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
