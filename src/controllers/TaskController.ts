import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";

export class TaskController {
  async list(request: Request, response: Response) {
    const { search } = request.query;
    const { user } = request.headers;

    if (search) {
      const tasks = await prismaClient.task.findMany({
        where: {
          userId: Number(user),
          OR: [
            {
              title: {
                contains: String(search),
              },
            },
            {
              description: {
                contains: String(search),
              },
            },
          ],
        },
        orderBy: {
          id: "asc",
        },
      });

      return response.json(tasks);
    } else {
      const tasks = await prismaClient.task.findMany({
        where: {
          userId: Number(user),
        },
        orderBy: {
          id: "asc",
        },
      });

      return response.json(tasks);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { title, description } = request.body;
      const { user } = request.headers;

      await prismaClient.task.create({
        data: {
          title,
          description,
          userId: Number(user),
          createdAt: new Date(),
        },
      });

      return response.status(200).json({ message: "Task criada!" });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { title, description } = request.body;
      const { user } = request.headers;

      const taskId = Number(id);

      await prismaClient.task.update({
        where: { id: taskId },
        data: {
          title,
          description,
          userId: Number(user),
        },
      });

      return response.status(200).json({ message: "Editado" });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { user } = request.headers;

      const taskId = Number(id);

      await prismaClient.task.delete({
        where: {
          id: taskId,
          userId: Number(user),
        },
      });

      return response.status(200).json("Task Deletada");
    } catch (error) {
      return response.json(error);
    }
  }
}
