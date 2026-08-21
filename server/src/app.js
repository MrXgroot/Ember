import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();
// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

export default app;
