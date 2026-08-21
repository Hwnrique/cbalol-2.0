import { z } from "zod";

export const jogadorSchema = z.object({
  nome: z.string(),
  nickname: z.string(),
  idade: z.number(),
  foto: z.string(),
  role: z.string(),
  titulos: z.array(z.string()).optional(),
  time: z.string().optional(),
  historico: z.array(z.string()).optional(),
});
