import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import API handlers (routes)
import aliveHandler from "./api/alive.js";

// Setup Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS;
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// API Routes - map to the serverless functions
app.get("/api/alive", async (req, res) => {
  await aliveHandler(req, res);
});

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3000/index.html/video/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow react-router to take it from there
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(
    `🚀 Local development server running at http://localhost:${PORT}`
  );
});
