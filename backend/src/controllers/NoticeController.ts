import { type Request, type Response } from "express";
import NoticeService from "../services/NoticeService.js";

export default class NoticeController {
  static async create(req: Request, res: Response) {
    try {
      const resultado = await NoticeService.create(req.body, req.user!.id);
      res.status(201).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const resultado = await NoticeService.show();
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      // pro typescript parar de reclamar a gente usa o as de novo
      // pois ele tem dificuldade de entender que essa merda é uma string, e nao undefined
      const resultado = await NoticeService.showById(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      // faz a mesma merda idiota do de cima
      const resultado = await NoticeService.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
  
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await NoticeService.update(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }

  static async like(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const resultado = await NoticeService.like(id, req.user!.id);
      res.status(200).json(resultado);
    } catch (error) {
      error instanceof Error && res.status(400).json(error.message);
    }
  }
}
