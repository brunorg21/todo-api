import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { generateToken } from "../utils/token";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      return response.status(200).json(user);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Não foi possível cadastrar!" });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(404)
        .json({ message: "Inserir todos os campos!!" });
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return response
        .status(404)
        .json({ message: "Email ou senha inválidos!" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return response
        .status(400)
        .json({ message: "Email ou senha inválidos!" });
    }

    const token = generateToken(user.id);

    return response.json({ token, user });
  }
}
