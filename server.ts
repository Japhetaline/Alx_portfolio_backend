import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import _colors from "colors";
import connectDB from "./config/db";
import auth from "./routes/auth";

dotenv.config();
connectDB();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to this Express + TypeScript Server");
});

// Routes
app.use("/api/v1/auth", auth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
