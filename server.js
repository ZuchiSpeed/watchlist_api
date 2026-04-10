import express from "express";
import { PORT } from "./config/env.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use("/movies", movieRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
