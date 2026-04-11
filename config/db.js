import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "./env.js";

const prisma = new PrismaClient({
  log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("Disconnected from the database successfully.");
};

export { prisma, connectDB, disconnectDB };
