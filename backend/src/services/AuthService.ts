import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type ComumUser = Omit<User, "adm">;

type loginData = {
  login: string;
  senha: string;
};

export default class AuthService {
  static async cadastro(data: ComumUser) {
    const { nickname, nome, email, senha, userPhoto } = data;

    const emailExiste = await User.findOne({ email: email });
    const nickExiste = await User.findOne({ nickname: nickname });

    if (emailExiste) {
      throw new Error("Email já cadastrado");
    }
    if (nickExiste) {
      throw new Error("Esse nick já está em uso!");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = {
      nickname,
      nome,
      email,
      senha: hashedPassword,
      userPhoto,
    };

    const criarUser = await User.create(user);

    const { senha: _, ...userSemSenha } = criarUser.toObject();
    return userSemSenha;
  }

  static async login(data: loginData) {
    const { login, senha } = data;

    const isEmail = login.includes("@");

    const user = await User.findOne(
      isEmail ? { email: login } : { nickname: login },
    ).select("+senha");

    if (!user) {
      throw new Error("Login Incorreto!");
    }

    const comparaSenha = await bcrypt.compare(senha, user.senha);

    if (!comparaSenha) {
      throw new Error("Senha Incorreta!");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("Erro na requisição da URI");
    }

    const token = jwt.sign(
      { id: user._id, adm: user.adm , nickname: user.nickname},
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return token;
  }

  static async showById(userId: string) {
    const users = await User.findById(userId).select("-senha").lean();

    return users;
  }

static async showAdmins() {
  const users = await User.find({ adm: true })
    .select("-senha")
    .lean();

  return users;
}

  static async update(userId: string, data: ComumUser) {
    const { nickname, nome, userPhoto } = data;

    const buscaUser = await User.findById(userId);

    if (!buscaUser) {
      throw new Error("Usuário não encontrado!");
    }

    const nickExiste = await User.findOne({
      nickname: nickname,
      _id: {
        $ne: userId,
      },
    });

    if (nickExiste) {
      throw new Error("Esse usuário já existe");
    }

    const user = {
      nickname,
      nome,
      userPhoto,
    };

    const updateUser = await User.findByIdAndUpdate(userId, user, {
      returnDocument: "after",
    });

    return updateUser;
  }
}
