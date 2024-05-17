import { User } from "../models/UserModel.js";
import { createSecretToken } from "../utils/SecretToken.js";
import * as argon2 from "argon2";

export const SignUp = async (request, response) => {
  try {
    const {email, password} = request.body;

    if(await User.findOne({email})){
      return response.json({
        message: "Email is taken."
      })
    }

    const user = await User.create({email: email,password: await argon2.hash(password)});

    const token = createSecretToken(user._id);

    return response.status(201)
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      .json({
        message: "User signed in successfully",
        success: true
    })
  } catch (error) {
    console.error(error);
  }
}

export const Login = async (request, response) => {
  try {
    const {email, password} = request.body;

    if(!email || !password) return response.status(400).json({message: "Please enter email and password."});
    

    const user = await User.findOne({email});

    if(!user) return response.json({message: "Incorrect email or password."});
    

    const auth = await argon2.verify(user.password, password);

    if(!auth) return response.json({message: "Incorrect email or password."})

    const token = createSecretToken(user._id);
    return response.status(200)
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      .json({
        message: "User logged in successfully.",
        success: true
    })
  } catch (error) {
    console.error(error); 
  }
}
