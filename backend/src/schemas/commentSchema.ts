import { z } from "zod";

export const commentSchema = z.object({
  comentario: z.string()
});