import express from "express"

const movieRoutes = express.Router();

movieRoutes.get("/route", (req, res) => {
  res.json({ message: "Calling Main API" });
});

movieRoutes.get("/:id", (req, res) => {
  res.json({ message: "Get Movie By ID" });
});

// POST / - Create a new user
movieRoutes.post("/", (req, res) => {
  res.send({ title: "Add new movie" });
});

// PUT /:id - Update an existing user by their ID
movieRoutes.put("/:id", (req, res) => {
  res.send({ title: "Update movie information" });
});

// DELETE /:id - Delete a user by their ID
movieRoutes.delete("/:id", (req, res) => {
  res.send({ title: "Delete movie from watchlist" });
});

export default movieRoutes;
