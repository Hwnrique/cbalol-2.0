import Partida from "../models/Partida.js";

interface CreatePartidaData {
  confronto: string[];
  placarTime1?: number;
  placarTime2?: number;
  data: string;
  status: "Pendente" | "Finalizado";
  modelo: "MD1" | "MD3" | "MD5";
}

export default class PartidaService {
  static async create(item: CreatePartidaData) {
    const { confronto, placarTime1, placarTime2, data, status, modelo } = item;

    const partida = {
      confronto,
      placarTime1,
      placarTime2,
      data,
      status,
      modelo,
    };

    const criarPartida = await Partida.create(partida as any);
    return criarPartida;
  }

  static async show(status?: string) {
    const filter = status ? { status } : {};

    const partidas = await Partida.find(filter)
      .populate("confronto")
      .sort({ data: status === "Finalizado" ? -1 : 1 })
      .lean();

    return partidas;
  }

  static async showById(partidaId: string) {
    const partida = await Partida.findById(partidaId).lean();

    return partida;
  }

  static async delete(partidaId: string) {
    const partida = await Partida.findByIdAndDelete(partidaId);

    return partida;
  }

  static async update(partidaId: string, item: CreatePartidaData) {
    const { confronto, placarTime1, placarTime2, data, status, modelo } = item;

    const partida = {
      confronto,
      placarTime1,
      placarTime2,
      data,
      status,
      modelo,
    };

    const updatePartida = await Partida.findByIdAndUpdate(partidaId, partida, {
      returnDocument: "after",
    });

    return updatePartida;
  }
}
