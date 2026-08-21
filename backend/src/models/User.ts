import { model, Schema } from "mongoose";

interface User {
  nickname: string;
  nome: string;
  email: string;
  senha: string;
  userPhoto: string;
  adm: boolean;
}

const userSchema = new Schema<User>({
  nickname: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  userPhoto: {
    type: String,
    required: true,
  },
  adm: {
    type: Boolean,
    default: false
  },
});

const User = model<User>("User", userSchema)

export default User;