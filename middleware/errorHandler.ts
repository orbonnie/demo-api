import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  // PrismaClientKnownRequestErrors
  if (err.code === "P2000") {
    const msg = "The value entered exceeds the characters allowed.";

    console.log(chalk.red(msg));
    error = new ErrorResponse(msg, 400);
  }

  if (err.code === "P2002") {
    const msg = "Duplicate record. This value is already in use.";

    console.log(chalk.red(msg));
    error = new ErrorResponse(msg, 409);
  }

  if (err.code === "P2003") {
    const msg = "Invalid reference. Related record not found.";

    console.log(chalk.red(msg));
    error = new ErrorResponse(msg, 400);
  }

  if (err.code === "P2014") {
    const msg = "The record has related records and cannot be deleted.";

    console.log(chalk.red(msg));
    error = new ErrorResponse(msg, 400);
  }

  if (err.code === "P2025") {
    if (req.method === "DELETE") {
      console.log(chalk.yellow("Resource deleted or already removed."));
      return res.status(204).send();
    } else {
      const msg = "Resource not found.";
      console.log(chalk.red(msg));
      error = new ErrorResponse(msg, 404);
    }
  }

  // PrismaClientValidationError
  if (err.name === "PrismaClientValidationError") {
    const msg = "Invalid Data provided";

    console.log(chalk.red(msg));
    error = new ErrorResponse(msg, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
}

export default errorHandler;
