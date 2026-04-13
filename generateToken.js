import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "./config/env.js";

const generateToken = (userId, res) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return token;
};

export default generateToken;
