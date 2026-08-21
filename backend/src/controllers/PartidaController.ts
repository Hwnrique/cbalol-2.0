import { type Request, type Response } from "express";
import PartidaService from "../services/PartidaService.js";

export default class PartidaController {
  static async create(req: Request, res: Response) {
    try {
      const resultado = await PartidaService.create(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { status } = req.query as { status?: string };
      // parâmetro pra filtrar as partidas pelo status
      const resultado = await PartidaService.show(status);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await PartidaService.showById(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await PartidaService.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await PartidaService.update(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
}
