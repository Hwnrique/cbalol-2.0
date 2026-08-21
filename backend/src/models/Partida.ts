import mongoose, { Schema, model } from "mongoose";

interface Partida {
  confronto: mongoose.Types.ObjectId[];
  placarTime1: number;
  placarTime2: number;
  data: Date;
  status: "Pendente" | "Finalizado";
  modelo: "MD1" | "MD3" | "MD5";
}

const partidaSchema = new Schema<Partida>(
  {
    confronto: [{ type: Schema.Types.ObjectId, ref: "Time" }],
    placarTime1: {
      type: Number,
      required: false,
    },
    placarTime2: {
      type: Number,
      required: false,
    },
    data: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pendente", "Finalizado"],
      default: "Pendente",
      required: true,
    },
    modelo: {
      type: String,
      enum: ["MD1", "MD3", "MD5"],
      required: true,
    },
  },
  { timestamps: true },
);

const Partida = model<Partida>("Partida", partidaSchema);

export default Partida;
