import { User } from "../models/UserModel.js";
import { config } from "dotenv";
import pkg from "jsonwebtoken";

config();
const { verify } = pkg;

export const userVerification = (request, response) => {
  const token = request.cookies.token;

  if(!token) {
    return response.json({status: false});
  }
  else{
    verify(token, process.env.AUTH_KEY, async (error, data) => {
      if(error) {
        return response.json({status: false});
      }
      else {
        const user = await User.findById(data.id);

        if(user) return response.json({status: true, user: user.email})
        else return response.json({status: false})
      }
    })
  }
}
