/**
 * ============================================================================
 * GENERIC REQUEST VALIDATION MIDDLEWARE
 * ============================================================================
 *
 * Purpose: Reusable Express middleware that validates request bodies against
 * Zod schemas. Centralizes error handling and ensures consistent 400 responses.
 *
 *
 * Benefits:
 * - DRY: One middleware for all route validation
 * - Type-safe: Works with Zod's inferred TypeScript types
 * - Flexible: Accepts any Zod schema (object, string, custom, etc.)
 *
 * @module middleware/validateRequest
 * @param {ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware (req, res, next)
 */

/**
 * Factory function that creates validation middleware for a given Zod schema
 *
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate req.body against
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */

export const validateRequest = (schema) => {
  // Return actual middleware with Express signature
  return (req, res, next) => {
    // safeParse: validates without throwing; returns { success: boolean, data/error }
    const result = schema.safeParse(req.body);

    // Validation failed: format errors and send 400 response
    if (!result.success) {
      const formatted = result.error.format();

      // Flatten nested errors into simple array of messages:
      // 1. Get all values from formatted object
      // 2. Flatten one level (handle nested _errors arrays)
      // 3. Filter out undefined/null values
      // 4. Extract _errors arrays from each field
      // 5. Flatten again to get final string messages
      const flatError = Object.values(formatted)
        .flat()
        .filter(Boolean)
        .map((err) => err._errors)
        .flat();
      return res.status(400).json({ message: flatError.join(", ") });
    }

    // Validation passed: attach parsed/coerced data to req (optional but useful)
    // req.validatedBody = result.data;  // Uncomment if you want to use sanitized data

    // Continue to next middleware/controller
    next();
  };
};
