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
        "VOTE",
        "MESSAGE",
        "MENTION",
        "COMMUNITY",
        "SYSTEM",
      ],
    },

    message: {
      type: String,
      required: true,
    },

    entity: {
      type: {
        type: String,
        enum: ["POST", "COMMENT", "COMMUNITY", "MESSAGE"],
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

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000),
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// MongoDB automatically deletes the document when expiresAt is reached
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

export default mongoose.model("Notification", notificationSchema);
