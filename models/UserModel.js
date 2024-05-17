import mongoose from "mongoose";
import { randomUUID } from "crypto";

const UserSchema = mongoose.Schema({
  _id: {
    type: "UUID",
    default: () => randomUUID()
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export const User = mongoose.model("User", UserSchema);
