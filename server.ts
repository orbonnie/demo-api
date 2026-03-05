import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import chalk from "chalk";
import qs from 'qs';

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

// Import Routes
import deployments from './routes/deployments';

// Import Middleware
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.set('query parser', (str: string) => qs.parse(str));

// Dev Logging
if (ENV === "development") {
  app.use(morgan("dev"));
}

// Set Security headers
app.use(helmet());

// Mount Routes
app.use('/api/v1/deploy', deployments);

// Error Handling Middleware
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(chalk.magenta.bold(`Server running in ${ENV} on port ${PORT}`)),
);

// Catch Promise Rejections
process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
  console.log(chalk.red(`Error: ${err.message}`));
  console.log(`${err.stack}`);
  server.close(() => process.exit(1));
});
