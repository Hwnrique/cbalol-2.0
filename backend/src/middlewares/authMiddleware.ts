import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  const validToken = token?.split(" ")[1];
  // o token geralmente vem com 2 strings, precisamos somente da segunda.
  // fazemos isso pra dividir e pegar somente o index necessário

  if (!validToken) {
    res.status(401).json({ message: "Faça o Login para continuar" });
    return;
  } else {
    try {
      const payload = jwt.verify(validToken, process.env.JWT_SECRET!) as {
        id: string;
        adm: boolean;
      };
      // o payload retornado pelo jwt.verify() é do tipo JwtPayload | string
      // usei o operador "as" para dizer ao TypeScript que o payload é um objeto, pois ao
      // fazer quaisquer conferidas será necessário buscar o id do usuário.
      req.user = payload;
      // criamos o req user para buscar o usuário e dar permissão para as funções adm.
      next();
    } catch (error) {
      res.status(401).json({ message: "Não autorizado" });
    }
  }
};
