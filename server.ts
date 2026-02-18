import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import chalk from "chalk";

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

// Connect to Database

// Import Routes

const app = express();

app.use(express.json());

// Middleware
if (ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routes

const server = app.listen(PORT, () =>
  console.log(chalk.magenta.bold(`Server running in ${ENV} on port ${PORT}`)),
);

// Catch promise rejections
process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
  console.log(chalk.red(`Error: ${err.message}`));
  console.log(`${err.stack}`);
  server.close(() => process.exit(1));
});
