import mongoose, { Schema, model } from "mongoose";

interface Time {
  nome: string;
  logo: string;
  descricao: string;
  jogadores: mongoose.Types.ObjectId[];
  banner: string;
  ativo: boolean;
}

const timeSchema = new Schema<Time>({
  nome: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  jogadores: [{ type: Schema.Types.ObjectId, ref: "Jogador" }],
  banner: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
    required: false
  }
});

const Time = model<Time>("Time", timeSchema);

export default Time;
