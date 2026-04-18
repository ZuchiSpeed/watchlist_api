import express from "express";
import { PORT } from "./config/env.js";
import movieRoutes from "./routes/movieRoutes.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from './routes/watchlistRoutes.js'

config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use('/watchlist', watchlistRoutes)

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection: ", err);
      server.close(async () => {
        await disconnectDB();
        process.exit(1);
      });
    });
    // Handle uncaught exceptions
    process.on("uncaughtException", async (err) => {
      console.error("Uncaught Exception: ", err);
      await disconnectDB();
      process.exit(1);
    });

    //Graceful shutdown
    process.on("SIGTERM", async () => {
      console.error("SIGTERM received, shutting down gracefully ");
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
