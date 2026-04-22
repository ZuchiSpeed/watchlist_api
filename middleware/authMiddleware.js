import { JWT_SECRET } from "../config/env.js";

const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware reached");
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("  ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware: ", error);
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

export default authMiddleware;
