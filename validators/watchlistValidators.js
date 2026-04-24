/**
 * ============================================================================
 * WATCHLIST REQUEST VALIDATION SCHEMAS
 * ============================================================================
 *
 * Usage: Import schemas and pass to validateRequest() middleware
 *
 * @module validators/watchlistValidators
 * @exports {ZodObject} addToWatchlistSchema - Schema for POST /watchlist
 */

import { z } from "zod";

/**
 * Schema for adding a movie to a user's watchlist
 *
 * Validation Rules:
 * - movieId: Must be a valid UUID v4 string (matches Prisma @default(uuid()))
 * - status: Optional enum with 4 allowed values; defaults to "PLANNED" in controller
 * - rating: Optional integer between 1-10; coerced from string if needed (e.g., form data)
 * - notes: Optional free-text string for user comments
 *
 * Error Handling:
 * - Custom error messages for enum validation
 * - Coercion for rating allows "5" (string) → 5 (number) conversion
 * - All fields except movieId are optional to support partial updates
 */

const addToWatchlistSchema = z.object({
  // Required: Must match Prisma's uuid() default and foreign key type
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchlistSchema };
