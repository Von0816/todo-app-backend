import mongoose from "mongoose";
import { randomUUID } from "crypto";


const TodoSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => randomUUID()
    },
    userId: {
      type: "UUID"
    },
    title: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Todo = mongoose.model("Todo", TodoSchema)
