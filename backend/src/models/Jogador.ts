import mongoose, { Schema, model } from "mongoose";

interface Jogador {
  nome: string;
  nickname: string;
  idade: number;
  foto: string;
  role: string;
  titulos: string[];
  time: mongoose.Types.ObjectId;
  historico: mongoose.Types.ObjectId[];
}

const jogadorSchema = new Schema<Jogador>({
  nome: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  titulos: [
    {
      type: String,
    },
  ],
  time: {
    type: Schema.Types.ObjectId,
    ref: "Time",
  },
  historico: [{ type: Schema.Types.ObjectId, ref: "Time" }],
});

const Jogador = model<Jogador>("Jogador", jogadorSchema);
export default Jogador;
