import type { NextFunction, Request, Response } from "express";

export const checkAdm = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  // buscando o usuário

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }
  // validando se ele existe

  const isAdm = req.user?.adm;
  // buscando o adm

  if (isAdm) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Você não tem permissão pra entrar aqui!" });
  }
  // se for adm: next(), se não, acesso negado!
};
