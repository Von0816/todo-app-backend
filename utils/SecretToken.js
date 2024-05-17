import { config } from "dotenv";
import pkg from "jsonwebtoken";

const { sign } = pkg;

config();

export const createSecretToken = (id) => {
  return sign({id}, process.env.AUTH_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  })
}
