import { type Request, type Response } from "express";
import TimeService from "../services/TimeService.js";

export default class TimeController {
  static async create(req: Request, res: Response) {
    try {
      const resultado = await TimeService.create(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { ativo } = req.query as { ativo?: string };
      const resultado = await TimeService.show(ativo);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await TimeService.showById(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await TimeService.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await TimeService.update(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
}
