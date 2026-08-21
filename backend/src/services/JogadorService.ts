import Jogador from "../models/Jogador.js";
import Time from "../models/Time.js";

type CreateJogadorData = Omit<Jogador, "historico">;

export default class JogadorService {
  static async create(data: CreateJogadorData) {
    const { nome, nickname, idade, foto, role, titulos, time } = data;

    const jogador = {
      nome,
      nickname,
      idade,
      foto,
      role,
      titulos,
      time,
      historico: [],
    };

    const createJogador = await Jogador.create(jogador);

    if (time) {
      await Time.findByIdAndUpdate(time, {
        $addToSet: { jogadores: createJogador._id },
      });
    }
    // validando e atualizando o Time
    // Se o time for passado pro frontend ele atualiza a lista de jogadores do determinado time!

    return createJogador;
  }

  static async show() {
    const jogadores = await Jogador.find().lean();

    return jogadores;
  }

  static async showById(playerId: string) {
    const jogador = await Jogador.findById(playerId)
      .populate("time", "nome logo")
      .populate("historico", "nome logo")
      .lean();
    return jogador;
  }

  static async delete(playerId: string) {
    const jogador = await Jogador.findById(playerId).lean();
    const time = jogador?.time;
    if (!jogador) {
      throw new Error("Jogador não encontrado!");
    }

    const deleteJogador = await Jogador.findByIdAndDelete(playerId);

    if (time) {
      await Time.findByIdAndUpdate(time, {
        $pull: { jogadores: deleteJogador?._id },
      });
    }

    return deleteJogador;
  }

  static async update(playerId: string, data: CreateJogadorData) {
    const { nome, nickname, idade, foto, role, titulos, time } = data;

    const buscaJogador = await Jogador.findById(playerId).lean();
    const buscaTime = buscaJogador?.time;

    if (!buscaJogador) {
      throw new Error("Jogador não encontrado!");
    }

    const jogador = {
      nome,
      nickname,
      idade,
      foto,
      role,
      titulos,
      time,
    };

    const updateJogador = await Jogador.findByIdAndUpdate(playerId, jogador, {
      returnDocument: "after",
    });

    const timeAtual = String(buscaTime ?? "");
    // substituto pra .toString(), o TS aceita melhor
    const timeNovo = String(time ?? "");

    if (timeNovo && timeAtual !== timeNovo) {
      await Time.findByIdAndUpdate(timeAtual, {
        $pull: { jogadores: playerId },
      });
      await Time.findByIdAndUpdate(timeNovo, {
        $addToSet: { jogadores: playerId },
      });
      await Jogador.findByIdAndUpdate(playerId, {
        $addToSet: { historico: buscaTime },
      });
    }

    return updateJogador;
  }
}
