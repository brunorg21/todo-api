import express from "express";
import { taskRoutes } from "./routes/task.routes";
import cors from "cors";
import { prismaClient } from "../prismaClient";
import { userRoutes } from "./routes/user.routes";
import { auth } from "./middlewares/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", auth, taskRoutes);
app.use("/users", userRoutes);

app.listen(3333, async () => {
  await prismaClient.$connect();
});
