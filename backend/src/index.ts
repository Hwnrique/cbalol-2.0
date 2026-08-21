import express from "express";
import "dotenv/config";
import conn from "./db/database.js";
import ck from "chalk";
import router from "./routes/authRoutes.js";
import noticeRouter from "./routes/noticeRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import timeRouter from "./routes/timeRoutes.js";
import jogadorRouter from "./routes/jogadorRoutes.js";
import cors from "cors";
import partidaRouter from "./routes/partidaRoutes.js";
import mvpRouter from "./routes/mvpRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use("/", noticeRouter);
app.use("/", commentRouter);
app.use("/", timeRouter);
app.use("/", jogadorRouter);
app.use("/", partidaRouter);
app.use("/", mvpRouter);

const port = Number(process.env.PORT) || 8080;

const startSever = async () => {
  try {
    await conn();
    app.listen(port, () => {
      console.log(ck.green(`Servidor ativo na porta ${port}`));
    });
  } catch (error) {
    console.log(error);
  }
};

startSever();
