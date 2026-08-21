import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
const PORT = process.env.CLIENT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
