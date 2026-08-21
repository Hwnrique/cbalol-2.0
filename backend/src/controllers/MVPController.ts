import { type Request, type Response } from "express";
import MVPService from "../services/MVPService.js";

export default class MVPController {
  static async create(req: Request, res: Response) {
    try {
      const resultado = await MVPService.create(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const resultado = await MVPService.show();
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async showAtual(req: Request, res: Response) {
    try {
      const resultado = await MVPService.showAtual();
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await MVPService.showById(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await MVPService.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await MVPService.update(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
}
