import { z } from "zod";

export const noticeSchema = z.object({
  titulo: z.string(),
  descricao: z.string(),
  capa: z.string(),
  outraImagem: z.string().optional(),
});