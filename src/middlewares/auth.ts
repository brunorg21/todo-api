import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { verify } from "jsonwebtoken";

export async function auth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: "Token is missing" });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "51c4584a-ba21-4fc9-8be4-b6064476430c"
    );

    request.headers.user = String(userId);

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid Token",
    });
  }
}
