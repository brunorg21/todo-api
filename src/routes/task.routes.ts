import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { auth } from "../middlewares/auth";

export const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post("/", auth, taskController.create);

taskRoutes.get("/", auth, taskController.list);

taskRoutes.put("/:id", auth, taskController.update);

taskRoutes.delete("/:id", auth, taskController.delete);
