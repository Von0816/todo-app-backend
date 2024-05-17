import { Login, SignUp } from "../controllers/AuthController.js";
import { userVerification } from "../middlewares/AuthMiddleware.js";
import e from "express";

const router = e();

export const signup = router.post("/signup", SignUp);
export const login = router.post("/login", Login);
export const verify = router.post("/verify", userVerification);

