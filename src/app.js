import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan"; // para ver por consola las peticiones que llegan al backend
import cors from "cors";
import gameRoutes from "./routes/game.routes.js";
import PaymentRoutes from "./routes/payment.routes.js";
import MailingRoutes from "./routes/mailing.routes.js";
configDotenv();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/games", gameRoutes);
app.use("/api/v1/paypal", PaymentRoutes);
app.use("/api/v1/", MailingRoutes);

export default app;
