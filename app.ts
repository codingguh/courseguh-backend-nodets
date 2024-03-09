import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
require("dotenv").config();

export const app: Application = express();

app.use(express.json({ limit: "500mb" }));
// Use cookie-parser middleware
app.use(cookieParser());

//cors => cors origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//router
app.use("/api/v1", userRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// testing api
app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
