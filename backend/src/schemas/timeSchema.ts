import { z } from "zod";

export const timeSchema = z.object({
  nome: z.string(),
  logo: z.string(),
  descricao: z.string(),
  banner: z.string()
});