import Time from "../models/Time.js";

type CreateTimeData = Omit<Time, "jogadores">;

export default class TimeService {
  static async create(data: CreateTimeData) {
    const { nome, logo, descricao, banner, ativo } = data;

    const time = {
      nome,
      logo,
      descricao,
      jogadores: [],
      banner,
      ativo
    };

    const criarTime = await Time.create(time);
    return criarTime;
  }

  static async show(ativo?: string) {
    const filtro = ativo ? { ativo: ativo === "true" } : {}
    const times = await Time.find(filtro).lean();
    return times;
  }

  static async showById(timeId: string) {
  const time = await Time.findById(timeId)
    .populate("jogadores", "nome nickname foto role")
    .lean()
  return time
}

  static async delete(timeId: string) {
    const time = await Time.findByIdAndDelete(timeId);

    return time;
  }

  static async update(timeId: string, data: CreateTimeData) {
    const { nome, logo, descricao, banner, ativo } = data;

    const time = {
      nome,
      logo,
      descricao,
      banner,
      ativo
    };

    const updateTime = await Time.findByIdAndUpdate(timeId, time, {
      returnDocument: "after",
    });

    return updateTime;
  }
}
