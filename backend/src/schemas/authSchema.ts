import { z } from "zod";

export const cadastroSchema = z.object({
  nickname: z.string(),
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
  userPhoto: z.string(),
});

export const loginSchema = z.object({
  login: z.string(),
  senha: z.string().min(6),
});

export const updateLoginSchema = z.object({
  nickname: z.string().min(5).optional(),
  nome: z.string().optional(),
  userPhoto: z.string().optional(),
});
