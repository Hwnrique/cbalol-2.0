import mongoose, { Schema, model } from "mongoose";

interface Comentario {
  noticiaId: mongoose.Types.ObjectId;
  comentario: string;
  criadoPor: mongoose.Types.ObjectId;
}

const comentarioSchema = new Schema<Comentario>(
  {
    noticiaId: {
      type: Schema.Types.ObjectId,
      ref: "Noticia",
      required: true,
    },
    comentario: {
      type: String,
      required: true
    },
    criadoPor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true },
);

const Comentario = model<Comentario>("Comentario", comentarioSchema)

export default Comentario;