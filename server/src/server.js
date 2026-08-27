import "dotenv/config";
import http from "http";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./infrastructure/socket/index.js";
import { seedMessages } from "./modules/message/message.seed.js";
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    // await seedMessages();
    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
