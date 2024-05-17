import e from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import {createRequire} from "module";
import * as authRoutes from "./routes/AuthRoutes.js"
import * as todoRoutes from "./routes/TodoRoutes.js"

config();

const require = createRequire(import.meta.url);

const app = e();
const cors = require("cors");
const corsOption = {
  origin: "https://main--jovial-chebakia-78ac22.netlify.app",
  optionSuccessStatus: 200,
  // allowedHeaders: 'Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin',
  credentials: true
}

app.use(cors(corsOption));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(new Date(Date.now()));
    console.log("Database connected.")
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`)
    });
  })
  .catch((error) => {
    console.error(error);
  })
  
app.use(cookieParser());


app.use(e.json());

//Auth routes
app.use("/", authRoutes.signup);
app.use("/", authRoutes.login);
app.use("/", authRoutes.verify);

//Todo routes
app.use("/", todoRoutes.getTodoByUserEmail);
app.use("/", todoRoutes.createTodo);
app.use("/", todoRoutes.updateTodo);
app.use("/", todoRoutes.completeTodo);
app.use("/", todoRoutes.softDeleteTodo);
app.use("/", todoRoutes.restoreTodo);
app.use("/", todoRoutes.hardDeleteTodo);

//hello world route for testing
app.get("/hello-world", (request, response) => {
  return response.status(200).send("hello world");
})
