import { sign } from "jsonwebtoken";

export function generateToken(userId: number) {
  const token = sign({}, "51c4584a-ba21-4fc9-8be4-b6064476430c", {
    subject: String(userId),
    expiresIn: "2h",
  });

  return token;
}
