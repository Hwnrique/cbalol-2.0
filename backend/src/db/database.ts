import mongoose from "mongoose";
import ck from "chalk";

const conn = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Erro na requisição da URI");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log(ck.green("Conectado ao mongoose"));
};

export default conn;