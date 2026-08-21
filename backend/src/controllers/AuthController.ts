import { type Request, type Response } from "express";
import AuthService from "../services/AuthService.js";

export default class AuthController {
  static async cadastro(req: Request, res: Response) {
    try {
      const resultado = await AuthService.cadastro(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
      // verificando se o error é uma instacia do throw new Error do service, se sim, retorna a mensagem
      // de erro escrita lá
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const resultado = await AuthService.login(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
  
  static async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await AuthService.showById(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

    static async update(req: Request, res: Response) {
      try {
        const { id } = req.params as { id: string };
        const resultado = await AuthService.update(id, req.body);
        res.status(200).json(resultado);
      } catch (error) {
        error instanceof Error && res.status(400).json(error.message);
      }
    }
}
