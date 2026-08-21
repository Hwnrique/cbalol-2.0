import Notice from "../models/Notice.js";

type CreateNoticeData = Omit<Notice, "criadaPor" | "curtidas">;
// type fala pra gente o que vem do front na hora de criar uma noticia

export default class NoticeService {
  static async create(data: CreateNoticeData, userId: string) {
    const { titulo, descricao, capa, outraImagem } = data;

    const notice = {
      titulo,
      descricao,
      capa,
      outraImagem,
      criadaPor: userId,
      curtidas: [],
    };
    // isso fala pra gente o que vai pro backend, são necessários todos os campos

    const criarNoticia = await Notice.create(notice);
    return criarNoticia;
  }

  static async show() {
    const notices = await Notice.find().lean();
    // o .lean() remove tudo que é desnecessário e retorna só os dados — mais leve e rápido.

    return notices;
  }

  static async showById(noticeId: string) {
    const notice = await Notice.findById(noticeId)
      .populate("criadaPor", "nickname userPhoto")
      .lean();
      // usamos o populate pra trazer os dados do autor da notícia

    return notice;
  }

  static async delete(noticeId: string) {
    const notice = await Notice.findByIdAndDelete(noticeId);

    return notice;
  }

  static async update(noticeId: string, data: CreateNoticeData) {
    const { titulo, descricao, capa, outraImagem } = data;

    const notice = {
      titulo,
      descricao,
      capa,
      outraImagem,
    };

    const updateNotice = await Notice.findByIdAndUpdate(noticeId, notice, {
      returnDocument: "after",
    });
    // passamos o returnDocument: "after" pra retornar o documento atualizado, sem isso ele retorna
    // o documento antes da att

    return updateNotice;
  }

  static async like(noticeId: string, userId: string) {
    const notice = await Notice.findById(noticeId);

    if (!notice) {
      throw new Error("Notícia Não encontrada");
    }

    const liked = notice.curtidas.some((id) => id.toString() === userId);
    // O array curtidas é de ObjectId, aqui nós convertemos ele pra uma string

    if (liked) {
      await Notice.findByIdAndUpdate(noticeId, { $pull: { curtidas: userId } });
      return "descurtiu";
    }

    await Notice.findByIdAndUpdate(noticeId, {
      $addToSet: { curtidas: userId },
    });
    // substituí o push pelo addToSet por ser mais seguro, o push as vezes pode duplicar a curtida
    // com o addToSet não corro esse risco

    return "curtiu";
  }
}
