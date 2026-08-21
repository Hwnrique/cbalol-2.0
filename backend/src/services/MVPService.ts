import MVP from "../models/MVP.js";

interface CreateMvpData {
  jogadorId: string;
  dataInicio: string;
  dataFim: string;
  pontuacao: number;
  destaque: string;
}

export default class MVPService {
  static async create(data: CreateMvpData) {
    const { jogadorId, dataInicio, dataFim, pontuacao, destaque } = data;

    const mvp = {
      jogadorId,
      dataInicio,
      dataFim,
      pontuacao,
      destaque,
    };

    const createMvpPlayer = await MVP.create(mvp);

    return createMvpPlayer;
  }

  static async show() {
    const mvp = await MVP.find().populate("jogadorId").lean();

    return mvp;
  }

  static async showAtual() {
  const hoje = new Date()
  
  const mvp = await MVP.findOne({
    dataInicio: { $lte: hoje },
    dataFim: { $gte: hoje }
  }).populate({
    path: "jogadorId",
    populate: {
      path: "time",
      model: "Time"
    }
  }).lean()

  return mvp
}

  static async showById(mvpId: string) {
    const mvp = await MVP.findById(mvpId).lean();

    return mvp;
  }

  static async delete(mvpId: string) {
    const deleteMvp = await MVP.findByIdAndDelete(mvpId);

    return deleteMvp;
  }

  static async update(mvpId: string, data: CreateMvpData) {
    const { jogadorId, dataInicio, dataFim, pontuacao, destaque } = data;

    const mvp = {
      jogadorId,
      dataInicio,
      dataFim,
      pontuacao,
      destaque,
    };

    const updateMvpPlayer = await MVP.findByIdAndUpdate(mvpId, mvp, {
      returnDocument: "after",
    });

    return updateMvpPlayer;
  }
}
