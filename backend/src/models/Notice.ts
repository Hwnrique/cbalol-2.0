import mongoose, { Schema, model } from "mongoose";

interface Notice {
  titulo: string;
  descricao: string;
  capa: string;
  outraImagem: string;
  criadaPor: mongoose.Types.ObjectId;
  curtidas: mongoose.Types.ObjectId[];
}

const noticeSchema = new Schema<Notice>(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    capa: {
      type: String,
      required: true,
    },
    outraImagem: {
      type: String,
      required: false,
    },
    criadaPor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    curtidas: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Notice = model<Notice>("Notice", noticeSchema);

export default Notice;