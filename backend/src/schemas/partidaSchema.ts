import { z } from "zod";

export const partidaSchema = z.object({
  confronto: z.array(z.string()).length(2),
  placarTime1: z.number().optional(),
  placarTime2: z.number().optional(),
  data: z.string(),
  status: z.enum(["Pendente", "Finalizado"]),
  modelo: z.enum(["MD1", "MD3", "MD5"])
});
