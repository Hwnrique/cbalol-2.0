import Notice from "../models/Notice.js";

type CreateNoticeData = Omit<Notice, "criadaPor" | "curtidas">;

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

    const criarNoticia = await Notice.create(notice);
    return criarNoticia;
  }

  static async show() {
    const notices = await Notice.find().lean();

    return notices;
  }

  static async showById(noticeId: string) {
    const notice = await Notice.findById(noticeId)
      .populate("criadaPor", "nickname userPhoto")
      .lean();

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

    return updateNotice;
  }

  static async like(noticeId: string, userId: string) {
    const notice = await Notice.findById(noticeId);

    if (!notice) {
      throw new Error("Notícia Não encontrada");
    }

    const liked = notice.curtidas.some((id) => id.toString() === userId);

    if (liked) {
      await Notice.findByIdAndUpdate(noticeId, { $pull: { curtidas: userId } });
      return "descurtiu";
    }

    await Notice.findByIdAndUpdate(noticeId, {
      $addToSet: { curtidas: userId },
    });

    return "curtiu";
  }
}
