import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  const validToken = token?.split(" ")[1];

  if (!validToken) {
    res.status(401).json({ message: "Faça o Login para continuar" });
    return;
  } else {
    try {
      const payload = jwt.verify(validToken, process.env.JWT_SECRET!) as {
        id: string;
        adm: boolean;
      };
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ message: "Não autorizado" });
    }
  }
};
