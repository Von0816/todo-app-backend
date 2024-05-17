import * as Todo from "../controllers/TodoController.js"
import e from "express"

const router = e();

export const getTodoByUserEmail = router.get("/todo", Todo.getTodoByUserEmail);
export const createTodo = router.post("/todo", Todo.createTodo);
export const updateTodo = router.put("/todo/:id", Todo.updateTodo);
export const completeTodo = router.put("/todo/:id/complete", Todo.completeTodo);
export const softDeleteTodo = router.put("/todo/:id/delete", Todo.softDeleteTodo);
export const restoreTodo = router.put("/todo/:id/restore", Todo.restoreTodo);
export const hardDeleteTodo = router.delete("/todo/:id", Todo.hardDeleteTodo);
