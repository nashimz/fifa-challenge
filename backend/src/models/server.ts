import express, { Application, Request, Response } from "express";
import cors from "cors";
import db from "../db/connection";
import routesPlayer from "../routes/player";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion corriendo en el puerto ${this.port}`);
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "Api Working",
      });
    });
    this.app.use("/api/players", routesPlayer);
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Base de datos conectada");
    } catch (error) {
      console.log(error);
      console.log("Error a conectarse a la BD");
    }
  }
}

export default Server;
