import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "COMMENT",
        "REPLY",
        "MENTION",
        "FOLLOW",
        "POST",
        "COMMUNITY",
        "SYSTEM",
      ],
    },

    entity: {
      type: {
        type: String,
        default: null,
      },

      id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({ recipient: 1, createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
