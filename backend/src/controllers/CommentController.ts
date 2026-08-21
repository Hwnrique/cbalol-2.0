import { type Request, type Response } from "express";
import CommentService from "../services/CommentService.js";

export default class CommentController {
  static async create(req: Request, res: Response) {
    try {
      const { id } = req.params as {id: string};
      const resultado = await CommentService.create(
        req.body,
        req.user!.id,
        id,
      );
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
  
 static async show(req: Request, res: Response) {
    try {
      const { id } = req.params as {id: string};
      const resultado = await CommentService.show(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
 static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as {id: string};
      const resultado = await CommentService.delete(id, req.user!.id, req.user!.adm);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
  static async update(req: Request, res: Response) {
    try {
     const { id } = req.params as {id: string};
      const resultado = await CommentService.update(
        req.body,
        req.user!.id,
        id,
      );
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
}
