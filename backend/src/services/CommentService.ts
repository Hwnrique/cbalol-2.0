import Comentario from "../models/Comentario.js";
import Notice from "../models/Notice.js";
import User from "../models/User.js";

type CreateCommentData = Omit<Comentario, "criadoPor" | "noticiaId">;

export default class CommentService {
  static async create(
    data: CreateCommentData,
    userId: string,
    noticiaId: string,
  ) {
    const { comentario } = data;

    const comment = {
      noticiaId,
      comentario,
      criadoPor: userId,
    };

    const criarComentario = await Comentario.create(comment);
    return criarComentario;
  }

  static async show(noticiaId: string) {
    const comments = await Comentario.find({ noticiaId })
      .populate("criadoPor", "nickname userPhoto")
      .lean();

    return comments;
  }

  static async delete(id: string, userId: string, isAdm: boolean) {
    const comment = await Comentario.findById(id);

    if (!comment) {
      throw new Error("Comentário não encontrado!");
    }

    if (isAdm || comment.criadoPor.toString() === userId) {
      const deleteComment = await Comentario.findByIdAndDelete(id);
      return deleteComment;
    } else {
      throw new Error("Você não tem permissão pra fazer isso!");
    }
  }

  static async update(data: CreateCommentData, userId: string, id: string) {
    const { comentario } = data;

    const comment = {
      comentario,
    };

    const findComment = await Comentario.findById(id);

    if (!findComment) {
      throw new Error("Comentário não encontrado!");
    }

    if (findComment.criadoPor.toString() !== userId) {
      throw new Error("Você não tem permissão pra fazer isso!");
    }

    const updateComment = await Comentario.findByIdAndUpdate(id, comment, {
      returnDocument: "after",
    });

    return updateComment;
  }
}
