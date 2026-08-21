import mongoose, { Schema, model } from "mongoose";

interface MVP {
  jogadorId: mongoose.Types.ObjectId;
  dataInicio: Date;
  dataFim: Date;
  pontuacao: number;
  destaque: string;
}

const mvpSchema = new Schema<MVP>(
  {
    jogadorId: {
      type: Schema.Types.ObjectId,
      ref: "Jogador",
      required: true
    },
    dataInicio: {
      type: Date,
      required: true,
    },
    dataFim: {
      type: Date,
      required: true,
    },
    pontuacao: {
      type: Number,
      required: true,
    },
    destaque: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const MVP = model<MVP>("MVP", mvpSchema);

export default MVP;