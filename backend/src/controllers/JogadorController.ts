import { type Request, type Response } from "express";
import JogadorService from "../services/JogadorService.js";

export default class JogadorController {
  static async create(req: Request, res: Response) {
    try {
      const resultado = await JogadorService.create(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
      console.log(error)
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const resultado = await JogadorService.show();
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await JogadorService.showById(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await JogadorService.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await JogadorService.update(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
}
