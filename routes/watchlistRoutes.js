/**
 * ============================================================================
 * WATCHLIST API ROUTES MODULE
 * ============================================================================
 *
 * Base Path: /watchlist (mounted in server.js as /api/v1/watchlist)
 *
 * Purpose: Define RESTful endpoints for managing user watchlists with:
 * - Authentication protection (all routes require valid JWT)
 * - Request validation via Zod schemas
 * - Clear separation of concerns (routes → controllers → services)
 *
 * Endpoints:
 * POST   /           - Add movie to watchlist (validated)
 * DELETE /:id        - Remove watchlist item by ID
 * PUT    /:id        - Update watchlist item (status, rating, notes)
 *
 * Security:
 * - authMiddleware runs first on all routes (via router.use)
 * - validateRequest ensures only well-formed data reaches controllers
 *
 * @module routes/watchlistRoutes
 * @exports {Router} router - Express router instance
 */

import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

// Create isolated router for watchlist endpoints
const router = express.Router();

// Apply auth middleware to ALL routes in this router
// Every request must have valid JWT in Authorization header
router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.delete("/:id", removeFromWatchlist);
router.put("/:id", updateWatchlistItem);

export default router;
