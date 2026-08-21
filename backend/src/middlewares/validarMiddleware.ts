import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validacao = (cadastroSchema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = cadastroSchema.safeParse(req.body);
    if (!resultado.success) {
      res.status(400).json({ message: "Preencha os campos corretamente!" });
    } else {
      next();
    }
  };
};