import { z } from "zod";

export const mvpSchema = z.object({
  jogadorId: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  pontuacao: z.number(),
  destaque: z.string(),
});
