import type { NextFunction, Request, Response } from "express";

export const checkAdm = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  const isAdm = req.user?.adm;

  if (isAdm) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Você não tem permissão pra entrar aqui!" });
  }
};
