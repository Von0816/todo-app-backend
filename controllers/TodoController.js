import { Todo } from "../models/TodoModel.js";
import { User } from "../models/UserModel.js";

//Todo RESTful API endpoint
//Get todo by user id
export const getTodoByUserEmail =  async (request, response) => {
  try {
    if(!request.query.email) {
      return response.status(400).send("Bad Request");
    }
    const todo = await Todo.find({email: request.query.email, isDeleted: false});

    return response.status(200).json({
      count: todo.length,
      data: todo
    });
  }
  catch(error) {
    
  }
}

//Create new todo
export const createTodo = async (request, response) => {
  try {
    if(!request.body.title) {
      return response.status(400).send("Todo has no title");
    }
    else if(!request.body.email) {
      return response.status(400).send("No email");
    }

    const user = User.findOne({email: request.body.email});
    
    if(!user) return response.status(404).send("User not found");

    const newTodo = {
      title: request.body.title,
      userId: user._id
    }

    const todo = await Todo.create(newTodo);

    return response.status(201).send(todo);
  }
  catch(error) {
    console.log(error);
    return response.status(500).send({message: error.message});
  }
}

//Update todo title
export const updateTodo = async (request, response) => {

  try{
    if(!request.body.title) {
      return response.status(400).send("Todo has no title.")
    }
    else {
      const { id } = request.params;

      await Todo.findByIdAndUpdate(id, {$set: {title: request.body.title, updatedAt: Date.now()}})

      return response.status(200).send("");
    }
  }
  catch(error) {
    return response.status(500).send({message: error.message});
  }
}

//Mark todo as completed
export const completeTodo = async (request, response) => {
  try{
      const { id } = request.params;

      await Todo.findByIdAndUpdate(id, {$set: {isCompleted: true, updatedAt: Date.now()}})

      return response.status(200).send("");
  }
  catch(error) {
    return response.status(500).send({message: error.message});
  }
}

//Soft delete todo
export const softDeleteTodo = async (request, response) => {
  try{
    const { id } = request.params;

    await Todo.findByIdAndUpdate(id, {$set: {isDeleted: true, updatedAt: Date.now()}})

    return response.status(200).send("");
  }
  catch(error) {
    return response.status(500).send({message: error.message});
  }
}

//Restore soft deleted todo
export const restoreTodo = async (request, response) => {
  try{
    const { id } = request.params;

    await Todo.findByIdAndUpdate(id, {$set: {isDeleted: false, updatedAt: Date.now()}})

    return response.status(200).send("");
  }
  catch(error) {
    return response.status(500).send({message: error.message});
  }
}

//Hard delete todo
export const hardDeleteTodo = async (request, response) => {
  try{
    const { id } = request.params;

    await Todo.findByIdAndDelete(id);

    return response.status(200).send("");
  }
  catch(error) {
    return response.status(500).send({message: error.message});
  }
}
